import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const createAccount = async () => {
        try{
            if(password !== confirmPassword){
                setError("password and confirm password does not match");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(),email,password);
            navigate('/articles');

        }catch(e) {
            setError(e.message);
        }

    }
    return (
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input placeholder="Enter email address" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder="Your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <input type="password" placeholder="Renter  password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        <button onClick={createAccount}>Log In</button>
        <Link to="/login">Already have an account ? Login here</Link>
        </>
        
    );

}
export default CreateAccountPage;