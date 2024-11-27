import React from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <header className="flex items-center justify-between w-full h-32 bg-layout_element mb-10 px-20">
      <Link to='/'>
        <img className='w-24' src='./src/assets/nasa_logo.svg' />
      </Link>
      <h1 className="text-3xl font-bold text-primary-foreground ">MARS VIEWER</h1>
      <span className='text-primary-foreground'>by Maxim Kupchin</span>
    </header> 
  )
}
