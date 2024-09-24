"use client";
import styles from './styles/Home.module.css';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faHome, faPersonFalling, faQrcode, faShop } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { searchApi } from './store/reducers/searchApi';

export default function Home() {
  const dispatch = useAppDispatch()
  const [showDropdown, setShowDropdown] = useState(false);
  const [stateInput, setStateInput] = useState('');
  const data = useAppSelector((state) => state.searchApi.dataApi);

  useEffect(() => {
    if (stateInput) {
      dispatch(searchApi({ stateInput }));
    }
  }, [stateInput, dispatch]);

  // console.log("data ------>l.19 homePage", data);
  // console.log("homePage data.generic_name ------>l.19 ", data.generic_name);


  async function handleChangeInput(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setShowDropdown(true);
    await dispatch(searchApi({ stateInput: inputValue }))
  }
  const handleSelectItem = (productName: string) => {
    setStateInput(productName); // Met à jour l'input avec la sélection
    setShowDropdown(false); // Masque la liste déroulante après la sélection
  };
  return (
    <div className={styles.homePage}>
      {/* Header avec retour en arrière */}
      <header className={styles.header}>
        <button className={styles.backButton}>&#8592;</button>
      </header>

      {/* Liste de courses */}
      <section className={styles.shoppingList}>
        <h1 className={styles.title}>Liste de courses</h1>

        <div className={styles.itemCard}>
          <div className={styles.itemDetails}>
            <img src="/images/baguette.png" alt="Baguette" className={styles.itemImage} />
            {/* <Image src="/profile-pic.png" alt="Profile" width={40} height={40} className={styles.profileImage} /> */}
            <div>
              <h2>Baguette</h2>
              <p>$2.2/pcs</p>
            </div>
          </div>
          <button className={styles.addButton}>+</button>
        </div>

        <div className={styles.itemCard}>
          <div className={styles.itemDetails}>
            <img src="/images/mango.png" alt="Mango" className={styles.itemImage} />
            <div>
              <h2>Mango</h2>
              <p>$1.8/kg</p>
            </div>
          </div>
          <button className={styles.addButton}>+</button>
        </div>
      </section>

      {/* Barre de recherche */}
      {/* <section className={styles.searchSection}>
        <input value={stateInput} onChange={handleChangeInput} type="text" className={styles.searchInput} placeholder="Search fresh groceries" />
      </section> */}

      {/* Barre de recherche avec liste déroulante */}
      <section className={styles.searchSection}>
        <input
          value={stateInput}
          onChange={handleChangeInput}
          type="text"
          className="w-full p-2 border rounded-md bg-gray-800 text-white placeholder-gray-400"
          placeholder="Search fresh groceries"
        />
        {showDropdown && data && data.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg mt-1 text-white">
            {data.map((product: any, index: number) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-600"
                onClick={() => handleSelectItem(product.product_name || product.generic_name)}
              >
                {product.product_name || product.generic_name}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section Récent */}
      <section className={styles.recentSection}>
        <h2>Récent <a href="#">see all</a></h2>
        <div className={styles.recentItems}>
          <img src="/images/mango.png" alt="Mango" />
          <img src="/images/avocado.png" alt="Avocado" />
          <img src="/images/bread.png" alt="Bread" />
          <img src="/images/strawberry.png" alt="Strawberry" />
        </div>
      </section>

      {/* Section Suggestions */}
      <section className={styles.suggestionsSection}>
        <h2>Suggestions</h2>
        <div className={styles.suggestions}>
          <button>Mango</button>
          <button>Avocado</button>
          <button>Sweet Fruit</button>
          <button>Grape</button>
          <button>Bread</button>
          <button>Pineapple</button>
          <button>Raw Meat</button>
        </div>
      </section>

      {/* Section Catégories */}
      <section className={styles.categoriesSection}>
        <h2>Categories <a href="#">see all</a></h2>
        <div className={styles.categories}>
          <img src="/images/kiwi.png" alt="Kiwi" />
          <img src="/images/veggie.png" alt="Veggie" />
          <img src="/images/bread.png" alt="Bread" />
          <img src="/images/meat.png" alt="Meat" />
        </div>
      </section>

      {/* Barre de navigation */}
      <nav className={styles.navbar}>
        <button className={`${styles.navItem} ${styles.active}`}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </button>
        <button className={styles.navItem}>
          <FontAwesomeIcon icon={faQrcode} />
        </button>
        <button className={styles.navItem}>
          <FontAwesomeIcon icon={faShop} />
        </button>
        <button className={styles.navItem}>
          <FontAwesomeIcon icon={faPerson} />
        </button>
      </nav>
    </div>
  );
}
