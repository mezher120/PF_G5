import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts, getCategories, filterByBestFor, filterByCategories, filterByColor} from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination"
import styles from './Shop.module.css';

const Shop = () => {
  const products = useSelector(state => state.shoes)
  const bestFor = useSelector(state => state.categories)
  const categories = useSelector(state => state.auxShoes)
  const dispatch = useDispatch()

  // const [filterSelected, setFilterSelected] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage]= useState(15) //eslint-disable-line
  const indexOfLastShoe = currentPage * shoesPerPage; 
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes = products.slice(indexOfFirstShoe, indexOfLastShoe);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const firstCharUpperBestFor = (str) => {
    const arr = str.split("-");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    console.log(str2)
    return str2;
  }
  


    var joint = []
     categories.map(e=> joint.push(e.masterName))
     joint= [... new Set(joint)]
     
    


    // const categories = state.auxShoes;
  
  
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
   
  }, [])

  const filterHandler = (e) => {
    const { value } = e.target
    if( value.length>15){dispatch(filterByCategories(value))}
    else{dispatch(filterByBestFor(value))}
  }
    
   
  
  /* const filterBestForHandler = (e) => {
    const { value } = e.target
    dispatch(filterByBestFor(value))
  } */


  const filterColorHandler = (e) => {
    const { value } = e.target
    dispatch(filterByColor(value))
  }

  return (
    <div className={styles.container}>
      <div className={styles.flyer}>
        <h1 className={styles.titulo}>Shop</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.filtersContainer}>
          <div className={styles.filters}>
            <div className={styles.divFiltersTitle}>
              <h1 className={styles.filtersTitle}>Filter By:</h1>
            </div>
            <h2 className={styles.filtersSubtitle}>Best For</h2>
            <div className={styles.bestForContainer}>
              {bestFor.map(e => (
                <div key={e.id} className={styles.radio}>
                    <input className={styles.input} type="radio" id={e.id} name="radio" value={e.name} onChange={filterHandler} />
                    <label className={styles.radioLabel} htmlFor={e.id}>{firstCharUpperBestFor(e.name)}</label>
                </div>
              ))}
          <h2 className={styles.filtersSubtitle}>Categories</h2>          
            </div>
            <div className={styles.bestForContainer}>
              {joint.map((e) => (
                <div key={e} className={styles.radio}>
                    <input className={styles.input} type="radio" id={e} name="radio" value={e} onChange={filterHandler } />
                    {<label className={styles.radioLabel} htmlFor={e}>{e}</label>}
                </div>
              ))}
                             
            </div>

          </div>
        </div>
        <div className = {styles.cards}>
          {currentShoes?.map(product => (
              <Link to={'details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
                <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover}/>
              </Link>
          ))}
        </div>
      </div>
      <div>
        <Pagination key= {1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Shop