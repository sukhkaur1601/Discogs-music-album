import React from 'react';
import './Header.css';
class Header extends React.Component{
    render(){
        return (
            <div id="header">
                <img src="logo.png" alt="Music logo" ></img>
                <p><span>Rythmic
                </span><br/>Where words leave off, Music begins...</p>
            </div>
        )
    }
}
export default Header;