import "./signup.css"
import { Link } from "react-router-dom"
import { useRef,useContext } from "react"
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const email = useRef();
    const password = useRef();
    const cnfpassword = useRef();

    //isFetching is for progressBar
    const { isFetching, dispatch } = useContext(AuthContext);

    const signUp = async (email, password) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = { "uid":res.user.uid, "email":email };
            console.log(currentUser);
            dispatch({ type: "LOGIN_SUCCESS", payload: currentUser });
        } catch (err) {
            alert(err.message);
            console.log(err);
            dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
    }

    const signupHandler = () => {
        const e = email.current.value;
        const p = password.current.value;
        const cp = cnfpassword.current.value;
        if (e === "" || p === "" || cp === "") {
            alert("please fill all the fields");
        } else if (cp !== p) {
            alert("passwords does'nt match");
        } else {
            signUp(e, p);
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
