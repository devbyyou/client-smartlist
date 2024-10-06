"use client";
import  debounce  from 'lodash.debounce';
import styles from './styles/Home.module.css';
import imgRandom from './public/4129571.png'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faHome, faPersonFalling, faQrcode, faShop } from '@fortawesome/free-solid-svg-icons';
import { faPerson, } from '@fortawesome/free-solid-svg-icons/faPerson';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

import React, { ChangeEvent, FormEvent, MouseEvent, MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { searchApi } from './store/reducers/searchApi';
import { getProduits, postProduits } from './store/reducers/produits';
import { listDecourse, removeListDeCourse } from './store/reducers/listdecourse';
import { decodeToken, getUserDataFromLocalStorage } from './utils/user';
import { useRouter } from "next/navigation";
import { getCategorie } from './store/reducers/categorie';
import { getuser } from './store/reducers/user';

export default function Home() {
  const dispatch = useAppDispatch()
  const [produitId, setproduitId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stateCategorie, setCategorie] = useState<boolean>(false);
  const [stateInput, setStateInput] = useState('');
  const [user, setUser] = useState<any>(null); // État pour stocker les données utilisateur
  const data = useAppSelector((state) => state.searchApi.dataApi);
  const login = useAppSelector((state) => state.login);
  const listDecourseAPi = useAppSelector((state) => state.listDecourse.credentials);
  // const produits = useAppSelector((state) => state.produits.credentials.produits);
  const categorie = useAppSelector((state) => state.categorie.categorie);
  const listesCourses = useAppSelector((state) => state.user.credentials.listesCourses);
  const router = useRouter();

  // useEffect(() => {
  //   const userData = getUserDataFromLocalStorage();
  //   if (userData && userData.access_token) {
  //     const decoded = decodeToken(userData.access_token);// Décode le token pour récupérer les infos utilisateur
  //     setUser(decoded); // Stocker les informations de l'utilisateur dans l'état
  //     dispatch(listDecourse());
  //     dispatch(getProduits());
  //     dispatch(getCategorie());
  //     dispatch(getuser());
  //   } else {
  //     // Si aucun token n'est trouvé, redirige vers la page de login
  //     router.push('/login');
  //   }
  // }, [dispatch, router]);

  // useEffect(() => {
  //   if (stateInput) {
  //     dispatch(searchApi({ stateInput }));
  //   }
  // }, [stateInput, dispatch]);






  // Débounce la recherche pour éviter trop de requêtes
  const debouncedSearch = useMemo(
    () =>
      debounce((inputValue: string) => {
        dispatch(searchApi({ stateInput: inputValue }));
      }, 1000),
    [dispatch]
  );



  useEffect(() => {
    // Récupération des données utilisateur et initialisation
    const userData = getUserDataFromLocalStorage();
    if (userData && userData.access_token) {
      const decoded = decodeToken(userData.access_token);
      setUser(decoded);
      dispatch(listDecourse());
      dispatch(getProduits());
      dispatch(getCategorie());
      dispatch(getuser());
    } else {
      router.push('/login');
    }

    // Déclencher la recherche avec debounce
    if (stateInput) {
      debouncedSearch(stateInput);
    }

    // Nettoyage pour éviter que debounce en attente soit exécuté après le démontage du composant
    return () => {
      debouncedSearch.cancel();
    };
  }, [dispatch, router, stateInput, debouncedSearch]);







  const listesCourseSlice = listesCourses.flatMap(list => list.produits.map(produits => {
    return produits
  }))
  const categorieSlice = categorie.slice(0, 5)
  const produitSlice = listesCourseSlice.slice(0, 5)
  // Si l'utilisateur n'est pas encore chargé, affiche un message de chargement
  if (!user) {
    return <p>Chargement...</p>;
  }
  // Gérer la recherche de produits
  async function handleChangeInput(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setShowDropdown(true);
    // await dispatch(searchApi({ stateInput: inputValue }))
  }

  const handleSelectItem = (product: any) => {
    setStateInput(product.product_name); // Met à jour l'input avec le nom du produit sélectionné
    setproduitId(product._id || product.code || product.id); // Stocke l'ID ou le code-barres du produit
    setShowDropdown(false); // Masquer la liste déroulante après la sélection
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Trouver le produit exact basé sur l'ID ou le code-barres
    const selectedProduct = data.find((product) => {
      return product._id === produitId || product.code === produitId;
    });
    if (selectedProduct) {
      console.log("Produit trouvé :", selectedProduct);
      // Ajouter le produit dans la base de données ici
      await dispatch(postProduits({
        userId: user.sub, // must l'utilisateur est authentifié 
        produitId,
      }))
      await dispatch(listDecourse());
      setStateInput('')
    } else {
      console.log("Aucun produit trouvé pour :", stateInput);
    }
  };

  const handleClickItemCard = async (id: string, listDeCourseId: string): Promise<MouseEventHandler<HTMLDivElement> | Promise<void>> => {

    await dispatch(removeListDeCourse({
      id,
      listDeCourseId,
    }));
    await dispatch(listDecourse());

  }


  const handleClickedSeeAll = (event: MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault()
    setCategorie(!stateCategorie)

  }


  return (
    <div className={styles.homePage}>

      {/* Header avec retour en arrière */}
      <header className={styles.header}>
        <button onClick={() => router.back} className={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </header>
      {/* Liste de courses */}
      <section className={styles.shoppingList}>
        <h1 className={styles.title}>Liste de courses</h1>
        {listDecourseAPi.produits?.map((list, index) =>
          <div onClick={() => handleClickItemCard(list.id, list.listDeCourseId)} key={index} className={styles.itemCard}>
            <div className={styles.itemDetails}>
              {/* <img src="/images/mango.png" alt="Mango" className={styles.itemImage} /> */}

              <img src={list.image} alt={`image de ${list.nom}`} className={styles.itemImage} />

              <div className={styles.itemNom}>
                <h2>{list.nom}</h2>
                {/* <p>$1.8/kg</p> */}
              </div>
            </div>
            {/* <button className={styles.addButton}>+</button> */}
          </div>
        )}
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
        <h2>Récent </h2>
        <div className={styles.recentItems}>
          {produitSlice?.map((produit, index) => (
            < div key={index} className={styles.recentItem} >
              <img src={produit.image} alt={`Image de ${produit.nom} `} />
            </div>
          ))}
        </div>
      </section >
      {/* Section Suggestions */}
      < section className={styles.suggestionsSection} >
        <h2>Suggestions</h2>
        <div className={styles.suggestions}>
          {produitSlice?.map((produit, index) => (
            <button key={index} >{produit.nom}</button>
          ))}
        </div>
      </section >

      {/* Section Catégories */}
      < section className={styles.categoriesSection} >
        <h2>Categories
          <button onClick={handleClickedSeeAll} >{`${stateCategorie ? "Réduire" : "See All"}`}</button>
        </h2>
        <div className={styles.categoriesItem}>
          {
            stateCategorie ?
              categorie?.map((produit: { image: string | undefined; nom: any; }, index: React.Key | null | undefined) => (
                <div key={index} className={styles.categories}>
                  <img src={produit.image ? produit.image : imgRandom.src} alt={`Image de ${produit.nom}`} />
                </div>
              )) :
              categorieSlice?.map((produit, index) => (
                <div key={index} className={styles.categories}>
                  <img src={produit.image} alt={`Image de ${produit.nom}`} />
                </div>
              ))
          }


        </div>
      </section >

    </div >
  );
}
