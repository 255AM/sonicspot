import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
//THis will be temporary navigation
export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/select">Game Select</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/game">Game</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/game">placeholder</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">placeholder</Link>
            </li>
        </ul>
    )
}