import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import '../styles/globals.scss'
import styles from './layout.module.scss'

import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

const roboto = Roboto({
    subsets: ['latin'],
    style: ["normal", "italic"],
    weight: ['400', '500', '700', '900'],
})

export const metadata: Metadata = {
    title: 'Full Stack IoT Tutorials',
    description: 'Free web tutorials about Internet of Things',
    authors: [{ name: "Lucas Lui Motta", url: "https://github.com/lucaslui" }],
    keywords: 'Internet of Things',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default RootLayout
