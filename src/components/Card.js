const Card = (props) => {
   return (
       <div>
           <h3>{props.item.title}</h3>
           <p>{props.item.amount}</p>
           <p>{+props.item.amount * +props.item.price}</p>
           <button onClick={()=>{props.updateCart(props.item,'incr')}}>+</button>
           <button onClick={()=>{props.updateCart(props.item,'decr')}}>-</button>
       </div>
   ) 
}

export default Card