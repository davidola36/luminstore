import React, {useEffect, useState} from 'react'
import Card from "./Card"
import { useQuery, gql } from '@apollo/client';


const GET_CURRENCIES = gql`
    query GetCurrencies {
        currency
    }
`;
const AllItems = (props) => {
    const { loading, error, data } = useQuery(GET_CURRENCIES);
    let [value,setValue] = useState(null)
    useEffect(()=>{
        if(data) setValue(data.currency[0])
    },[data])

    const handleChange = (e) => {
        let {name, value} = e.target
        setValue(value)
        props.changeCurrency(value)
    }
    return (
        <div className="cart">
            {
                data && data.currency &&
                <select value={props.currency} onChange={handleChange}>
                    {
                        data.currency.map((option)=>{
                            return (
                                <option value={option} key={option}>{option}</option>                                                
                            )
                        })
                    }
                </select>
            }
            <div className="cart-back" onClick={()=>{props.updateCart(null, 'reset')}}>
                go-back
            </div>
            <h1>
                this is the all items pahe
            </h1>
            {
                props.cartItems && props.cartItems.length &&
                props.cartItems.map(el=>{
                    return (
                        <Card item={el} key={el.id} updateCart={props.updateCart}/>
                    )
                })
            }
            <h4>{props.total}</h4>
        </div>
    )
}

export default AllItems