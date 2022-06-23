import { combineReducers } from '@reduxjs/toolkit'
import { ModalAction, ModalActionTypes } from './actions'
import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const initialState = {
    address: null,
    zilAddr: null,
}

function modalReducer(state = initialState, action: ModalAction) {
    switch (action.type) {
        case ModalActionTypes.updateLoginAddress:
            return {
                ...state,
                address: action.payload,
            }
        case ModalActionTypes.updateLoginZilpay:
            return {
                ...state,
                zilAddr: action.payload,
            }
        default:
            return state
    }
}

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null)
        },
        setItem(_key, value) {
            return Promise.resolve(value)
        },
        removeItem(_key) {
            return Promise.resolve()
        },
    }
}

const storage =
    typeof window === 'undefined'
        ? createNoopStorage()
        : createWebStorage('local')

const reducer = combineReducers({ modal: modalReducer })
const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = persistReducer(persistConfig, reducer)
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
