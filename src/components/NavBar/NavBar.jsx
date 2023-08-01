import CartWidget from "../CartWidget/CartWidget"
import './NavBar.css'
import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
    const imgTienda = "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/mfg/nvidia-og-image-1200x630.jpg";
    return (
        <header>
            <Link to={"/"}>
                <img className="imgTienda" src={imgTienda} alt="" />
            </Link>

            <nav>
                <ul>
                    <li>
                        <NavLink to={"/categoria/2"}> Placas </NavLink>
                    </li>

                    <li>
                        <NavLink to={"/categoria/3"}> Fuentes </NavLink>
                    </li>
                </ul>
            </nav>

            <CartWidget />

        </header>
    )
}

export default NavBar