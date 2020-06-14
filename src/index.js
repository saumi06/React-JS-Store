import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter as Router,Route} from 'react-router-dom';
import Router from './components/Router'
import './css/style.css';
// import PropTypes from 'prop-types';
// import App from './components/App';
// import StorePicker from './components/StorePicker';
// import NotFound from './components/NotFound';


const Root = () => {
        return (
        <Router>        
        </Router>
        )
}

render( <Root/>,document.querySelector('#main'));
