import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function sendData(e) {
        e.preventDefault();
        setError("");

        const result = await actions.signup(email, password);

        if (result.error) {
            setError(result.error);
        } else {
            alert("Usuario succesfully created"); 
            navigate("/"); 
        }
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4" style={{ width: "50%" }}> 
                <h2 className="text-center">Signup</h2>
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control mx-auto" 
                            style={{ width: "100%" }} 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control mx-auto" 
                            style={{ width: "100%" }} 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    
                    <div className="d-flex justify-content-end gap-2">
                        <button type="submit" className="btn btn-primary btn-sm">Register</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate("/")}>Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

