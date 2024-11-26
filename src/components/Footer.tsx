import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import image1 from '@/assets/image1.png';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa'


const Footer = () => {
  return (
    <div className='mt-[50%] ml-[25%]'>
         <Image src={image1} alt='image1' width={100} height={100} className='ml-[30%]'/>
        <ul className='flex relative gap-[60px] text-red-700 font-bold text-[22px] mt-4 w-scre ml-[50px]'>
            <Link className='hover:text-red-400'href="/">Home</Link>
            <Link className='hover:text-red-400'href="/about">About Us</Link>
            <Link className='hover:text-red-400' href="/contact">Contact</Link>
            <Link className='hover:text-red-400'href="/terms">Terms</Link>
            <Link className='hover:text-red-400'href="/newsletter">Newsletter</Link> 

        </ul>

        <span className='ml-[20%] text-red-700 mt-[10px]'>Copyright 2024 e.gist entertainment media</span>

        <div className='flex relative gap-[30px] text-red-700 ml-[30%] mt-[10px] text-[22px]'><Link href='www.facebook.com'><FaFacebook/></Link> <FaTwitter/> <FaInstagram/></div>
    </div>
  )
}

export default Footer
