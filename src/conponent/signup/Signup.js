import "./signup.css"

export default function Signup() {
 
    const signupHandler=()=>{

    }

    return (
        <div className="signupContainer">
            <form className="signupWrapper" onSubmit={signupHandler}>
               <input type="email" placeholder="email"></input>
               <input type="password" placeholder="password"></input>
               <input type="password" placeholder="re-enter password"></input>
               <span type="submit">Sign Up</span>
               <p>or</p>
               <span style={{"textDecoration":"underline"}}>already have an account ? Log in</span>
            </form>
        </div>
    )
}
