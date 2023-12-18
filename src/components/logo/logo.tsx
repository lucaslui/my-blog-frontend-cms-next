import React from 'react'
import Image from 'next/image'

import styles from './logo.module.scss'

import LogoSVG from '../../assets/imgs/logo.svg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const Logo: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.loginLogo}>
            <Image src={LogoSVG} alt="logo" width={100} height={100} />
            <div className={styles.label}>
                <h1> Internet of Things K-Library </h1>
                <h2>
                    Aiming to disseminate knowledge about the Internet of Things in a simple, practical and objective way

                </h2>
            </div>
        </div>
    )
}

export default Logo
