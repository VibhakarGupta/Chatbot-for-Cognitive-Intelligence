import React, { Component } from 'react';

import axios from 'axios/index';

import Message from './Message';

import './App.css';

import Bot from './bot.jpg';

class Chatbot extends Component {
    messagesEnd;

    constructor(props) {
        super(props);

       this._handleInputKeyPress = this._handleInputKeyPress.bind(this);

       this.hide = this.hide.bind(this);
       this.show = this.show.bind(this);

        this.state = {
            messages: [],
            showBot: true
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text:{
                    text: text
                }
            }
        };
        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text});

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    async df_event_query(event){

        const res = await axios.post('/api/df_event_query', {event});

        for (let msg of res.data.fulfillmentMessages) {
           let says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({messages: [...this.state.messages, says]});
        }

    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    }

    show(event){
        this.setState({showBot: true});
        event.preventDefault();
        event.stopPropagation();
    }

    hide(event){
        this.setState({showBot: false});
        event.preventDefault();
        event.stopPropagation();
    }


    renderMessages(stateMessages) {
        if(stateMessages){
            return stateMessages.map((message, i) => {
               return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if (e.key === 'Enter'){
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        if (this.state.showBot) {
            return (
                <div style={{
                    height: 500, width: 400, position: 'absolute', bottom: 0, right: 0,
                    border: '1px solid lightgrey'
                }}>
                    <nav className="light-blue darken-4">
                        <div className="nav-wrapper">
                            <img src={Bot} alt="" className="circle responsive-img"/> <a className="brand-logo">Dexter</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.hide}>Close</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div id="chatbot" style={{height: 388, width: '100%', overflow: 'auto'}}>
                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => {
                            this.messagesEnd = el;
                        }}
                             style={{float: 'left', clear: 'both'}}>
                        </div>
                    </div>
                    <div className="col s12">
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}}
                               placeholder="Type a message: " type="text" onKeyPress={this._handleInputKeyPress}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{
                    height: 40, width: 400, position: 'absolute', bottom: 0, right: 0,
                    border: '1px solid lightgrey'}}>
                    <nav className="light-blue darken-4">
                        <div className="nav-wrapper">
                            <img src={Bot} alt="" className="circle responsive-img"/> <a className="brand-logo">Dexter</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div ref={(el) => {
                        this.messagesEnd = el;
                    }}
                         style={{float: 'left', clear: 'both'}}>
                    </div>
                </div>
            )
        }
    }
}

export default Chatbot;
