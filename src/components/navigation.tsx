'use client';

import { useState } from 'react';
import openMenu from '@/icon/open.svg';
import closeMenu from '@/icon/close.svg';
import Image from 'next/image';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='flex flex-col w-[576px] fixed top-0 left-[50%] translate-x-[-50%] z-50 justify-between items-center p-4'>
            <div className='flex justify-between items-center w-full'>
                <img src="/assets/img/logo.png" alt="Logo" />
                <button onClick={toggleMenu} className="transition-transform duration-300 hover:scale-110">
                    <Image
                        src={isMenuOpen ? closeMenu : openMenu}
                        alt="Menu"
                        width={24}
                        height={24}
                        className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                    />
                </button>
            </div>
            <ul
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                }`}
            >
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
}