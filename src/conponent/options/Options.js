import "./options.css"
import { Link } from "react-router-dom";
import search_bg from "../../images/search_bg.png"
import contact_bg from "../../images/contact_bg.png"
import record_bg from "../../images/agriculture.png"

export default function Options() {

    return (
        <div className="optionsContainer">
            <Link title="find a new disease" className="card" to="/search" style={{ backgroundImage: `url(${search_bg})` }} >
                find a new disease
            </Link>

            <Link title="previous search results" className="card" to="/search" style={{ backgroundImage: `url(${record_bg})` }} >
                previous search results
            </Link>


            <a title="Contact us" className="card" href="mailto:sg2240@cse.jgec.ac.in" target={'_blank'} style={{ backgroundImage: `url(${contact_bg})` }} >
                Contact us
            </a>

        </div>
    )
}