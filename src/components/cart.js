import React, {useEffect} from 'react';
import AllItems from './AllITems';
import Modal from './modal';
import SingleItem from './SingleItem';


const Cart = (props) => {
    useEffect(()=>{
        let body = document.getElementsByTagName('body')
        if(props.showCart.status) {
            body[0].classList.add('modal-open')
            // console.log()
        }else {
            body[0].classList.remove('modal-open')
        }
    },[props.showCart.status])
    if(props.showCart.status) {
        return (
            <Modal>
                {
                    props.showCart.stage == 0 ? 
                        <SingleItem 
                            cartItem={props.cartItem} 
                            updateCart={props.updateCart}
                            name={props.name}
                            handleChange={props.handleChange}
                        /> : 
                        <AllItems 
                            updateCart={props.updateCart}
                            cartItems={props.cartItems}
                            total={props.total}
                            changeCurrency={props.changeCurrency}
                            currency={props.currency}
                            name={props.name}
                        />
                }
            </Modal>
        )
    }
    return null
}

export default Cart