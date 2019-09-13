/** @module redux-sock */

import socketIoClient from "socket.io-client"
import immer from "immer"
import socketioWildcard from "socketio-wildcard"

/**
 * @typedef {Object} Options
 * @prop {string} url
 * @prop {string[]|Object<string, true | string | ((dispatch: Function) => void)>} [events]
 * @prop {Object} [socketClientOptions]
 * @prop {string} [basePrefix="@@socket/"]
 * @prop {string} [sendPrefix="send/"]
 * @prop {string} [receivePrefix="received/"]
 */

/**
 * @typedef {Object} SockMiddleware
 * @prop {import("redux").Reducer} reducer
 * @prop {Object} client
 */

/**
 * @param {Options} options
 * @return {SockMiddleware}
 */
export default function createSocketMiddleware(options) {
  options = {
    socketClientOptions: {},
    basePrefix: "@@socket/",
    sendPrefix: "send/",
    receivePrefix: "received/",
    events: false,
    ...options,
  }
  const connectedType = `${options.basePrefix}connected`
  const initiallyConnectedType = `${options.basePrefix}initiallyConnected`
  const disconnectedType = `${options.basePrefix}disconnected`
  const sendPrefix = options.basePrefix + options.sendPrefix
  const receivePrefix = options.basePrefix + options.receivePrefix
  const socketClient = socketIoClient(options.url, options.socketClientOptions)
  /**
   * @type {import("redux").Middleware}
   */
  const middleware = store => {
    socketClient.once("connect", () => {
      store.dispatch({
        type: initiallyConnectedType,
      })
      if (options.events) {
        if (Array.isArray(options.events)) {
          for (const eventName of options.events) {
            socketClient.on(eventName, (...payload) => {
              store.dispatch({
                type: receivePrefix + eventName,
                payload: payload[0],
              })
            })
          }
        } else {
          for (const [eventName, eventHandler] of Object.entries(options.events)) {
            if (eventHandler === true) {
              socketClient.on(eventName, (...payload) => {
                store.dispatch({
                  type: receivePrefix + eventName,
                  payload: payload[0],
                })
              })
            } else if (typeof eventHandler === "string") {
              socketClient.on(eventName, (...payload) => {
                store.dispatch({
                  type: receivePrefix + eventHandler,
                  payload: payload[0],
                })
              })
            } else {
              socketClient.on(eventName, (...payload) => eventHandler(store.dispatch, payload[0]))
            }
          }
        }
      } else {
        const patch = socketioWildcard(socketIoClient.Manager)
        patch(socketClient)
        socketClient.on("*", packet => {
          const [eventName, ...payload] = packet.data
          store.dispatch({
            type: receivePrefix + eventName,
            payload: payload[0],
          })
        })
      }
    })
    socketClient.on("connect", () => {
      store.dispatch({
        type: connectedType,
      })
    })
    socketClient.on("disconnect", () => {
      store.dispatch({
        type: disconnectedType,
      })
    })
    return next => action => {
      if (action.type.startsWith(sendPrefix)) {
        const eventName = action.type.substring(sendPrefix.length)
        socketClient.emit(eventName, action.payload)
      }
      return next(action)
    }
  }
  const reducer = (state, action) => {
    if (!state) {
      return {
        status: "unset",
      }
    }
    if (typeof action?.type !== "string") {
      return state
    }
    if (!action.type.startsWith(options.basePrefix)) {
      return state
    }
    const actionType = action.type.substring(options.basePrefix.length)
    if (actionType === "connected") {
      return immer(state, draft => {
        draft.status = "connected"
      })
    }
    if (actionType === "disconnected") {
      return immer(state, draft => {
        draft.status = "disconnected"
      })
    }
    return state
  }
  middleware.client = socketClient
  middleware.reducer = reducer
  return middleware
}