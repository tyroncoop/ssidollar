export enum ModalActionTypes {
    updateLoginAddress,
    updateLoginZilpay,
}

export interface ModalAction {
    type: ModalActionTypes
    payload?: any
}

export function updateLoginInfoAddress(data: String): ModalAction {
    return {
        type: ModalActionTypes.updateLoginAddress,
        payload: data,
    }
}

export function updateLoginInfoZilpay(data: {
    base16: string
    bech32: string
}): ModalAction {
    return {
        type: ModalActionTypes.updateLoginZilpay,
        payload: data,
    }
}
