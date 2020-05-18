import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import SearchForm from './SearchForm.js';
import PlayList from './PlayList.js';
import * as serviceWorker from './serviceWorker';

class Main extends React.Component{
    render(){
        return (
            <main>
                <SearchForm/>
                <PlayList/>
            </main>
        )
    }
}
class Root extends React.Component{
render(){
    return (<div>
        <Header/>
        <Main/>
        <Footer/>
    </div>
    )
}
}
ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
