import React from "react";
import styles from './Card.module.css'
import rating from '../image/rating.png'
import Favorites from "./Favorites";
import { favorites } from "../actions/actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Card({img, fullName, price,component,id}){
   const navegation = useNavigate()
    const dispatch = useDispatch() 
    const sampleLocation = useLocation();
    var array = []
    console.log("card",sampleLocation.pathname)
    const quitar =  (e) =>{
        e.preventDefault()
        const {value} = e.target
        console.log(sampleLocation.pathname.includes("/favorites"))
        if (sampleLocation.pathname.includes("/favorites")) {      
            if(localStorage.getItem('favoritos') != null){
                array = JSON.parse(localStorage.getItem('favoritos'))
            }
            const filterA = array.filter(item=>{ 
                if (item.id != value) {
                    return item
                }
            })
            localStorage.setItem('favoritos', JSON.stringify(filterA));
            dispatch(favorites( JSON.parse(localStorage.getItem('favoritos'))))
        }
        if (sampleLocation.pathname.includes("/shoppingCar")) {      
            if(localStorage.getItem('carrito') != null){
                array = JSON.parse(localStorage.getItem('carrito'))
            }
            const filterA = array.filter(item=>{ 
                if (item.id != value) {
                    return item
                }
            })
            localStorage.setItem('carrito', JSON.stringify(filterA));
            dispatch(favorites( JSON.parse(localStorage.getItem('carrito'))))
        }
        
    }
    const comprar = ()=>{

    }
    return(
        <div className={styles.container}>
            <img className={styles.img}src= {img} alt='img'></img>  
            <h2 className={styles.h2}>{fullName}</h2>
            <p className={styles.price}>${price}</p>
            <img className={styles.rating} src={rating} alt='rating'/> 
            {
                component === "favorites"?<button value={id} onClick={(e)=>comprar(e)}>Comprar</button>:null
            } 
            {
                component === "favorites" || component === "carrito"?<button value={id} onClick={(e)=>quitar(e)}>Quitar</button>:null
            }
                                  
        </div>
    );
}