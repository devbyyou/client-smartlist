"use client";
import styles from './styles/Home.module.css';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faHome, faPersonFalling, faQrcode, faShop } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { searchApi } from './store/reducers/searchApi';
import { postProduits } from './store/reducers/produits';
import { listDecourse } from './store/reducers/listdecourse';

export default function Home() {
  const dispatch = useAppDispatch()
  const [produitId, setproduitId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stateInput, setStateInput] = useState('');
  const [link, setLink] = useState("");
  const data = useAppSelector((state) => state.searchApi.dataApi);
  const login = useAppSelector((state) => state.login);
  const listDecourseAPi = useAppSelector((state) => state.listDecourse.credentials);


  useEffect(() => {
    if (stateInput) {
      dispatch(searchApi({ stateInput }));
    }
    dispatch(listDecourse());

  }, [stateInput, dispatch]);





  async function handleChangeInput(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setShowDropdown(true);
    await dispatch(searchApi({ stateInput: inputValue }))
  }

  const handleSelectItem = (product: any) => {
    setStateInput(product.product_name); // Met à jour l'input avec le nom du produit sélectionné
    setproduitId(product._id || product.code || product.id); // Stocke l'ID ou le code-barres du produit
    setShowDropdown(false); // Masquer la liste déroulante après la sélection


  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(searchApi({ stateInput }))
    // Trouver le produit exact basé sur l'ID ou le code-barres
    const selectedProduct = data.find((product) => {
      return product._id === produitId || product.code === produitId;
    });


    if (selectedProduct) {
      console.log("Produit trouvé :", selectedProduct);
      // Ajouter le produit dans la base de données ici
      await dispatch(postProduits({
        userId: 1, // must l'utilisateur est authentifié 
        produitId,
      }))

    } else {
      console.log("Aucun produit trouvé pour :", stateInput);
    }

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


        {
          listDecourseAPi.produits?.map((list, index) =>

            <div key={index} className={styles.itemCard}>
              <div className={styles.itemDetails}>
                {/* <img src="/images/mango.png" alt="Mango" className={styles.itemImage} /> */}
                <img src={list.image} alt={`image de ${list.nom} `} className={styles.itemImage} />

                <div className={styles.itemNom}>
                  <h2>{list.nom}</h2>
                  {/* <p>$1.8/kg</p> */}
                </div>
              </div>
              <button className={styles.addButton}>+</button>
            </div>
          )
        }

      </section>

      {/* Barre de recherche avec liste déroulante */}
      <form onSubmit={handleFormSubmit} method="POST" action="submit" className={styles.searchSection}>
        <input
          value={stateInput}
          onChange={handleChangeInput}
          type="text"
          className="w-full p-2 border rounded-md bg-gray-800 text-white placeholder-gray-400"
          placeholder="Search product"
        />
        {showDropdown && data && data.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg mt-1 text-white">
            {data.map((product: any, index: number) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-600"
                onClick={() => handleSelectItem(product)}
              >

                {/* {product.product_name || product.generic_name} */}

                <div>
                  <strong>{product.product_name || product.generic_name}</strong>
                  <span className="block text-xs text-gray-400">{product.brands}</span>
                </div>

              </li>
            ))}
          </ul>
        )}
      </form>

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
