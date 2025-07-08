import React from 'react'
import Image from 'next/image'

const Logo = () => {
    return (
        <>
            <div className='flex items-center w-[180px] md:w-[250px] h-16 relative'>
                <Image
                    src="/assets/image/logo.svg"
                    alt="OneClickDrive Logo"
                    fill
                    className="object-contain"
                />
            </div>
        </>
    )
}

export default Logo
