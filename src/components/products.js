import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Cart from './cart';

const GET_PRODUCTS = gql`
    query GetProducts($currency: Currency ) {
      products {
        title,
        id,
        image_url,
        price(currency: $currency),
        product_options {
          title,
          prefix,
          suffix,
          options {
            id,
            value
          }
        }
      }
    }
`;




function Products() {
    let [allItems, setAll] = useState(null)
    let [cartItems, setItems] = useState([])
    let [showCart, setCart] = useState({
      status: false,
      stage: 0
    })
    let [cartItem, setItem] = useState(null)
    let [total, setTotal] = useState(null)
    let [name, setName] = useState('')
    let [currency, setCurrency] = useState("USD")
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
      variables: {currency:currency.replace(/['"]+/g, '')}
    });
    const updateCart = (item, action) => {
      if(action === 'reset') {
        setCart({
          status: false,
          stage: 0
        })
        setItem(null)
        return
      }
      if(action === 'add') {
        addToCart(item)
        return
      }
      if(action === 'incr') {
        incrementItem(item)
      }
      if(action === 'decr') {
        decrementItem(item)
      }
      if(action == 'rem') {
        removeItem(item)
      }
    }

    const incrementItem = (item) => {
      let hasItem = cartItems.findIndex((el)=> el.id === item.id)
      if(hasItem !== -1) {
        let newCart = [...cartItems]
        newCart[hasItem].amount++
        setItems(newCart)
      }
    }

    const removeItem = (item) => {
      let newCart
      newCart = cartItems.filter((el)=>el.id !== item.id)
      setItems(newCart)
    }

    const decrementItem = (item) => {
      let hasItem = cartItems.findIndex((el)=> el.id === item.id)
      let newCart
      if(hasItem !== -1) {
        if(cartItems[hasItem].amount === 1) {
          removeItem(item)
          return
        }
        newCart = [...cartItems]
        newCart[hasItem].amount--
        setItems(newCart)
      }
    }

    const addToCart = (item) => {
      let newCart = [...cartItems]
      newCart.push(item)
      setItems(newCart)

      setCart((prev)=>({
        ...prev,
        stage: 1
      }))
    }

    
    const addItem = (item) => {
      let hasItem = cartItems.findIndex((el)=> el.id === item.id)
      if(hasItem !== -1) {
        let newCart = [...cartItems]
        newCart[hasItem].amount++
        setItems(newCart)
        setCart({
          status: true,
          stage: 1
        })
        return
      }
      setCart({
        status: true,
        stage: 0
      })
      setItem(item)
      console.log(item)
    }

    const changeCurrency =(currency) =>{
      setCurrency(currency)
    }

    const handleChange = (e) => {
      let { value} = e.target
      setName(value)
    }

    useEffect(()=>{
      let sum = 0
      if(cartItems && cartItems.length) {
        for(let i=0; i<cartItems.length;i++) {
          sum += cartItems[i].amount * cartItems[i].price
        }
        // setCart(newCart)
      }
      setTotal(sum)

      
    },[cartItems,currency])

    useEffect(()=>{
      if(data && data.products) {
        setAll(data.products)
        let newCart = [...cartItems]
        if(cartItems && cartItems.length) {
          for(let i=0; i<cartItems.length;i++) {
            let index = data.products.findIndex((el)=>el.id === cartItems[i].id)
            newCart[i].price = data.products[index].price 
          }
          // setCart(newCart)
          setItems(newCart)
        }
      }
      
    },[data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
      
    return (
      <div className="products--wrap">
        <div  className="products">
          <Cart 
            updateCart  ={updateCart}
            showCart={showCart}
            cartItem={cartItem}
            cartItems={cartItems}
            total={total}
            changeCurrency={changeCurrency}
            currency={currency}
            name={name}
            handleChange={handleChange}
          />
          
          {
            allItems &&
            allItems.map(product => (
              <div key={product.title} className="products--item">
                <div>
                <img src={product.image_url} alt='product' />

                </div>
                <p>{product.title}</p>
                <p className="from">FROM:
                {currency} {product.price.toLocaleString() + '.00'}

                </p>
                
                <button className="product--button" onClick={()=>{addItem(product)}}>
                  Add to Cart
                </button>

              </div>
            
          ))
        }

      </div>
    </div>
    )
}

export default Products;
