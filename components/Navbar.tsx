'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

// Temporary mock user for demo purposes
const user = {
  
}

const Navbar = () => {
  const router=useRouter();

  const handleLogout = () => {
    // Replace with actual logout logic
    console.log("User logged out")
  }

  return (
    <header className='navbar'>
      <nav className='flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} />
          <h1>Video Screen</h1>
        </Link>

        {user && (
          <figure className='flex items-center gap-4'>
            <button
              onClick={() => router.push(`/profile/12345`)}
              aria-label="Go to profile"
            >
              <Image
                src= '/assets/images/dummy.jpg'
                alt="User avatar"
                width={36}
                height={36}
                className="rounded-full aspect-square"
              />
            </button>
            <button className='rotate-180'>
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout icon"
                width={24}
                height={24}
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  )
}

export default Navbar
