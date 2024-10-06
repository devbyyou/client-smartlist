"use client";

import Image from 'next/image';
import React, { MouseEvent, useEffect, useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { decodeToken, getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useRouter } from 'next/navigation';
import { getuser } from '@/app/store/reducers/user';
import link from '../../public/undraw_profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons/faShop';
import { faBell, faHeart, faNoteSticky, faRightFromBracket, faUser, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons/faGift';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

export default function Profile() {
  const dispatch = useAppDispatch()
  const [hidden, setHidden] = useState(true);
  const [produitId, setproduitId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stateInput, setStateInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const data = useAppSelector((state) => state.searchApi.dataApi);
  const login = useAppSelector((state) => state.login);
  const email = useAppSelector((state) => state.user.credentials.email);
  const name = useAppSelector((state) => state.user.credentials.name);
  const listesCourses = useAppSelector((state) => state.user.credentials.listesCourses);

  const router = useRouter();
  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    if (userData && userData.access_token) {
      const decoded = decodeToken(userData.access_token);// Décode le token pour récupérer les infos utilisateur
      setUser(decoded); // Stocker les informations de l'utilisateur dans l'état
      // dispatch(listDecourse());
      // dispatch(getProduits());
      dispatch(getuser());

    } else {
      // Si aucun token n'est trouvé, redirige vers la page de login
      router.push('/login');
    }
  }, [dispatch, router]);

  if (!user) {
    return <p>Chargement...</p>;
  }

  function handleCLickedLogOut(): void {
    removeUserDataFromLocalStorage()
    router.push('/login');
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>Profile</h2>
        <div className={styles.iconContainer}>
          <span className={styles.iconBag}>
            <FontAwesomeIcon color='#cca771' icon={faShop} />
          </span>
        </div>
      </div>

      <div className={styles.profileInfo}>
        <Image
          src={link}
          alt="Profile Picture"
          width={100}
          height={100}
          className={styles.profileImage}
        />
        <h3 className={styles.profileName}>{name}</h3>
        <p className={styles.profileEmail}>{email}</p>
      </div>

      <div className={styles.profileActions}>
        <button className={styles.actionButton}>
          <span className={styles.icon}>
            <FontAwesomeIcon color='#3DB1CB' icon={faBell} />
          </span>
          Notification
        </button>
        <button className={styles.actionButton}>
          <span className={styles.icon}>
            <FontAwesomeIcon color='#26AD71' icon={faGift} />
          </span>
          Voucher
        </button>
        <button className={styles.actionButton}>
          <span className={styles.icon}>
            <FontAwesomeIcon color='#EC534A' icon={faHeart} />

          </span>
          Wishlist
        </button>
      </div>

      <div className={styles.profileOptions}>
        <div className={styles.option}>
          <span className={styles.icon}>
            <FontAwesomeIcon color='#26AD71' icon={faUser} />
          </span>
          <p>My Profile</p>
        </div>
        <div className={styles.option}>
          <span className={styles.icon}>
            <FontAwesomeIcon color='#26AD71' icon={faGear} />
          </span>
          <p>Notification Setting</p>
        </div>
        <div
          onClick={handleCLickedLogOut}
          className={`${styles.option} ${styles.optionLogout}`}
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}>
          <span className={styles.icon}>
            <FontAwesomeIcon color={hidden ? '#EC534A' : '#fff'} icon={faRightFromBracket} />
          </span>
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
}