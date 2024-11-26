"use client"
import React from 'react';
import {useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {moviesGenres, musicGenres} from '@/app/lib/Data';
import Image from 'next/image';
import image1 from '@/assets/image1.png'
import Link from 'next/link';

export function Navbar() {
  const [moviesDropdownOpen, setMoviesDropdownOpen] = useState(false)
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false)

    return (
      <nav>
      <ul className="flex space-x-6 relative gap-[60px] text-red-700 font-bold text-[22px] mt-4 w-scre ml-[20%]">
        <li><Link href="/" className="hover:text-red-400">Home</Link></li>
        <li className="relative">
          <button
            onClick={() => setMoviesDropdownOpen(!moviesDropdownOpen)}
            className="flex items-center hover:text-red-400 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={moviesDropdownOpen}
          >
            Movies <FaChevronDown className="ml-1 h-4 w-4 mt-1" />
          </button>
          {moviesDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <li>
                <Link
                  href="/movies"
                  className="block px-4 py-2 text-sm  hover:bg-red-700 text-white"
                  onClick={() => setMoviesDropdownOpen(false)}
                >
                  All Movies
                </Link>
              </li>
              {moviesGenres.map((genre) => (
                <li key={genre.id}>
                  <Link
                    href={`/movies/genre/${genre.name.toLowerCase()}`}
                    className="block px-4 py-2 text-sm hover:bg-red-700 text-white"
                    onClick={() => setMoviesDropdownOpen(false)}
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <Image src={image1} alt='image1' width={100} height={100} className='-mt-2'/>
        <li className="relative">
          <button
            onClick={() => setMusicDropdownOpen(!musicDropdownOpen)}
            className="flex items-center hover:text-red-400 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={musicDropdownOpen}
          >
            Music <FaChevronDown className="ml-1 h-4 w-4 mt-1" />
          </button>
          {musicDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <li>
                <Link
                  href="/music"
                  className="block px-4 py-2 text-sm  hover:bg-red-700 text-white"
                  onClick={() => setMusicDropdownOpen(false)}
                >
                  All Music
                </Link>
              </li>
              {musicGenres.map((genre) => (
                <li key={genre.id}>
                  <Link
                    href={`/music/genre/${genre.name.toLowerCase()}`}
                    className="block px-4 py-2 text-sm hover:bg-red-700 text-white"
                    onClick={() => setMusicDropdownOpen(false)}
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li><Link href="/trends" className="hover:text-red-400">Trends</Link></li>
        <li><Link href="/events" className="hover:text-red-400">Events</Link></li>
      </ul>
        
      </nav>
    )
  }
  
  