import "./login.css"
import { useRef,useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Login() {

    const { isFetching, dispatch } = useContext(AuthContext);
    const email = useRef();
    const password = useRef();

    const logIn = async (email,password)=> {
        dispatch({ type: "LOGIN_START" });
        try{
            const res = await signInWithEmailAndPassword(auth, email, password);
            const currentUser = { "uid":res.user.uid, "email":email };
            //console.log(currentUser);
            dispatch({ type: "LOGIN_SUCCESS", payload: currentUser });
        }catch(err){
            //console.log(err);
            alert(err.message);
            dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
      }

    const loginHandler = () => {
        const e = email.current.value;
        const p = password.current.value;
        if (e === "" || p === "") {
            alert("please fill all the fields");
        } else {
            logIn(e,p);
        }
    }

    return (
        <div className="loginContainer">
            <form className="loginWrapper" onSubmit={loginHandler}>
                <input type="email" placeholder="email" ref={email}></input>
                <input type="password" placeholder="password" ref={password}></input>
                {isFetching ? 
                    <CircularProgress style={{marginTop:"20px"}}/> :
                       <span type="submit" onClick={loginHandler}>Log In</span>}
                <p>or</p>
                <Link to="/signup" >Create an account</Link>
            </form>
        </div>
    )
}
