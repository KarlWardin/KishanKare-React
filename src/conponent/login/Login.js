import "./login.css"
import { useRef } from "react";

export default function Login() {

    const email = useRef();
    const password = useRef();

    const loginHandler=()=>{
        console.log(email.current.value);
        console.log(password.current.value);
    }

    return (
        <div className="loginContainer">
            <form className="loginWrapper" onSubmit={loginHandler}>
               <input type="email" placeholder="email" ref={email}></input>
               <input type="password" placeholder="password" ref={password}></input>
               <span type="submit">Log In</span>
               <p>or</p>
               <span style={{"textDecoration":"underline"}}>Create an account</span>
            </form>
        </div>
    )
}
