import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context} from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	function handleLogout() {
		actions.logout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					
					{store.auth ?<button className="btn btn-primary" onClick={()=>handleLogout()}>Logout</button>:null}
					
				</div>
			</div>
		</nav>
	);
};
