import React, { useState, useEffect } from 'react';

const SingleItem = (props) => {
    const [value,setValue] = useState({value: ''})
    const [item, setItem] = useState({
        price: '',
        name: '',
        image_url: '',
        amount: 1,
        options: {},
        id: ''
    })
    let options = props.cartItem.product_options
    let cartItem = props.cartItem

    const handleChange = (e,i) => {
        let val = e.target
        const { name, value } = e.target;
        console.log(name, value, i)
        let newOption = {}
        newOption[name] = options[i].options[value]
        setItem((prevState)=>({
            ...prevState,
            options: {...prevState.options, ...newOption}
        }))
        setValue(value)
    };

    useEffect(()=>{
        let newOptions = convertArrayToObject(options, 'title')
        setItem((prevState)=>({
            ...prevState,
            price: cartItem.price,
            image_url: cartItem.image_url,
            title: cartItem.title,
            options: newOptions,
            id: cartItem.id
        }))
        console.log(item.options)
    },[])


    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item.options[0],
          };
        }, initialValue);
      }
    
    const getOptions = () => {
        return (
            <div>
                {
                    Object.entries(item.options).length !== 0 &&
                    options.map((el,index)=>{
                        return (
                            <div key={el.title}>
                                <label className="primary" >{el.title}</label>
                                {/* {item.options[el.title].value} */}
                                <select className="primary u-margin-bottom-small" name={el.title} value={value.value} onChange={(e)=>{handleChange(e,index)}}>
                                    {
                                        el.options.map((option,i)=>{
                                            return (
                                                <option value={i} key={i}>{option.value}</option>                                                
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        )

                    })
                }
            </div>
        )
    }
    
    return (
        <div className="cart">
            <div className="cart-back" onClick={()=>{props.updateCart(null, 'reset')}}>
                go-back
            </div>
            {/* {props.cartItem.title} */}
            <img src={props.cartItem.image_url} alt="product" />
            <h3>First we personalize</h3>
            <p>Products that you receive may vary according to your age bracket & skin type to optimize results.</p>
            <h5>Personalization Details</h5>
            {
                props.cartItem.product_options.length ? getOptions() : null
            }

            <div>
                <button onClick={()=>{props.updateCart(item, 'add')}} className="cart--button">
                        ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default SingleItem