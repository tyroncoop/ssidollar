import Image from 'next/image'
import { useSelector } from 'react-redux'
import { useStore } from 'effector-react'
import styles from './styles.module.scss'
import { RootState } from '../../../src/app/reducers'
import { $net } from '../../../src/store/wallet-network'
import { $modalDashboard, updateModalDashboard } from '../../../src/store/modal'
import ZilpayIcon from '../../../src/assets/logos/lg_zilpay.svg'
import CloseIcon from '../../../src/assets/icons/ic_cross.svg'

function Component() {
    const loginInfo = useSelector((state: RootState) => state.modal)
    const net = useStore($net)
    const modalDashboard = useStore($modalDashboard)

    if (!modalDashboard) {
        return null
    }

    return (
        <>
            <div className={styles.outerWrapper}>
                <div
                    className={styles.containerClose}
                    onClick={() => updateModalDashboard(false)}
                />
                <div className={styles.container}>
                    <div className={styles.wrapperCloseIco}>
                        <div
                            onClick={() => updateModalDashboard(false)}
                            className="closeIcon"
                        >
                            <Image
                                alt="ico-close"
                                src={CloseIcon}
                                width={15}
                                height={15}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles.wrapperEoa}>
                            <Image
                                width={25}
                                height={25}
                                src={ZilpayIcon}
                                alt="zilpay-ico"
                            />
                            <div className={styles.txtEoa}>Zilliqa Wallet</div>
                        </div>

                        <div
                            style={{
                                marginTop: '1%',
                                marginBottom: '5%',
                                marginLeft: '3%',
                            }}
                        >
                            <a
                                href={`https://devex.zilliqa.com/address/${
                                    loginInfo.zilAddr?.bech32
                                }?network=https%3A%2F%2F${
                                    net === 'mainnet' ? '' : 'dev-'
                                }api.zilliqa.com`}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.txtAddress}
                            >
                                {loginInfo.zilAddr?.bech32}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Component
