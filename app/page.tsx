'use client'
import Link from "next/link";
import localFont from "next/font/local";
import { useState } from "react";
import FeaturesSection from "@/components/FeaturesSection";
import VideoSection from "@/components/VideoSection";
import ValueSection from "@/components/ValueSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";



const playfairDisplay = localFont({
  src: "../public/PlayfairDisplay-VariableFont.ttf"
})

const cinzel = localFont({
  src: "../public/Cinzel-VariableFont.ttf"
})

export default function Home() {

  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <div className="">
      <Header menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
      <div
        className="mx-auto h-screen flex justify-center items-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="flex flex-col items-center z-10">
          <h1 className={`${playfairDisplay.className} text-center md:text-xl text-white`}>
            A biblestudy platform for everyone.
          </h1>
          <p className={`${cinzel.className} text-center text-[8px] md:text-[16px] text-white`}>
            Growing with knowledge of your faith is journey. Take it with confidence.
          </p>
          <div className="flex gap-2">
            <Link className="bg-sky-600 text-white cursor-pointer px-2 py-1 mt-2 rounded-lg" href="/books">
              Start here
            </Link>
            <button className="hover:cursor-pointer text-white">Get the app</button>
          </div>
        </div>
      </div>
      <FeaturesSection />
      <VideoSection/>
      <ValueSection/>
      <TestimonialSection/>
    </div>
  );
}
