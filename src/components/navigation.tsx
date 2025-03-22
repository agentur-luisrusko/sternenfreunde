'use client';

import { useState, useEffect } from 'react';
import openMenu from '@/icon/open.svg';
import closeMenu from '@/icon/close.svg';
import Image from 'next/image';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId, event) => {
        event.preventDefault();

        const section = document.getElementById(sectionId);
        if (!section) return;

        const offset = 110;
        const sectionPosition = section.offsetTop - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth',
        });

        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsMenuOpen(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className='flex flex-col w-[576px] fixed top-0 left-[50%] translate-x-[-50%] z-50 justify-between items-center px-4'>
            <div className='flex justify-between items-center w-full py-[24px]'>
                <img src="/assets/img/logo.png" alt="Logo" className='h-[56px] w-fit'/>
                <button onClick={toggleMenu} className="transition-transform duration-300 hover:scale-110">
                    <Image
                        src={isMenuOpen ? closeMenu : openMenu}
                        alt="Menu"
                        width={24}
                        height={24}
                        className={`transition-transform duration-300 cursor-pointer ${
                            isMenuOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                    />
                </button>
            </div>
            <ul
                className={`overflow-hidden transition-all duration-500 ease-in-out flex ${
                    isMenuOpen ? 'opacity-100 gap-[40px] py-[24px] mt-4 ' : 'max-h-0 gap-[40px] opacity-0 mt-0'
                }`}
            >
                <li>
                    <a
                        href="#start"
                        onClick={(event) => scrollToSection('start', event)}
                    >
                        Start
                    </a>
                </li>
                <li>
                    <a
                        href="#program"
                        onClick={(event) => scrollToSection('program', event)}
                    >
                        Program
                    </a>
                </li>
                <li>
                    <a
                        href="#visit"
                        onClick={(event) => scrollToSection('visit', event)}
                    >
                        Ihr Besuch
                    </a>
                </li>
            </ul>
        </nav>
    );
}