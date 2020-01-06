# redux-sock


<a href="https://actions-badge.atrox.dev/Jaid/redux-sock/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2FJaid%2Fredux-sock%2Fbadge" alt="Build status"/></a> <a href="https://raw.githubusercontent.com/Jaid/redux-sock/master/license.txt"><img src="https://img.shields.io/github/license/Jaid/redux-sock?style=flat-square" alt="License"/></a>  
<a href="https://github.com/Jaid/redux-sock/commits"><img src="https://img.shields.io/github/commits-since/Jaid/redux-sock/v2.0.1?style=flat-square&logo=github" alt="Commits since v2.0.1"/></a> <a href="https://github.com/Jaid/redux-sock/commits"><img src="https://img.shields.io/github/last-commit/Jaid/redux-sock?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/Jaid/redux-sock/issues"><img src="https://img.shields.io/github/issues/Jaid/redux-sock?style=flat-square&logo=github" alt="Issues"/></a>  
<a href="https://npmjs.com/package/redux-sock"><img src="https://img.shields.io/npm/v/redux-sock?style=flat-square&logo=npm&label=latest%20version" alt="Latest version on npm"/></a> <a href="https://github.com/Jaid/redux-sock/network/dependents"><img src="https://img.shields.io/librariesio/dependents/npm/redux-sock?style=flat-square&logo=npm" alt="Dependents"/></a> <a href="https://npmjs.com/package/redux-sock"><img src="https://img.shields.io/npm/dm/redux-sock?style=flat-square&logo=npm" alt="Downloads"/></a>

**Redux middleware and reducer for controlling socket.io clients.**












## Installation
<a href="https://npmjs.com/package/redux-sock"><img src="https://img.shields.io/badge/npm-redux--sock-C23039?style=flat-square&logo=npm" alt="redux-sock on npm"/></a>
```bash
npm install --save redux-sock@^2.0.1
```
<a href="https://yarnpkg.com/package/redux-sock"><img src="https://img.shields.io/badge/Yarn-redux--sock-2F8CB7?style=flat-square&logo=yarn&logoColor=white" alt="redux-sock on Yarn"/></a>
```bash
yarn add redux-sock@^2.0.1
```
<a href="https://jsdelivr.com/package/npm/redux-sock/"><img src="https://img.shields.io/badge/jsDelivr-redux--sock-orange?style=flat-square&logo=html5&logoColor=white" alt="redux-sock on jsDelivr"/></a> <a href="https://unpkg.com/browse/redux-sock/"><img src="https://img.shields.io/badge/UNPKG-redux--sock-orange?style=flat-square&logo=html5&logoColor=white" alt="redux-sock on UNPKG"/></a>
```html
<script src="https://cdn.jsdelivr.net/npm/redux-sock@2.0.1/index.js"/>
```


## Try it out



Open a browser's JavaScript console and execute:

```javascript
const scriptElement = document.createElement("script");
scriptElement.setAttribute("type", "text/javascript");
scriptElement.setAttribute("src", "https://cdn.jsdelivr.net/npm/redux-sock@2.0.1/index.js");
document.querySelector("head").appendChild(scriptElement);
```

redux-sock is now stored in the global variable `reduxSock`. The following console expression should return something other than `"undefined"`.

```javascript
typeof reduxSock.default
```






## Development



Setting up:
```bash
git clone git@github.com:Jaid/redux-sock.git
cd redux-sock
npm install
```
Testing:
```bash
npm run test:dev
```
Testing in production environment:
```bash
npm run test
```


## License
```text
MIT License

Copyright © 2019, Jaid <jaid.jsx@gmail.com> (github.com/jaid)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
