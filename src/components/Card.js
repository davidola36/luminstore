const Card = (props) => {
   return (
       <div className="card">
           <div className="card--remove" onClick={()=>{props.updateCart(props.item,'rem')}}>x</div>
           <div className="card--left">
                <h5>{props.item.title}</h5>
                <p><span>Made For</span> {props.name}</p>
                <p>One time purchase of Two Month supply.</p>
                <div className="card--counter__cont">
                    <div className="card--counter">
                        <span onClick={()=>{props.updateCart(props.item,'incr')}}>+</span>
                        <p>{props.item.amount}</p>
                        <span onClick={()=>{props.updateCart(props.item,'decr')}}>-</span>
                    </div>
                    <h6>
                       {props.currency} {(props.item.price * props.item.amount).toLocaleString() + '.00'}
                    </h6>
                </div>
            </div>
            <div className="card--right">
                <img src={props.item.image_url} alt="product"/>
            </div>
       </div>
   ) 
}

export default Card