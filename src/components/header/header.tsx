'use client'

import React, { useContext, useState } from 'react'
import Link from 'next/link'

import styles from './header.module.scss'

import LogoImage from '../../assets/imgs/logo.svg'
import DefaultUserImage from '../../assets/imgs/user.svg'
import AccountContext from '@/contexts/account-context'
import { useRouter } from 'next/navigation'

type Props = {
    sidebarOpened?: boolean
    toggleSidebar?: any
}

const Header: React.FC<Props> = (props: Props) => {
    const { getCurrentAccount } = useContext(AccountContext)

    return (
        <header className={styles.header}>
            <Logo />
            <div className={styles.spacer} />
            {getCurrentAccount && getCurrentAccount()?.accessToken ? <Settings /> : <SignIn />}
        </header>
    )
}

export default Header

const Logo: React.FC = () => {
    return (
        <Link href='/' className={styles.logo}>
            <img src={LogoImage} alt="logo" />
            <div>
                <h1> Internet of Things K-Library </h1>
                <h2>
                    Aiming to disseminate knowledge about the Internet of Things in a simple, practical and objective way
                </h2>
            </div>
        </Link>
    )
}

const Settings: React.FC = () => {
    const [dropmenu, setDropmenu] = useState(false)
    const router = useRouter()

    const toggleDropmenu = (): void => {
        setDropmenu(!dropmenu)
        router.push('/profile')
    }

    return (
        <div className={styles.userSettings}>
            <div className={styles.notifications}>
                <i className="fas fa-bell" />
            </div>
            <div className={styles.workbench}>
                <i className="fas fa-plus-square"></i>
            </div>
            <div className={styles.dropdown} onClick={toggleDropmenu}>
                <img src={DefaultUserImage} alt="default-photo" />
                {dropmenu ? <i className="fas fa-sort-up" /> : <i className="fas fa-sort-down" />}
            </div>
        </div>
    )
}

const SignIn: React.FC = () => {
    return (
        <Link href='/auth/sign-in' className={styles.signin}>
            <i className="fas fa-sign-in-alt"></i>
            <span> Entrar </span>
        </Link>
    )
}
