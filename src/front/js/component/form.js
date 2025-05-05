import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; 

const Form = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    async function sendData(e) {
        e.preventDefault();
        setError("");

        const result = await actions.login(email, password);

        if (result.success) {
            alert("Successfully Logged in");
            navigate("/private");
        } else {
            setError(result.error || "Login failed");
        }
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control mx-auto w-100" 
                            id="exampleInputEmail1"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <div id="emailHelp" className="form-text text-center">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control mx-auto w-100" 
                            id="exampleInputPassword1"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <button type="button" className="btn btn-success ms-2" onClick={() => navigate("/signup")}>
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;



