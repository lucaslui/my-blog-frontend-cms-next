'use client'

import React, { useContext, useState } from 'react'
import Link from 'next/link'

import styles from './sidebar.module.scss'

import DefaultPhoto from '../../assets/imgs/user.svg'
import AccountContext from '@/contexts/account-context'
import { useRouter } from 'next/navigation'

type Props = {
  items?: any
  sidebarOpened?: boolean
  toggleSidebar?: any
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const { setCurrentAccount } = useContext(AccountContext)
  const router = useRouter()

  const logout = (): void => {
    setCurrentAccount && setCurrentAccount(null)
    router.push('/')
  }

  return (
    <div className={styles.sidebar} data-status={props.sidebarOpened ? 'open' : 'closed'}>
      <button className={styles.toggle} onClick={props.toggleSidebar}>
        <i className="fas fa-angle-double-left" />
      </button>
      <div className={styles.profileData}>
        <img src={DefaultPhoto} alt="photo" />
        <span> Nome do Usuário </span>
        <Link href="/perfil" rel="author" className={styles.link}>Alterar Foto</Link>
      </div>
      <hr />
      <nav className={styles.menu}>
        { props.items.map((item, index) => <SubMenu items={item} key={index} />) }
      </nav>
      <div className="spacer"></div>
      <div className={styles.logout} onClick={logout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Sair da Conta </span>
      </div>
    </div >
  )
}

export default Sidebar

const SubMenu: React.FC<Props> = (props: Props) => {
  const [children, setChildren] = useState(false)

  const showchildren = (): void => setChildren(!children)

  return (
    <>
      <Link
        className={styles.item}
        href={!props.items.children && `${props.items.path}`}
        onClick={props.items.children && showchildren}>
        <div className={styles.label}>
          {props.items.icon}
          <span>{props.items.name}</span>
        </div>
        <div>
          {props.items.children && children ? <i className="fas fa-sort-up" /> : props.items.children ? <i className="fas fa-sort-down" /> : null }
        </div>
      </Link>
      {children &&
        props.items.children.map((item, index) => {
          return (
            <Link className={styles.subitem} href={`${item.path}`} key={index}>
              <span>{item.name}</span>
            </Link>
          )
        })}
    </>
  )
}
