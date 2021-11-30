import "./homepage.css"
import Options from "../options/Options"
import Signup from "../signup/Signup"
import Login from "../login/Login"
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

export default function Homepage() {
    const user = useContext(AuthContext);

    return (
        <Router>
        <div className="homepageContainer">
            <div className="leftContainer">
               <img src="https://image.flaticon.com/icons/png/512/3063/3063653.png" alt=""></img>
            </div>
            <div className="rightContainer">
                <Switch>
                    <Route exact path="/">{user.user!==null ? <Options/> : <Signup/>}</Route>
                    <Route path="/login"><Login/></Route>
                    <Route path="/signup"><Signup/></Route>
                </Switch>
            </div>
        </div>
        </Router>
    )
}
