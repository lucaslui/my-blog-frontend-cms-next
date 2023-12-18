import React from 'react'

import styles from './layout.module.scss'

import LoginHeader from '@/components/login-header/login-header'
import Footer from '@/components/footer/footer'

type Props = {
    children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LoginHeader />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default RootLayout
