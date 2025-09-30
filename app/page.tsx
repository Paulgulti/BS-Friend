'use client'
import Link from "next/link";
// import { cinzel, playfairDisplay } from "./layout";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import localFont from "next/font/local";
import { useState } from "react";



const playfairDisplay = localFont({
  src: "../public/PlayfairDisplay-VariableFont.ttf"
})

const cinzel = localFont({
  src: "../public/Cinzel-VariableFont.ttf"
})

export default function Home() {

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <div className="container mx-auto">
      <div className="relative p-2 flex justify-between items-center ">
        <h1 className={`${playfairDisplay.className}`}>BSFriend</h1>
        <ul className="hidden md:gap-4 md:flex md:visible ">
          <li className="cursor-pointer hover:text-black text-gray-500"><Link href="/books">Bible</Link></li>
          <li className="cursor-pointer hover:text-black text-gray-500"><Link href="/notes">Notes</Link></li>
          <li className="cursor-pointer hover:text-black text-gray-500">Contact</li>
        </ul>
        
        {/* Mobile menu - appears when menuOpened is true */}
        <div className={`absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden flex flex-col gap-2 p-4 z-10 transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpened 
            ? 'opacity-100 translate-y-0 visible max-h-96' 
            : 'opacity-0 -translate-y-full invisible max-h-0'
        }`}>
          <Link className="w-full cursor-pointer hover:bg-gray-200 hover:text-black text-gray-500 p-2 rounded transition-colors" href="/books"><span>Bible</span></Link>
          <Link className="w-full cursor-pointer hover:bg-gray-200 hover:text-black text-gray-500 p-2 rounded transition-colors" href="/notes"><span>Notes</span></Link>
          <div className="w-full cursor-pointer hover:bg-gray-200 hover:text-black text-gray-500 p-2 rounded transition-colors"><span>Contact</span></div>
        </div>
        <div className="flex">
          <SignedOut>
            <div className="flex gap-2">
              <SignUpButton />
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton/>
            {/* <SignOutButton /> */}
          </SignedIn>
          <div className="md:hidden flex items-center justify-center pl-2">
            {menuOpened ? (
              <div className="relative">
                <svg
                  className="w-5 h-5 hover:cursor-pointer"
                  onClick={() => setMenuOpened(!menuOpened)}
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path> </g>
                </svg>
              </div>
            ) : (
              <svg
                className="w-6 h-6 hover:cursor-pointer"
                onClick={() => setMenuOpened(!menuOpened)}
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect>
                  <g> <path d="M4 19h16v-2H4v2zm16-6H4v2h16v-2zM4 9v2h16V9H4zm16-4H4v2h16V5z"></path> </g> </g>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className=" mx-auto h-screen flex justify-center items-center">
        <div className=" flex flex-col items-center">
          <h1 className={`${playfairDisplay.className} text-center md:text-xl`}>A biblestudy platform for everyone.</h1>
          <p className={`${cinzel.className} text-center text-[8px] md:text-[16px]`}>Growing with knowledge of your faith is journey. Take it with confidence.</p>
          <div className="flex gap-2">
            <Link className="bg-sky-600  text-white cursor-pointer px-2 py-1 mt-2 rounded-lg" href="/books">Start here</Link>
            <button className=" hover:cursor-pointer">Get the app</button>
          </div>
        </div>
      </div>
    </div>
  );
}
