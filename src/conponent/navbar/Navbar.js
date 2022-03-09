import "./navbar.css";
import SearchIcon from '@material-ui/icons/Search';
//import { Link } from "react-router-dom";

export default function Navbar() {


    const handleFilePick = (event) => {
        const { target } = event;
        const { files } = target;

        if (files && files[0]) {
            console.log(files[0]);
           // var reader = new FileReader();

           // reader.onloadstart = () => this.setState({ loading: true });

           // reader.onload = event => {
                //this.setState({
                //    data: event.target.result,
                //    loading: false
               // });
          //  };

           // reader.readAsDataURL(files[0]);
        }
    }

    return (
        <div className="navContainer">
            <img src="https://image.flaticon.com/icons/png/128/4284/4284772.png" className="webLogo" alt="logo"></img>
            <span className="webName">KishanKare</span>
            <div className="searchbox" >
                <input className="searchInput"></input>
                <SearchIcon className="searchIcon" />
            </div>
            <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleFilePick}
            />
        </div>
    )
}
