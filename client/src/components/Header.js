import React from 'react';
import TATA from './chatbot/tata.png';
import './chatbot/App.css';

import { Link } from 'react-router-dom';
import Bot from "./chatbot/bot.jpg";

const Header = () => (
        <nav className="light-blue darken-4">
            <div className="nav-wrapper">
                <Link to={'/'} className="brand-logo"><img src={TATA} className="responsive-img" style={{height:50, width:300}}/></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/about'}>About us</Link></li>
                </ul>
            </div>
        </nav>
    )

export default Header;