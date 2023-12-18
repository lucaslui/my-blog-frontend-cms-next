'use client'

import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

import { Validation } from '@/protocols/validation'
import AccountContext from '@/contexts/account-context'
import { Button, FormStatus, Input, Logo } from '@/components'
import { Authentication } from '@/usecases/boundaries/input/auth/authentication'

type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
    const { setCurrentAccount } = useContext(AccountContext)

    const router = useRouter()

    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: ''
    })

    useEffect(() => validate('email'), [state.email])
    useEffect(() => validate('password'), [state.password])

    const validate = (field: string): void => {
        const { email, password } = state
        const formData = { email, password }
        // setState(oldState => ({ ...oldState, [`${field}Error`]: validation.validate(field, formData) }))
        setState(oldState => ({ ...oldState, isFormInvalid: !!oldState.emailError || !!oldState.passwordError }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (!state.isLoading && !state.isFormInvalid) {
                setState(oldState => ({
                    ...oldState,
                    isLoading: true
                }))
                const account = await authentication.auth({ email: state.email, password: state.password })
                if (account?.accessToken && setCurrentAccount) {
                    setCurrentAccount({ accessToken: account.accessToken })
                    router.push('/')
                }
            }
        } catch (error: any) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className={styles.login} >
            <Logo />
            <hr />
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input onChange={handleChange} title={state.emailError} type="email" name="email" placeholder="Digite seu e-mail" />
                <Input onChange={handleChange} title={state.passwordError} type="password" name="password" placeholder="Digite sua senha" />
                <Button disabled={state.isFormInvalid} type="submit"> Entrar </Button>
                <Link href="sign-up" className={styles.link}>Não tem cadastro? Cadastre-se aqui</Link>
                <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
            </form>
        </div>
    )
}

export default Login
