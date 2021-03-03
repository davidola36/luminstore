import Logo from '../assets/images/lumin.png'
import Cart from '../assets/images/cart.png'


const Header = () => {
    return (
        <header className="header">
            <div className="header--cont">
                <div className="header--logo">
                    <img src={Logo} alt="logo"/>
                </div>

                <div className="header--links">
                    <p>
                        Shop
                    </p>
                    <p>
                        help
                    </p>
                    <p>
                        Blog
                    </p>
                </div>
            </div>

            <div className="header--cont">
                <p className="header--link">
                    Account
                </p>
                    <img src={Cart} alt="cart" className="header--cart"/>
                <div className="header--dropdown">
                    EN 
                </div>
            </div>
        </header>
    )
}

export default Header