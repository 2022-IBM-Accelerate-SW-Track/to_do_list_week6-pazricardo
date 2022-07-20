import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComp from "./component/navigation/NavbarComp";

import * as api from './services/api';

function App() {
    const [authenticated, setAuthenticated] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const authUser = async () => {
       setAuthenticated(await api.authenticate(username, password));
    }

    const createUser = async () => {
        await api.createUser(username, password);
    }

    return (
        <div className="App">
            {!authenticated ? (
                <div>
                    <label>Username: </label>
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <label>Password: </label>
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button onClick={createUser}>Create User</button>
                    <button onClick={authUser}>Login</button>
                </div>
            ) : (
                <div className="App">
                    <NavbarComp />
                </div>
            )}
        </div>
    );
}

export default App;
