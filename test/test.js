import path from "path"

import getPort from "get-port"
import socketIoServer from "socket.io"
import {createStore, applyMiddleware, combineReducers} from "redux"
import delay from "delay"
import ms from "ms.macro"

const indexModule = (process.env.MAIN ? path.resolve(process.env.MAIN) : path.join(__dirname, "..", "src")) |> require

/**
 * @type { import("../src") }
 */
const {default: createSockMiddleware} = indexModule

it("should run", async () => {
  let clientConnected = false
  let heyPayload = null
  let lastStatus = null
  const mainReducer = (state, action) => {
    if (action.type === "@@socket/received/hey") {
      heyPayload = action.payload
    }
    if (!state) {
      return {}
    }
    return state
  }
  const port = await getPort()
  const server = socketIoServer(port)
  server.on("connection", client => {
    clientConnected = true
    client.emit("hey", 123)
  })
  const socketMiddleware = createSockMiddleware({
    url: `http://localhost:${port}`,
    events: ["hey"],
  })
  const reducer = combineReducers({
    main: mainReducer,
    socket: socketMiddleware.reducer,
  })
  const store = createStore(reducer, applyMiddleware(socketMiddleware))
  store.subscribe(() => {
    const state = store.getState()
    lastStatus = state.socket.status
    debugger
    expect(["unset", "connected", "disconnected"]).toContain(lastStatus)
  })
  await delay(ms`2 seconds`)
  expect(clientConnected).toBe(true)
  expect(socketMiddleware.client.connected).toBe(true)
  expect(lastStatus).toBe("connected")
  expect(heyPayload).toBe(123)
  await server.close()
  await socketMiddleware.client.close()
  expect(lastStatus).toBe("disconnected")
})