import React from 'react';
import AllItems from './AllITems';
import Modal from './modal';
import SingleItem from './SingleItem';


const Cart = (props) => {
    console.log('dFDF',props.showCart)
    if(props.showCart.status) {
        return (
            <Modal>
                {
                    props.showCart.stage == 0 ? 
                        <SingleItem 
                            cartItem={props.cartItem} 
                            updateCart={props.updateCart}
                        /> : 
                        <AllItems 
                            updateCart={props.updateCart}
                            cartItems={props.cartItems}
                            total={props.total}
                            changeCurrency={props.changeCurrency}
                            currency={props.currency}
                        />
                }
            </Modal>
        )
    }
    return null
}

export default Cart