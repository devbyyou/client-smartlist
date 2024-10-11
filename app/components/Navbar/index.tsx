"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQrcode, faShop, faPerson } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Navbar.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
// import styles from '../../styles/Home.module.css';

// import "./styles/globals.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from '../..//hooks/redux';
import { decodeToken, getUserDataFromLocalStorage } from '../..//utils/user';



export default function Navbar() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const userData = getUserDataFromLocalStorage();
        if (userData && userData.access_token) {
            const decoded = decodeToken(userData.access_token);
            setUser(decoded);
        } else {
            // router.push('/');
        }


    }, [dispatch]);


    const pathname = usePathname(); // Utile pour savoir sur quelle page on est
    const navItems = [
        { path: '/home', label: 'Home', icon: faHome },
        { path: '/scanner', label: 'Scanner', icon: faQrcode },
        { path: '/smartli', label: 'Smartli', icon: faShop },
        { path: '/profile', label: 'Profile', icon: faUser }
    ];

    return (
        <>
            {user && (
                <nav className={styles.navbar}>
                    {navItems.map((item) => (
                        <Link href={item.path} key={item.label} className={`${styles.navItem} 
                    ${pathname === item.path ? styles.active : ''}`}>
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
}
