import "./options.css"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Link } from "react-router-dom";


export default function Options() {
    const user = useContext(AuthContext);
    
    return (
        <div className="optionsContainer">
            <div className="card profileCard" >profile</div>
            <div className="card recordCard" >records</div>
            <div className="card searchCard" >
                <Link to="/search" style={{ textDecoration: 'none',color:'white' }} >Search</Link>
            </div>
            <div className="card aboutCard" >about</div>
        </div>
    )
}
