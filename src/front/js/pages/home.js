import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Form from "../component/form";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

  

    return (
        <div className="text-center mt-5">
            <Form /> 
        </div>
    );
};

