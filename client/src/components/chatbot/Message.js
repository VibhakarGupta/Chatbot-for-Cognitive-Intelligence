import React from 'react';

import './App.css'

import Bot from './bot.jpg';
import User from './user.jpg';

const Message = (props) => (
    <div className="col s12 m8 offset-m2 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
            <div className="row valign-wrapper">
                {props.speaks ==='bot' &&
                <div className="col s2">
                    <a> <img  id="name" src={Bot} alt="" className="circle responsive-img"/></a>
                </div>
                }
                <div className="col s10">
                    <span className="black-text">
                        {props.text}
                    </span>
                </div>
                {props.speaks ==='me' &&
                <div className="col s2">
                    <a> <img  id="name" src={User} alt="" className="circle responsive-img"/></a>
                </div>
                }
            </div>
        </div>
    </div>
);

export default Message;
