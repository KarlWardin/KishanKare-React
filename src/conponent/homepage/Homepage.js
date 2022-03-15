import "./homepage.css"
import Options from "../options/Options"
import Signup from "../signup/Signup"
import Login from "../login/Login"
import Search from "../search/Search"
import side_pic from "../../images/agriculture.png"
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

export default function Homepage() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
        <Switch>
        <Route path="/search">{user!==null ? <Search/> : <Signup/>}</Route>
        <div className="homepageContainer">
            <div className="leftContainer">
               <img id="side_pic" src={side_pic} alt="side-agriculture"></img>
            </div>
            <div className="rightContainer">
                
                    <Route exact path="/">{user!==null ? <Options/> : <Signup/>}</Route>
                    <Route path="/login">{user===null?<Login/>:<></>}</Route>
                    <Route path="/signup">{user===null?<Signup/>:<></>}</Route>
            
            </div>
        </div>
        </Switch>
        </Router>
    )
}
