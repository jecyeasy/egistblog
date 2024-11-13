import React from 'react';
import Image from 'next/image';
import image1 from '@/assets/image1.png'
import Link from 'next/link';


const Navbar = () => {
    return (
      <nav>
        <ul className='flex relative gap-[60px] text-red-700 font-bold text-[22px] mt-4 w-scre ml-[25%]'>
            <Link className='hover:text-red-400'href="/">Home</Link>
            <Link className='hover:text-red-400'href="/movies">Movies</Link>
            <Link className='hover:text-red-400' href="/trends">Trends</Link>
            <Image src={image1} alt='image1' width={100} height={100} className='-mt-2'/>
            <Link className='hover:text-red-400'href="/music">Music</Link>
            <Link className='hover:text-red-400'href="/event">Event</Link>

        </ul>
        
      </nav>
    )
  }
  
  export default Navbar