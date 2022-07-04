(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2525:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(8819);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: external "redux-persist/integration/react"
const react_namespaceObject = require("redux-persist/integration/react");
;// CONCATENATED MODULE: external "@reduxjs/toolkit"
const toolkit_namespaceObject = require("@reduxjs/toolkit");
// EXTERNAL MODULE: ./src/app/actions.ts
var actions = __webpack_require__(9471);
;// CONCATENATED MODULE: external "redux-persist"
const external_redux_persist_namespaceObject = require("redux-persist");
;// CONCATENATED MODULE: external "redux-persist/lib/storage/createWebStorage"
const createWebStorage_namespaceObject = require("redux-persist/lib/storage/createWebStorage");
;// CONCATENATED MODULE: ./src/app/reducers.ts




const initialState = {
    txStatusLoading: 'idle',
    txId: '',
    address: null,
    zilAddr: null
};
function modalReducer(state = initialState, action) {
    switch(action.type){
        case actions/* ModalActionTypes.SetTxStatusLoading */.R_.SetTxStatusLoading:
            return {
                ...state,
                txStatusLoading: action.payload
            };
        case actions/* ModalActionTypes.SetTxId */.R_.SetTxId:
            return {
                ...state,
                txId: action.payload
            };
        case actions/* ModalActionTypes.updateLoginAddress */.R_.updateLoginAddress:
            return {
                ...state,
                address: action.payload
            };
        case actions/* ModalActionTypes.updateLoginZilpay */.R_.updateLoginZilpay:
            return {
                ...state,
                zilAddr: action.payload
            };
        default:
            return state;
    }
}
const createNoopStorage = ()=>{
    return {
        getItem (_key) {
            return Promise.resolve(null);
        },
        setItem (_key, value) {
            return Promise.resolve(value);
        },
        removeItem (_key) {
            return Promise.resolve();
        }
    };
};
const storage =  true ? createNoopStorage() : 0;
const reducer = (0,toolkit_namespaceObject.combineReducers)({
    modal: modalReducer
});
const persistConfig = {
    key: 'root',
    storage
};
const rootReducer = (0,external_redux_persist_namespaceObject.persistReducer)(persistConfig, reducer);
/* harmony default export */ const reducers = (rootReducer);

;// CONCATENATED MODULE: ./src/app/store.ts



const store = (0,toolkit_namespaceObject.legacy_createStore)(reducers);
const persistor = (0,external_redux_persist_namespaceObject.persistStore)(store);

;// CONCATENATED MODULE: ./pages/_app.tsx












function SSIBrowser({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
            store: store,
            children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.PersistGate, {
                persistor: persistor,
                children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                })
            })
        })
    }));
}
/* harmony default export */ const _app = (SSIBrowser);


/***/ }),

/***/ 8819:
/***/ (() => {



/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [471], () => (__webpack_exec__(2525)));
module.exports = __webpack_exports__;

})();