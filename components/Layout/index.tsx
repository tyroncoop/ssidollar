import Head from 'next/head'
import Image from 'next/image'
import { Dashboard, DashboardModal } from '..'
import $siLogo from '../../src/assets/logos/$SI.png'
import styles from './styles.module.scss'

function LayoutSearch() {
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
                <div className={styles.logoWrapper}>
                    <Image src={$siLogo} alt="$si-logo" />
                </div>
                <Dashboard />
                <DashboardModal />
            </div>
        </div>
    )
}

export default LayoutSearch
