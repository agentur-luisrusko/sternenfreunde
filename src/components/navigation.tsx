import openMenu from '@/icon/open.svg';
import closeMenu from '@/icon/close.svg';
import Image from 'next/image';

export default function Navigation () {
    return (
        <nav>
            <img src="/assets/logo.png" alt="Logo" />
            <button>
                <Image src={openMenu} alt="Telefon" width={24} height={24} />
            </button>
            <ul className="">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}