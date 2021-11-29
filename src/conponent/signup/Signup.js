import "./signup.css"
import { Link } from "react-router-dom"
import { useRef } from "react"

export default function Signup() {
    const email = useRef();
    const password = useRef();
    const cnfpassword = useRef();

    const signupHandler = () => {
        const e = email.current.value;
        const p = password.current.value;
        const cp = cnfpassword.current.value;
        if(e==="" || p==="" || cp===""){
            alert("please fill all the fields");
        }else if(cp!==p){
            alert("passwords does'nt match");
        }else{
            const signUp = async()=> {

            }
            signUp();
        }
    }

    return (
        <div className="signupContainer">
            <form className="signupWrapper" onSubmit={signupHandler}>
                <input type="email" placeholder="email" ref={email}></input>
                <input type="password" placeholder="password" ref={password}></input>
                <input type="password" placeholder="confirm password" ref={cnfpassword}></input>
                <span type="submit" onClick={signupHandler}>Sign Up</span>
                <p>or</p>
                <Link to="/login">already have an account ? Log in</Link>
            </form>
        </div>
    )
}
