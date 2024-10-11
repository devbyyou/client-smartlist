"use client";
import debounce from 'lodash.debounce';
import styles from '../../styles/Home.module.css';
import imgRandom from '../../public/4129571.png'
import imgScroll from '../../public/9584634.png'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faHome, faPersonFalling, faQrcode, faShop } from '@fortawesome/free-solid-svg-icons';
import { faPerson, } from '@fortawesome/free-solid-svg-icons/faPerson';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

import React, { ChangeEvent, FormEvent, MouseEvent, MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchApi, searchByCategories } from '../../store/reducers/searchApi';
import { getProduits, postProduits, toggleCardClick } from '../../store/reducers/produits';
import { listDecourse, removeListDeCourse } from '../../store/reducers/listdecourse';
import { decodeToken, getUserDataFromLocalStorage } from '../../utils/user';
import { useRouter } from "next/navigation";
import { getCategorie } from '../../store/reducers/categorie';
import { getuser } from '../../store/reducers/user';
import Products from '../smartli/page';
import Loader from '../../components/Loader';
import cn from 'classnames';
import AuthenticatedLayout from '../../components/Layout/AuthenticatedLayout';

export default function pageHome() {
  const dispatch = useAppDispatch()
  const [produitId, setproduitId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showcatList, setShowcatList] = useState(false);
  const [stateCategorie, setCategorie] = useState<boolean>(false);
  const [stateInput, setStateInput] = useState('');
  const [imageCat, setImageCat] = useState('');
  const [user, setUser] = useState<any>(null);
  const [clickedIndex, setClickedIndex] = useState<any>();
  const [productName, setProductName] = useState<{
    image: string,
    nom: string
  }>({
    image: '',
    nom: ''
  });
  const data = useAppSelector((state) => state.searchApi.dataApi);
  const dataApiByCat = useAppSelector((state) => state.searchApi.dataApiByCat);
  const clickedCards = useAppSelector((state) => state.produits.clickedCards);
  const loading = useAppSelector((state) => state.searchApi.loading);
  const login = useAppSelector((state) => state.login);
  const listDecourseAPi = useAppSelector((state) => state.listDecourse.credentials);
  const produits = useAppSelector((state) => state.produits.credentials.produits);
  const categorie = useAppSelector((state) => state.categorie.categorie);
  const listesCourses = useAppSelector((state) => state.user.credentials.listesCourses);
  const router = useRouter();


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
      // router.push('/');
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
  if (!user) {
    return <p>Chargement...</p>;
  }
  async function handleChangeInput(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const inputValue = event.target.value;
    setStateInput(inputValue);
    setShowDropdown(true);
  }

  const handleSelectItem = (product: any) => {
    setStateInput(product.product_name);
    setproduitId(product._id || product.code || product.id);
    setShowDropdown(false);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedProduct = data.find((product) => {
      return product._id === produitId || product.code === produitId;
    });
    if (selectedProduct) {
      console.log("Produit trouvé :", selectedProduct);
      await dispatch(postProduits({
        userId: user.sub,
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

    setCategorie(!stateCategorie)
  }



  const handleShowProductCat = async (produit: { image: string; nom: string; id: string; }, index: any): Promise<MouseEventHandler<HTMLDivElement> | any> => {
    setProductName(produit)
    setClickedIndex(index)
    await dispatch(searchByCategories({
      categoryId: parseInt(produit.id, 10)
    }));
    setImageCat(produit.image);
    setShowcatList(true)
  }



  const handleItemCategorie = async (product: { product_name: string; image_url: string; _id: string; }, index: number) => {

    dispatch(toggleCardClick(product._id));

    const produitId = product._id
    const selectedProduct = dataApiByCat.find((product) => {
      return product._id === produitId;
    });
    if (selectedProduct) {
      console.log("Produit trouvé :", selectedProduct);
      await dispatch(postProduits({
        userId: user.sub,
        produitId,
      }))
      await dispatch(listDecourse());
    } else {
      console.log("Aucun produit trouvé pour :", stateInput);
    }

  }

  return (
    <AuthenticatedLayout>
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


        <main className={styles.mainHome}>
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
            <div className={styles.categoriesItemBox}>
              <div className={styles.categoriesItem}>
                {
                  stateCategorie ?
                    categorie?.map((produit: { image: string; nom: any; id: string; }, index: React.Key | null | undefined) => (

                      <div onClick={() => handleShowProductCat(produit, index)} key={index} className={cn(styles.categories, {
                        [styles.isClickedCardCat]: clickedIndex === index,
                      })}>
                        <img src={produit.image ? produit.image : imgRandom.src} alt={`Image de ${produit.nom}`} />
                      </div>

                    )) :
                    categorieSlice?.map((produit, index) => (
                      <div onClick={() => handleShowProductCat(produit, index)} key={index} className={cn(styles.categories, {
                        [styles.isClickedCardCat]: clickedIndex === index,
                      })}>
                        <img src={produit.image ? produit.image : imgRandom.src} alt={`Image de ${produit.nom}`} />
                      </div>
                    ))
                }


              </div>
            </div>
          </section >
          {/* Section CARD Catégories */}
          {loading ? (
            <Loader />
          ) : showcatList && (
            <div className={styles.container}>
              <div className={styles.itemTitleCategorie}>
                <div className={styles.itemLeftIcon}>
                  {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
                  <div className={`${styles.categories} ${styles.categoriesClicked}`}>
                    <img src={!imageCat ? imgRandom.src : imageCat} alt={`Image de `} />
                  </div>
                  <h2 className={styles.titleCategorie}>{productName.nom}</h2>
                </div>
                <div className={styles.itemTitleRightIcon}>
                  <Image width={30} height={10} src={imgScroll} alt={`Image de`} />
                </div>
              </div>
              {/* Div List Item Catégories */}
              <div className={styles.productList}>
                {
                  Array.isArray(dataApiByCat) ? (
                    dataApiByCat?.map((product, index) => (
                      <div onClick={() => handleItemCategorie(product, index)} key={index} className={cn(styles.productCard, {
                        [styles.isClicked]: clickedCards[product._id],
                      })}>
                        <div className={styles.imageContainer}>
                          <img
                            src={product.image_url ? product.image_url : imgRandom.src}
                            alt={`Image de ${product.product_name}`}
                            width={60}
                            height={60}
                            className={styles.productImage}
                          />
                        </div>
                        <div className={styles.productInfo}>
                          <h3 className={styles.productName}>{product.product_name}</h3>
                        </div>
                      </div>
                    ))
                  ) :
                    <Loader />
                }
              </div>
            </div>
          )}
        </main>
      </div >
    </AuthenticatedLayout>

  );
}
