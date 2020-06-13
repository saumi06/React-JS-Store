import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import {Switch} from 'react-router-dom'
import './css/style.css';
import PropTypes from 'prop-types';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';


const Root = () => {
        return (
        <Router>
                <Switch>
                        <Route exact path="/" component={StorePicker} />
                        <Route path="/store/:storeId" component={App} />
                        <Route component={NotFound} />
               </Switch>
             
        </Router>
        )
}

render( <Root/>,document.querySelector('#main'));
