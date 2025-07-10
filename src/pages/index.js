import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const cookies = document.cookie.split('; ')
    const tokenCookie = cookies.find(c => c.startsWith('token='))
    const token = tokenCookie?.split('=')[1]

    if (token === 'adminToken') {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [])
  return (
    <>
      {/* <h1>index</h1> */}
    </>
  );
}
