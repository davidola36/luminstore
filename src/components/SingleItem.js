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
    
    const submitItem = (e) => {
        e.preventDefault()
        props.updateCart(item, 'add')
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
        <form className="cart" onSubmit={submitItem}>
            <div className="cart--back" onClick={()=>{props.updateCart(null, 'reset')}}>
                &#62;
            </div>
            {/* {props.cartItem.title} */}
            <div className="cart--img">
                <img src={props.cartItem.image_url} alt="product" />
            </div>
            <div className="cart--body">
                <h3 className="cart--heading">First we personalize</h3>
                <p className="cart--text">Products that you receive may vary according to your age bracket & skin type to optimize results.</p>
                <h5 className="cart--sub">Personalization Details</h5>
                <input type="text" 
                    className="cart--input u-margin-bottom-small" 
                    onChange={props.handleChange} 
                    value={props.name}
                    required
                />
                {
                    props.cartItem.product_options.length ? getOptions() : null
                }
            </div>
            <div className="cart--footer">
                <button  className="cart--button">
                        ADD TO CART
                </button>
            </div>
        </form>
    )
}

export default SingleItem