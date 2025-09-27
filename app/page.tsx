import Link from "next/link";
import { cinzel, playfairDisplay } from "./layout";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";


export default async function Home() {

  return (
    <div className="container mx-auto">
      <div className=" p-2 flex justify-between items-center ">
        <h1 className={`${playfairDisplay.className}`}>BSFriend</h1>
        <ul className="hidden md:gap-4 md:flex md:visible text-black hover:text-gray-500">
          <li className="cursor-pointer"><Link href="/books">Bible</Link></li>
          <li className="cursor-pointer"><Link href="/notes">Notes</Link></li>
          <li className="cursor-pointer">Contact</li>
        </ul>
        <div className="flex">
          <SignedOut>
            <div className="flex gap-2">
              <SignUpButton />
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
      </div>
      <div className=" mx-auto h-screen flex justify-center items-center">
        <div className=" flex flex-col items-center">
          <h1 className={`${playfairDisplay.className} text-center md:text-xl`}>A biblestudy platform for everyone.</h1>
          <p className={`${cinzel.className} text-center text-[8px] md:text-[16px]`}>Growing with knowledge of your faith is journey. Take it with confidence.</p>
          <div className="flex gap-2">
            <Link className="bg-sky-600  text-white cursor-pointer px-2 py-1 mt-2 rounded-xl" href="/books">Start here</Link>
            <button className=" hover:cursor-pointer">Get the app</button>
          </div>
        </div>
      </div>
    </div>
  );
}
