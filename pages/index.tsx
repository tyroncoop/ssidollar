import { useStore } from 'effector-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as tyron from 'tyron'
import Layout from '../components/Layout'
import { RootState } from '../src/app/reducers'
import { $net } from '../src/store/wallet-network'
import { ZilPayBase } from '../components/ZilPay/zilpay-base'
import styles from './styles.module.scss'
import { setTxId, setTxStatusLoading } from '../src/app/actions'
import {
    $dashboardState,
    updateModalTx,
    updateModalTxMinimized,
} from '../src/store/modal'

function Home() {
    const dispatch = useDispatch()
    const loginInfo = useSelector((state: RootState) => state.modal)
    const net = useStore($net)
    const dashboardState = useStore($dashboardState)
    const [currency, setCurrency] = useState('')
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const [section, setSection] = useState('')
    const [amount, setAmount] = useState('')
    const [address, setAdress] = useState('')
    const $SIAddr = '0x53934bdad86b8ba4df24cc6c5fe3ff35a6bd5fee'

    const handleOnChangeCurrency = (event: { target: { value: any } }) => {
        const value = event.target.value
        setCurrency(value.toUpperCase())
        fetchBalance(value.toLowerCase())
    }

    const handleOnChange = (event: { target: { value: any; name: any } }) => {
        if (event.target.name === 'amount') {
            if (isNaN(event.target.value)) {
                toast.error('Please input a valid number', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    toastId: 1,
                })
            } else {
                setAmount(event.target.value)
            }
        } else {
            setAdress('')
            const addr = tyron.Address.default.verification(event.target.value)
            if (addr !== '') {
                setAdress(addr)
            } else {
                toast.error('Wrong address.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    toastId: 5,
                })
            }
        }
    }

    const fetchBalance = async (id: string) => {
        setLoading(true)
        let token_addr: string
        let network = tyron.DidScheme.NetworkNamespace.Mainnet
        if (net === 'testnet') {
            network = tyron.DidScheme.NetworkNamespace.Testnet
        }
        const init = new tyron.ZilliqaInit.default(network)
        try {
            if (id === '$si') {
                const balances =
                    await init.API.blockchain.getSmartContractSubState(
                        $SIAddr,
                        'balances'
                    )
                const balances_ = await tyron.SmartUtil.default.intoMap(
                    balances.result.balances
                )
                try {
                    const balance_zilpay = balances_.get(
                        loginInfo.zilAddr.base16.toLowerCase()
                    )
                    if (balance_zilpay !== undefined) {
                        const _currency = tyron.Currency.default.tyron(id)
                        const finalBalance = balance_zilpay / _currency.decimals
                        setBalance(Number(finalBalance.toFixed(2)))
                    }
                } catch (error) {
                    setBalance(0)
                }
            } else if (id !== 'zil') {
                const init_addr = await tyron.SearchBarUtil.default.fetchAddr(
                    net,
                    'init',
                    'did'
                )
                const get_services =
                    await init.API.blockchain.getSmartContractSubState(
                        init_addr,
                        'services'
                    )
                const services = await tyron.SmartUtil.default.intoMap(
                    get_services.result.services
                )
                token_addr = services.get(id)
                const balances =
                    await init.API.blockchain.getSmartContractSubState(
                        token_addr,
                        'balances'
                    )
                const balances_ = await tyron.SmartUtil.default.intoMap(
                    balances.result.balances
                )
                try {
                    const balance_zilpay = balances_.get(
                        loginInfo.zilAddr.base16.toLowerCase()
                    )
                    if (balance_zilpay !== undefined) {
                        const _currency = tyron.Currency.default.tyron(id)
                        const finalBalance = balance_zilpay / _currency.decimals
                        setBalance(Number(finalBalance.toFixed(2)))
                    }
                } catch (error) {
                    setBalance(0)
                }
            } else {
                const zilpay = new ZilPayBase().zilpay
                const zilPay = await zilpay()
                const blockchain = zilPay.blockchain
                const zilpay_balance = await blockchain.getBalance(
                    loginInfo.zilAddr.base16.toLowerCase()
                )
                const zilpay_balance_ =
                    Number(zilpay_balance.result!.balance) / 1e12

                setBalance(Number(zilpay_balance_.toFixed(2)))
            }
        } catch (error) {
            setBalance(0)
        }
        setLoading(false)
    }

    const handleSubmit = async () => {
        setLoading(true)
        const zilpay = new ZilPayBase()
        const tx_params = await tyron.TyronZil.default.AddFunds(
            address,
            String(amount)
        )
        let tx = await tyron.Init.default.transaction(net)

        dispatch(setTxStatusLoading('true'))
        resetState()
        updateModalTxMinimized(false)
        updateModalTx(true)
        await zilpay
            .call({
                contractAddress: $SIAddr,
                transition: 'Transfer',
                params: tx_params as unknown as Record<string, unknown>[],
                amount: '0',
            })
            .then(async (res) => {
                dispatch(setTxId(res.ID))
                dispatch(setTxStatusLoading('submitted'))
                tx = await tx.confirm(res.ID)
                if (tx.isConfirmed()) {
                    setLoading(false)
                    dispatch(setTxStatusLoading('confirmed'))
                    setTimeout(() => {
                        window.open(
                            `https://devex.zilliqa.com/tx/${
                                res.ID
                            }?network=https%3A%2F%2F${
                                net === 'mainnet' ? '' : 'dev-'
                            }api.zilliqa.com`
                        )
                    }, 1000)
                } else if (tx.isRejected()) {
                    setLoading(false)
                    dispatch(setTxStatusLoading('failed'))
                }
            })
            .catch((err) => {
                throw err
            })
    }

    const resetState = () => {
        setCurrency('')
        setBalance(0)
        setLoading(false)
        setSection('')
        setAmount('')
        setAdress('')
    }

    const spinner = (
        <i
            style={{ color: '#ffff32' }}
            className="fa fa-lg fa-spin fa-circle-notch"
            aria-hidden="true"
        ></i>
    )

    return (
        <Layout>
            {section === '' && (
                <div className={styles.wrapper}>
                    <div
                        style={{
                            marginTop: '3%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h2>
                                <div
                                    onClick={() => {
                                        if (dashboardState === 'connected') {
                                            setSection('currency')
                                        } else {
                                            toast.error('Connect ZilPay', {
                                                position: 'top-right',
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: 'dark',
                                                toastId: 5,
                                            })
                                        }
                                    }}
                                    className={styles.flipCard}
                                >
                                    <div className={styles.flipCardInner}>
                                        <div className={styles.flipCardFront}>
                                            <p className={styles.cardTitle3}>
                                                CURRENCY
                                            </p>
                                        </div>
                                        <div className={styles.flipCardBack}>
                                            <p className={styles.cardTitle2}>
                                                SELECT CURRENCY
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </h2>
                            <h2 style={{ marginLeft: '20px' }}>
                                <div
                                    onClick={() => {
                                        if (dashboardState === 'connected') {
                                            fetchBalance('$si')
                                            setSection('transfer')
                                        } else {
                                            toast.error('Connect ZilPay', {
                                                position: 'top-right',
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: 'dark',
                                                toastId: 5,
                                            })
                                        }
                                    }}
                                    className={styles.flipCard}
                                >
                                    <div className={styles.flipCardInner}>
                                        <div className={styles.flipCardFront}>
                                            <p className={styles.cardTitle3}>
                                                TRANSFER $SI
                                            </p>
                                        </div>
                                        <div className={styles.flipCardBack}>
                                            <p className={styles.cardTitle2}>
                                                TRANSFER $SI FUNDS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </h2>
                        </div>
                    </div>
                </div>
            )}
            {section !== '' && (
                <button className="button" onClick={() => setSection('')}>
                    BACK
                </button>
            )}
            {section === 'currency' && (
                <div>
                    <select onChange={handleOnChangeCurrency}>
                        <option value="">Select Currency</option>
                        <option value="zil">ZIL</option>
                        <option value="zusdt">zUSDT</option>
                    </select>
                    {currency !== '' && (
                        <div style={{ marginTop: '10px', marginLeft: '15px' }}>
                            Balance:{' '}
                            {loading ? spinner : `${balance} ${currency}`}
                        </div>
                    )}
                    {currency !== '' && (
                        <div style={{ display: 'flex', marginTop: '20%' }}>
                            <input
                                name="amount"
                                type="text"
                                style={{ marginRight: '3%' }}
                                onChange={handleOnChange}
                                placeholder="Type amount"
                                autoFocus
                            />
                            <button className={'button primary'}>
                                <p>Submit</p>
                            </button>
                        </div>
                    )}
                </div>
            )}
            {section === 'transfer' && (
                <div>
                    {loading ? (
                        spinner
                    ) : (
                        <>
                            <div style={{ marginTop: '20%' }}>
                                Balance: {balance} $SI
                            </div>
                            <div style={{ display: 'flex', marginTop: '10%' }}>
                                <input
                                    name="address"
                                    type="text"
                                    style={{ marginRight: '3%' }}
                                    onChange={handleOnChange}
                                    placeholder="Type address"
                                    autoFocus
                                />
                                <button
                                    className={`button ${
                                        address !== '' ? 'secondary' : 'primary'
                                    }`}
                                >
                                    <p>{address !== '' ? 'SAVED' : 'SAVE'}</p>
                                </button>
                            </div>
                            {address !== '' && (
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '10%',
                                    }}
                                >
                                    <input
                                        name="amount"
                                        type="text"
                                        style={{ marginRight: '3%' }}
                                        onChange={handleOnChange}
                                        placeholder="Type amount"
                                        autoFocus
                                    />
                                    <button
                                        className={`button ${
                                            amount !== ''
                                                ? 'secondary'
                                                : 'primary'
                                        }`}
                                    >
                                        <p>
                                            {amount !== '' ? 'SAVED' : 'SAVE'}
                                        </p>
                                    </button>
                                </div>
                            )}
                            {amount !== '' && (
                                <div
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        marginTop: '20%',
                                    }}
                                >
                                    <button
                                        onClick={handleSubmit}
                                        className="button secondary"
                                    >
                                        <span>TRANSFER {amount} $SI</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </Layout>
    )
}

export default Home
