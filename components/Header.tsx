// Importing required files
import Image from 'next/image'
import React from 'react'
import logo from "../public/download.png"
import smlogo from "../public/reddit-logo.png"
import {ChevronDownIcon, HomeIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {BellIcon, ChatBubbleOvalLeftIcon, GlobeAmericasIcon, PlusIcon, SparklesIcon, MegaphoneIcon, VideoCameraIcon, UserIcon, MoonIcon, QuestionMarkCircleIcon, InformationCircleIcon, ClipboardDocumentListIcon, ArrowDownOnSquareIcon, ArrowRightOnRectangleIcon} from '@heroicons/react/24/outline'
import {useState, useEffect} from 'react';
import {useTheme} from 'next-themes'
import { signIn, signOut, useSession} from 'next-auth/react';
import Link from 'next/link'

// Header component
function Header() {

  // Creating UseState constant for the menu in mobile mode
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Creating UseTheme constant for dark mode
  const {theme, setTheme} = useTheme()

  // Handling hydration error
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Session constant to get access to cookie
  const {data: session} = useSession(); 

  if (!mounted) return null

  return (
    // Whole div for header
    <div className={theme == 'light' ? 'sticky bg-white top-0 z-50 flex px-4 py-2 shaddow-sm': 'sticky bg-black top-0 z-50 flex px-4 py-2 shaddow-sm'}>
      {/* Large Logo */}
        <div className='hidden relative lg:inline-flex h-10 w-20 flex-shrink-0 cursor-pointer'>
            <Link href='/'>
              <Image 
                objectFit='contain'
                src={logo} alt='/'
                layout='fill'
              />
            </Link>
            
        </div>
        {/* Small Logo */}
        <div className='relative h-9 w-12 flex-shrink-0 cursor-pointer lg:hidden'>
            <Link href='/'>
              <Image 
                objectFit='contain'
                src={smlogo} alt='/'
                layout='fill'
              />
            </Link>      
        </div>
        {/* Home icon and arrow */}
        <div className='mx-7 flex items-center xl:min-w-[300px]'>
          <HomeIcon className='h-5 w-5'/>
          <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
          <ChevronDownIcon className='ml-3 h-5 w-5'/>
        </div>
        {/* Search Box */}
        <form className={theme == 'light' ? 'flex flex-1 items-center space-x-2 rounded-2xl border border-gray-200  bg-gray-100 px-3 py-1': 'flex flex-1 items-center space-x-2 rounded-2xl border border-gray-200  bg-gray-800 px-3 py-1'}>
          <MagnifyingGlassIcon className='h-6 w-6 text-gray-400'/>
          <input 
          className='flex-1 bg-transparent outline-none ' 
          type='text' 
          placeholder='Search Reddit'/>
          <button type='submit' hidden/>
        </form>
        {/* Other Icons for when full screen*/}
        <div className='mx-5 text-gray-500 space-x-2 hidden lg:inline-flex'>
          <SparklesIcon className='icon'/>
          <GlobeAmericasIcon className='icon'/>
          <VideoCameraIcon className='icon'/>
          <hr className='h-10 border bg-gray-100'/>
          <ChatBubbleOvalLeftIcon className='icon'/>
          <BellIcon className='icon'/>
          <MegaphoneIcon className='icon'/>
          <PlusIcon className='icon'/>
        </div>
        {/* Account Menu */}
        {session ? (
          <div onClick={() => setMenuOpen(!menuOpen)} className='ml-5 flex items-center text-gray-500 space-x-2'>
            <button className='border-gray-300 border py-1 rounded-md hover:bg-transparent inline-flex items-center'>
              <UserIcon className='smicon mr-0'/>
              <div className='flex-1 text-xs'>
                <p className={theme == 'light' ? 'truncate text-black': 'truncate text-white'}>{session?.user?.name}</p>
                <p className='text-gray-400'>1 Karma</p>
              </div>
              <ChevronDownIcon className='h-5 w-5 flex-shrink-0 cursor-pointer rounded-sm'/>
            </button>
          </div>
        ):(
          <div onClick={() => setMenuOpen(!menuOpen)} className='ml-5 flex items-center text-gray-500 space-x-2'>
            <button className='hover:border-gray-900 hover:bg-transparent inline-flex items-center'>
              <UserIcon className='smicon mr-0'/>
              <ChevronDownIcon className='h-5 w-5 cursor-pointer rounded-sm'/>
            </button>
          </div>
        )}
        {/* Parts of the dropdown menu */}
        <ul className={menuOpen && theme == 'light' ? 'activeLightMenu': menuOpen ? 'activeDarkMenu' : 'inactiveMenu'}>
          <li onClick={() => setTheme(theme == 'light' ? 'dark': 'light')} className='inline-flex hover:bg-blue-500 hover:text-white items-center mt-2 px-2 py-2'>
            <MoonIcon className='smicon ml-2 mr-3'/>
            Dark Mode
            <label htmlFor="check" className={theme == 'light' ? 'bg-gray-100 ml-14 mr-2 relative w-10 h-7 rounded-full': 'bg-gray-500 ml-14 mr-2 relative w-10 h-7 rounded-full'}>
              <span className={theme == 'light' ? 'w-5 h-5 outline outline-gray-300 bg-white absolute rounded-full left-1 top-1 drop-shadow-lg transition-all duration-100': 'w-5 h-5 outline outline-gray-300 bg-white absolute rounded-full top-1 drop-shadow-lg left-4 transition-all duration-100'}></span>
            </label>
          </li>
          <li className='inline-flex hover:text-white hover:bg-blue-500 px-2 py-2'>
            <QuestionMarkCircleIcon className='smicon ml-2 mr-3'/>
            Help Center
          </li>
          <li className='inline-flex hover:text-white hover:bg-blue-500 px-2 py-2'>
            <InformationCircleIcon className='smicon ml-2 mr-3'/>
            More
            <ChevronDownIcon className='smicon w-5 h-5 left-28 mr-4 relative'/>
          </li>
          <li className='inline-flex hover:text-white hover:bg-blue-500 px-2 py-2'>
            <ClipboardDocumentListIcon className='smicon ml-2 mr-3'/>
            Terms and Policies
            <ChevronDownIcon className='smicon w-5 h-5 left-4 mr-4 relative'/>
          </li>
          <hr className='mx-auto w-5/6 bg-gray-100'/>
          {/* Log In/Out based on if session is active */}
          {session ? (
            <li onClick={() => signOut()}  className='inline-flex hover:text-white hover:bg-blue-500 px-2 py-2'>
              <ArrowDownOnSquareIcon className='smicon ml-2 mr-3'/>
              Log Out
            </li>
          ):(
            <li onClick={() => signIn()}  className='inline-flex hover:text-white hover:bg-blue-500 px-2 py-2'>
              <ArrowDownOnSquareIcon className='smicon ml-2 mr-3'/>
              Log In / Sign Up
            </li>
          )}
          
        </ul>
    </div>
  ) 
}

export default Header 