import "./navbar.css";
import SearchIcon from '@material-ui/icons/Search';
import logo from "../../images/application_logo.png"
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"

export default function Navbar() {
    const { user, dispatch } = useContext(AuthContext);

    const logOutHandler = ()=> {
        dispatch({ type: "LOGIN_FAILURE", payload: "logged out" });    }

    return (
        <div className="navContainer">
            <img src={logo} className="webLogo" alt="kisgancre-logo"></img>
            <span className="webName">KishanKare</span>
            <div className="searchbox" >
                <input className="searchInput"></input>
                <SearchIcon className="searchIcon" />
            </div>
            {user ? <button onClick={logOutHandler}>Log Out</button> :<></>}
        </div>
    )
}
