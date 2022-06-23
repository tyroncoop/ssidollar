import { createDomain } from 'effector'

export let modalDashboard: boolean
export let showZilpay: boolean
export let dashboardState: any

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
