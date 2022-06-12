import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoBroadcast } from "react-icons/go";

export function Header() {
  const { data: session, status } = useSession()
  
  const [show, setShow] = useState(false)
  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <GoBroadcast className="h-8 w-8 mr-2" width="54" height="54"/>
        <Link href="/"><span className="cursor-pointer font-semibold text-xl tracking-tight">Share Web</span></Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-sky-200 border-sky-400 hover:text-white hover:border-white" onClick={()=>{
          setShow(!show)
        }}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full ${show?'hidden': 'block'} flex-grow lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
              Home
            </span>
          </Link>
          <Link href="/docs">
            <span className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
              Docs
            </span>
          </Link>
        </div>
        {
          status === "authenticated"
          ?
          <>
            <div className="flex gap-2">
              <Link href="/program/new">
                <p className="cursor-pointer inline-block text-sm mr-4 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0">New Program</p>
              </Link>
              <Image src={session?.user?.image || ""} alt="You" width={32} height={32} className="rounded-full"></Image>
              <p className="inline-block text-sm py-2 leading-none rounded text-white lg:mt-0">{session?.user?.name}</p>
            </div>
          </>
          :
          <Link href="/api/auth/signin" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0">Sign in</Link>
        }
      </div>
    </nav>
  )
}