import Link from "next/link";
import { cinzel, playfairDisplay } from "./layout";

export default function Home() {

  return (
    <div className="container mx-auto">
      <div className=" p-2 flex justify-between items-center ">
        <h1 className={`${playfairDisplay.className}`}>BSFriend</h1>
        <ul className="hidden md:gap-4 md:flex md:visible">
          <li className="cursor-pointer"><Link href="/books">Bible</Link></li>
          <li>BSBuddy</li>
          <li>Contact</li>
        </ul>
        <button>Get the app</button>
      </div>
      <div className=" mx-auto h-screen flex justify-center items-center">
        <div className=" flex flex-col items-center">
          <h1 className={`${playfairDisplay.className} text-center md:text-xl`}>A biblestudy platform for everyone.</h1>
          <p className={`${cinzel.className} text-center text-[8px] md:text-[16px]`}>Growing with knowledge of your faith is journey. Take it with confidence.</p>
          <Link className="cursor-pointer border border-red-400 px-1 py-1 mt-2" href="/books">Start here</Link>
        </div>
      </div>
    </div>
  );
}
