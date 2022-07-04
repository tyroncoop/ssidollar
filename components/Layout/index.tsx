import { useStore } from 'effector-react'
import Head from 'next/head'
import Image from 'next/image'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import {
    Dashboard,
    DashboardModal,
    Footer,
    TransactionStatus,
    TransactionStatusMinimized,
} from '..'
import $siLogo from '../../src/assets/logos/$SI.png'
import { $modalTx } from '../../src/store/modal'
import styles from './styles.module.scss'

interface LayoutProps {
    children: ReactNode
}

function LayoutSearch(props: LayoutProps) {
    const { children } = props
    const modalTx = useStore($modalTx)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Head>
                <title>SSI Dollar</title>
            </Head>
            <div id="bg" />
            <div id="wrapper">
                <ToastContainer
                    closeButton={false}
                    progressStyle={{ backgroundColor: '#eeeeee' }}
                />
                <div className={styles.logoWrapper}>
                    <Image src={$siLogo} alt="$si-logo" />
                </div>
                <Dashboard />
                {!modalTx && children}
                {modalTx && <TransactionStatus />}
                <TransactionStatusMinimized />
                <DashboardModal />
                <Footer />
            </div>
        </div>
    )
}

export default LayoutSearch
