import Link from 'next/link'
import React from 'react'
import styles from '../styles/Home.module.css'

export const Menu: React.FC = () => {
    return (
        <div className={styles.nav}>
            <nav className='nav navbar navbar-expand-lg bg-dark p-2'>
                <div className='navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item pr-4'>
                            <Link className='nav-link text-light' href='/'>Home</Link>
                        </li>
                        <li className='nav-item pr-4'>
                            <Link className='nav-link text-light' href='/LivroLista'>Catálogo</Link>
                        </li>
                        <li className='nav-item pr-4'>
                            <Link className='nav-link text-light' href='/LivroDados'>Novo</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}