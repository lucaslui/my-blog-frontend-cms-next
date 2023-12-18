'use client'

import { createContext } from 'react'

import { AccountModel } from '@/entities/account'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

const AccountContext = createContext<Props>({})

export default AccountContext
