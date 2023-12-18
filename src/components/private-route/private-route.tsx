import React, { useContext } from 'react'
import Link from 'next/link'

import AccountContext from '@/contexts/account-context'

type Props = {
    children: any
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
    const { getCurrentAccount } = useContext(AccountContext)
    return getCurrentAccount && getCurrentAccount()?.accessToken ? props.children : <Link href="/auth/sign-in" replace />
}

export default PrivateRoute
