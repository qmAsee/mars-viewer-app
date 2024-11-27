import React from 'react'

export default function Footer() {
  return (
    <footer className='flex px-20 items-center justify-between w-full h-32 bg-layout_element left-0 bottom-0'>
        <ul className='flex gap-1 flex-col text-white'>
            <li>
                <a className='flex gap-2 hover:opacity-70 transition-all' href='https://t.me/mskupchin' target='_blank'>
                    <img className='w-5' src='./src/assets/telegram_icon.svg'/>
                    <span>telegram</span>
                </a>
            </li>
            <li className='flex gap-2'>
                <a className='flex gap-2 hover:opacity-70 transition-all' href='https://github.com/qmAsee' target='_blank'>
                    <img className='w-5' src='./src/assets/github_icon.svg'/>
                    <span>github</span>
                </a>
            </li>
            <li className='flex gap-2'>
                    <img className='w-5' src='./src/assets/email_icon.svg'/>
                    <span>max.kup.gis@yandex.ru</span>
            </li>
        </ul>
    </footer>
  )
}
