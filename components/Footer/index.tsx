import React from 'react'
import styles from '../../styles/css/Footer.module.css'
import Image from 'next/image'
import TyronLogo from '../../src/assets/logos/tyron_logo.png'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div
                onClick={() =>
                    window.open(
                        'http://tyron.network/ssiprotocol/tree',
                        '_self'
                    )
                }
                style={{ cursor: 'pointer' }}
            >
                <Image src={TyronLogo} alt="tyron-logo" />
            </div>
            <div className={styles.github}>
                <a
                    className="icon brands fa-github"
                    href="https://github.com/tyroncoop/ssidollar"
                    rel="noreferrer"
                    target="_blank"
                >
                    <span className="label">GitHub</span>
                </a>
            </div>
        </footer>
    )
}

export default Footer
