import { useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../components/Layout'

function Home() {
    const [currency, setCurrency] = useState('')

    const handleOnChangeCurrency = (event: { target: { value: any } }) => {
        setCurrency(event.target.value)
    }

    const handleOnChangeAmount = (event: { target: { value: any } }) => {
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
            })
        }
    }

    return (
        <Layout>
            <div>
                <select onChange={handleOnChangeCurrency}>
                    <option value="">Select Currency</option>
                    <option value="zil">ZIL</option>
                    <option value="xsgd">XSGD</option>
                    <option value="zusdt">zUSDT</option>
                </select>
                {currency !== '' && (
                    <div style={{ display: 'flex', marginTop: '20%' }}>
                        <input
                            type="text"
                            style={{ marginRight: '3%' }}
                            onChange={handleOnChangeAmount}
                            placeholder="Type amount"
                            autoFocus
                        />
                        <button className={'button primary'}>
                            <p>Submit</p>
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Home
