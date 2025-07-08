'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ClipboardList, CircleUserRound, LogOut } from "lucide-react";
import Logo from './Logo';

const Navbar = () => {
    const [isLogging, setLogging] = useState(true)
    const username = 'Vinay'






    return (
        <>
            <header className='flex sticky top-0 z-20 w-full'>
                <div className='flex w-full h-16 items-center max-w-[1480px] mx-auto gap-4 px-4'>
                    <div className="flex h-fit w-fit">
                        <Link href={"/"}>
                            <Logo />
                        </Link>
                    </div>
                    <div className='flex flex-1 items-center justify-end h-full w-full gap-4'>
                        <div className='hidden lg:flex w-full h-full justify-end'>
                            <ul className='flex w-fit h-full gap-6'>
                                {isLogging && NavItems.map((item, index) => (
                                    <li key={index} className='navlink w-fit h-full items-center justify-center flex group border-b-2 border-transparent hover:border-white transition-all'>
                                        <Link
                                            href={item.link}
                                            className='flex items-center gap-2 text-sm px-3 py-2 font-medium text-black hover:text-gray-600 transition-colors'
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}

                                <li className='navlink w-fit h-full items-center justify-center flex group border-b-2 border-transparent hover:border-white transition-all'>
                                    {
                                        isLogging ? (
                                            <div className='flex items-center gap-2 text-sm px-3 py-2 font-medium text-black hover:text-gray-600 transition-colors'>
                                                <CircleUserRound size={18} />
                                                {username}
                                            </div>
                                        ) : (
                                            <Link href='/login' className='flex items-center gap-2 text-sm px-3 py-2 font-medium text-black hover:text-gray-600 transition-colors'>
                                                <CircleUserRound size={18} />
                                                login
                                            </Link>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar

const NavItems = [
    {
        label: "DashBoard",
        icon: ClipboardList,
        link: "/Dashboard"
    },
    {
        label: "Log Out",
        icon: LogOut,
        link: "/"
    }
]


