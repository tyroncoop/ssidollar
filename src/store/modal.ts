import { createDomain } from 'effector'

export let txType: any
export let modalDashboard: boolean
export let modalTx: boolean
export let showZilpay: boolean
export let dashboardState: any

const modalTxDomain = createDomain()
export const updateModalTx = modalTxDomain.createEvent<boolean | false>()
export const $modalTx = modalTxDomain
    .createStore<boolean | false>(false)
    .on(updateModalTx, (_, payload) => payload)

const modalTxDomainMinimized = createDomain()
export const updateModalTxMinimized = modalTxDomainMinimized.createEvent<
    boolean | false
>()
export const $modalTxMinimized = modalTxDomainMinimized
    .createStore<boolean | false>(false)
    .on(updateModalTxMinimized, (_, payload) => payload)
const modalDashboardDomain = createDomain()
export const updateModalDashboard = modalDashboardDomain.createEvent<
    boolean | false
>()
export const $modalDashboard = modalDashboardDomain
    .createStore<boolean | false>(false)
    .on(updateModalDashboard, (_, payload) => payload)

const showZilpayDomain = createDomain()
export const updateShowZilpay = showZilpayDomain.createEvent<boolean | false>()
export const $showZilpay = showZilpayDomain
    .createStore<boolean | false>(false)
    .on(updateShowZilpay, (_, payload) => payload)

const dashboardStateDomain = createDomain()
export const updateDashboardState = dashboardStateDomain.createEvent<any>()
export const $dashboardState = dashboardStateDomain
    .createStore<any | null>(null)
    .on(updateDashboardState, (_, payload) => payload)

const txTypeDomain = createDomain()
export const updateTxType = txTypeDomain.createEvent<any>()
export const $txType = txTypeDomain
    .createStore<any | null>(null)
    .on(updateTxType, (_, payload) => payload)
