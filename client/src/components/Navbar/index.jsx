import {Link} from "react-router-dom";
//import  styles  from "./styles.module.css";
import "./navbar.css";
import { Button } from '@chakra-ui/react'
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
  
const Navbar = () => {

  const {loggedIn, user}=useAuth();
  const {items}=useBasket()

  return (
    <nav id="nav">
      <div className="left"> 
          <div className="logo">
              <Link to="/">eCommerce</Link>
          </div>

          <ul className="menu">
              <li>
                  <Link to="/">Products</Link>
              </li>
          </ul>
        </div>

        <div className="right">
           {
            !loggedIn && <>
             <Link to="/signin">
              <Button colorScheme='green'>Login</Button>
            </Link>

            <Link to="/signup">
              <Button colorScheme='green'>Register</Button>
            </Link>
            </>
           }

           {
            loggedIn && (
            <>
            {
              items.length > 0 && (
                <Link to="/basket" >
                  <Button colorScheme="green" variant="outline">
                    Basket ({items.length })
                  </Button>
                </Link>
              )
            }

            {
              user?.role === "admin" && (
                <Link to="/admin">
                  <Button colorScheme="blue" variant="ghost"> Admin</Button>
                </Link>
              )
            }

             <Link to="/profile">
              <Button colorScheme='blue'>Profile</Button>
            </Link>
            </>
           )}
          </div>
    </nav>
  )
}

export default Navbar
