import React from 'react';
import Image from 'next/image';
import image1 from '@/assets/image1.png'
import Link from 'next/link';


const Navbar = () => {
    return (
      <nav>
        <ul className='flex relative gap-30 text-red-700 font-bold text-[22px] ml-4 mt-4'>
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/trends">Trends</Link>
            <Image src={image1} alt='image1' width={100} height={100} className='-mt-2'/>
            <Link href="/music">Music</Link>
            <Link href="/event">Event</Link>

        </ul>
        
      </nav>
    )
  }
  
  export default Navbar