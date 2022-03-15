import "./navbar.css";
//import SearchIcon from '@material-ui/icons/Search';
import logo from "../../images/application_logo.png"
import { useContext ,useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext"

export default function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const [initialRender,SetInitialRender] = useState(true);

    useEffect(()=>{
        if(initialRender===true) { 
            SetInitialRender(false);
            return; //won't load for initial render
        }
        if(user!=null){
           window.open("/","_self")
        }
    },[user]);

    const logOutHandler = ()=> {
        if(window.confirm("are you sure to log out?")){
            dispatch({ type: "LOGIN_FAILURE", payload: "logged out" });    
        }
    }

    return (
        <div className="navContainer">
            <div className="leftNavContainer">
            <img src={logo} className="webLogo" alt="kisgancre-logo"></img>
            <span className="webName">KishanKare</span>
            </div>
            {/*<div className="searchbox" >
                <input className="searchInput"></input>
                <SearchIcon className="searchIcon" />
    </div> */}
            {user ? <button id="logOutBtn" onClick={logOutHandler}>Log Out</button> :<></>}
        </div>
    )
}
