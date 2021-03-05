import React, {useEffect, useState} from 'react'
import Card from "./Card"
import { useQuery, gql } from '@apollo/client';


const GET_CURRENCIES = gql`
    query GetCurrencies {
        currency
    }
`;
const AllItems = (props) => {
    const {  data } = useQuery(GET_CURRENCIES);
    let [value,setValue] = useState(null)
    useEffect(()=>{
        if(data) setValue(data.currency[0])
    },[data])

    const handleChange = (e) => {
        let { value} = e.target
        setValue(value)
        props.changeCurrency(value)
    }
    return (
        <div className="cart">
            <div className="cart--back" onClick={()=>{props.updateCart(null, 'reset')}}>
                &#62;
            </div>
            <h5 className="cart--heading2">
                Your cart
            </h5>
            <div style={{paddingLeft:'20px'}}>
                {
                    data && data.currency &&
                    <select value={props.currency} onChange={handleChange} className="cart--currency">
                        {
                            data.currency.map((option)=>{
                                return (
                                    <option value={option} key={option}>{option}</option>                                                
                                )
                            })
                        }
                    </select>
                }
            </div>
            <div className="cart--body">
                {
                    props.cartItems && props.cartItems.length &&
                    props.cartItems.map(el=>{
                        return (
                            <Card item={el} key={el.id} updateCart={props.updateCart} name={props.name} currency={props.currency}/>
                        )
                    })
                }
            </div>
            <div className="cart--footer cart--footer__alt">
                <div className="u-space-between u-margin-bottom-medium"  style={{paddingTop:'20px'}}>
                    <p>
                        Subtotal
                    </p>
                <h4>{props.currency} {props.total}</h4>

                </div>
                <div>
                    <button className="cart--button" onClick={()=>alert('Looks like youre ready to checkout')}   >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllItems