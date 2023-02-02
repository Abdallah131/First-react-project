import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
    return(
    <div className="home">
        <main>
            <h1>Quizzical</h1>
            <p>Quiz of 5 General Knowledge questions that varies from easy to hard</p>
            <Link to="Main"><button>Start</button></Link>
        </main>
    </div>
    )
}
