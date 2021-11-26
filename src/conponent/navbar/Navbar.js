import "./navbar.css";
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
    return (
        <div className="navContainer">
            <img src="https://image.flaticon.com/icons/png/128/4284/4284772.png" className="webLogo" alt="logo"></img>
            <span className="webName">KishanKare</span>
            <div className="searchbox" >
                <input className="searchInput"></input>
                <SearchIcon className="searchIcon"/>
            </div>
        </div>
    )
}
