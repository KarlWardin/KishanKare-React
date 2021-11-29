import "./login.css"
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const email = useRef();
    const password = useRef();

    const loginHandler = () => {
        const e = email.current.value;
        const p = password.current.value;
        if(e==="" || p===""){
            alert("please fill all the fields");
        }else{
            const logIn = async()=> {

            }
            logIn();
        }
    }

    return (
        <div className="loginContainer">
            <form className="loginWrapper" onSubmit={loginHandler}>
                <input type="email" placeholder="email" ref={email}></input>
                <input type="password" placeholder="password" ref={password}></input>
                <span type="submit" onClick={loginHandler}>Log In</span>
                <p>or</p>
                <Link to="/signup" >Create an account</Link>
            </form>
        </div>
    )
}
