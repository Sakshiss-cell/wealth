import React from 'react'
import { SignedOut, SignedIn, SignUpButton, UserButton, SignInButton } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

import { PenBox, LayoutDashboard } from 'lucide-react';


const Header = () => {
  return (
    <div className='top-0 fixed w-full bg-white/80 backdrop-blur-md z-50 border-b'>

      <nav className='container mx-auto py-4 flex item-center justify-between'>
        {/* left side header */}
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="wealth log" height={60} width={200} className='h-12 w-auto object-contain' />
        </Link>



         {/* right side header */}
        <div className='flex item-center space-x-4'>
          <SignedIn>

            <Link href={"/dashboard"} className='text-gray-600 hover:text-blue-600 gap-2 flex item-center'>
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className='hidden md:inline mr-2' >Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"}>
              <Button>
                <PenBox size={18} />
                <span className='hidden md:inline mr-2' >Add Transaction</span>
              </Button>
            </Link>

          </SignedIn>
          <SignedOut>

            {/* after login send to dashbiard by forceRedirectUrl */}
            <SignInButton forceRedirectUrl='/dashboard' >
              <Button variant="outline">
                Log in
              </Button>
            </SignInButton>


            {/* <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton> */}
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-12 h-12",
              }
            }} />

          </SignedIn>
        </div>

      </nav>
    </div>
  )
}

export default Header