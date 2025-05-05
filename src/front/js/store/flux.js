const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            auth: false, 
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
			logout: () => {
				localStorage.removeItem("token");
                        setStore({ auth: false });
                
            },

            login: async (email, password) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                };
            
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', requestOptions);
                    const data = await response.json();
            
                    if (response.status === 200 && data.access_token) {
                        localStorage.setItem("token", data.access_token);
                        setStore({ auth: true });
                        return { success: true }; 
                    } else {
                        localStorage.removeItem("token");
                        setStore({ auth: false });
                        return { error: data.msg || "Bad username or password" }; 
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    return { error: error.message };
                }
            },
            
			signup: async (email, password) => {
				const backendURL = process.env.BACKEND_URL;
				
			
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				};
			
				try {
					const response = await fetch(backendURL + "/api/signup", requestOptions);
					const data = await response.json();
			
					console.log("Response status:", response.status, "Response data:", data);
			
					if (response.status === 201 || response.status === 200) {
						return { success: true }; 
					} else {
						throw new Error(data.msg || "Error creating user");
					}
				} catch (error) {
					console.error("Error in signup:", error);
					return { error: error.message };
				}
			},
			
			


            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });

                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();

                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                setStore({ demo });
            },
            getProtectedView: async () => {
                const token = localStorage.getItem("token"); 
                if (!token) {
                    console.error("No token found");
                    return null;
                }
            
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    });
            
                    if (!resp.ok) {
                        console.error("Failed to fetch protected view");
                        return null;
                    }
            
                    const data = await resp.json();
                    console.log("Protected view data:", data);
            
                    setStore({ protectedInfo: data });
            
                    return data;
                } catch (error) {
                    console.error("Error fetching protected view", error);
                    return null;
                }
            }
            
        }
    };
};

export default getState;



