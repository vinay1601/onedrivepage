'use client'
import React from 'react'
import Link from 'next/link'
import { ClipboardList, CircleUserRound, LogOut } from "lucide-react"
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const router = useRouter()
    const username = 'Vinay'

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/'
        dispatch(logout())
        router.push('/login')
    };

    const NavItems = isAuthenticated ? [
        {
            label: "DashBoard",
            icon: ClipboardList,
            link: "/dashboard"
        }
    ] : [];

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
                                {isAuthenticated && NavItems.map((item, index) => (
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

                                {isAuthenticated && (
                                    <li className='navlink w-fit h-full items-center justify-center flex group border-b-2 border-transparent hover:border-white transition-all'>
                                        <button
                                            onClick={handleLogout}
                                            className='flex items-center gap-2 text-sm px-3 py-2 font-medium text-black hover:text-gray-600 transition-colors'
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </li>
                                )}

                                <li className='navlink w-fit h-full items-center justify-center flex group border-b-2 border-transparent hover:border-white transition-all'>
                                    {
                                        isAuthenticated ? (
                                            <div className='flex items-center gap-2 text-sm px-3 py-2 font-medium text-black hover:text-gray-600 transition-colors'>
                                                <CircleUserRound size={18} />
                                                {username}
                                            </div>
                                        ) : (
                                            <Link href='/login' className='flex items-center gap-2 text-sm px-3 py-2 font-medium text-black hover:text-gray-600 transition-colors'>
                                                <CircleUserRound size={18} />
                                                Login
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
