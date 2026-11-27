
"use client";

import React from 'react'
import { useState } from 'react'

function Navbar() {
     const [isOpen, setIsOpen] = useState(false);
     
  return (
    <>
        <header className=' relative w-full bg-white px-4 sm:px-8 lg:px-12 py-5 border-b border-gray-200'>
            <nav className='flex items-center justify-between'>
                <h1 className='text-2xl tracking-tight font-extrabold'>STREETFORM</h1>
               
             <div className='hidden md:flex items-center gap-8' >
                <a href="/Shop" className='text-sm text-gray-700 font-medium hover:text-black'>Shop</a>
               <a href="/New Arrivals" className='text-sm text-gray-700 font-medium hover:text-black'>New Arrivals</a>
               <a href="/About" className='text-sm text-gray-700 font-medium hover:text-black'>About</a>
               </div>
               
               {isOpen && (<div className='absolute top-full left-0 w-full bg-white px-6 py-8 flex flex-col gap-6 md:hidden z-50 shadow-lg border-t border-gray-100' >
                <a href="/Shop" className='text-sm text-gray-700 font-medium hover:text-black'>Shop</a>
               <a href="/New Arrivals" className='text-sm text-gray-700 font-medium hover:text-black'>New Arrivals</a>
               <a href="/About" className='text-sm text-gray-700 font-medium hover:text-black'>About</a>
               </div>)}
               <a href="/cart" className='text-sm font-semibold text-black hover:text-gray-500'>Cart (0)</a>
               <button className='md:hidden text-2xl text-black hover:text-gray-500 transition-colors duration-300' onClick={()=> setIsOpen(!isOpen)}> ☰</button>
            </nav>
        </header>
      
    </>
  )
}

export default Navbar
