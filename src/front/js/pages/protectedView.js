import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ProtectedView = () => {
    const { store, actions } = useContext(Context);
    const [welcomeMsg, setWelcomeMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProtectedData = async () => {
            
            if (!store.auth) {
                navigate("/");
                return;
            }

            const data = await actions.getProtectedView();
            if (data) {
                setWelcomeMsg(`Bienvenido/a, ${data.logged_in_as}`);
            } else {
                
                actions.logout();
                navigate("/login");
            }
        };

        loadProtectedData();
    }, [store.auth]);

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <div className="container text-center mt-5">
            {store.auth ? (
                <>
                    <h1>{welcomeMsg || "Cargando..."}</h1>
                    <button className="btn btn-danger mt-3" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <p>No autorizado. Redirigiendo...</p>
            )}
        </div>
    );
};

export default ProtectedView;
