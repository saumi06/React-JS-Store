import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Item from './Item';
import sampleItems from '../sample-items';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
    state = {
        foods: {},
        order: {}

    };
    constructor() {
        super();
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }

    componentDidMount() {
        const { params } = this.props.match;
        //this runs before app is rendered
        this.ref = base.syncState(`${params.storeId}/foods`,
            {
                context: this,
                state: 'foods'
            });

        //check if there is any order in local storage
        const localStorageRef = localStorage.getItem(`order-${params.storeId}`);
        if (localStorageRef) {
            //update our App components order status
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.match.params.storeId}`,
            JSON.stringify(nextState.order));
    }

    addItem(food) {
        //update state
        const foods = { ...this.state.foods };
        //this takes a copy of food and puts it into foods
        //add in our food
        const timestamp = Date.now();
        foods[`food-${timestamp}`] = food;
        //this.state.foods.food1= food;
        //set state
        this.setState({ foods })
    }

    updateItem(key, updatedItem) {
        const foods = { ...this.state.foods };
        foods[key] = updatedItem;
        this.setState({ foods });

    }

    removeItem(key) {
        const foods = { ...this.state.foods };
        foods[key] = null;
        this.setState({ foods });
    }
    loadSamples() {
        this.setState({
            foods: sampleItems
        });
    }
    addToOrder(key) {
        //take copy of state
        const order = { ...this.state.order };
        //update or add no number of order 
        order[key] = order[key] + 1 || 1;
        //update state
        this.setState({ order });
    }
    removeFromOrder(key) {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({ order });
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Food Market" />
                    <ul className="list-of-items">
                        {
                            Object
                                .keys(this.state.foods)
                                .map(key => <Item key={key}
                                    index={key} details={this.state.foods[key]}
                                    addToOrder={this.addToOrder}
                                />)
                        }
                    </ul>

                </div>
                <Order
                    foods={this.state.foods}
                    order={this.state.order}
                    params={this.props.match.params}
                    removeFromOrder={this.removeFromOrder} />
                <Inventory addItem={this.addItem}
                    loadSamples={this.loadSamples}
                    foods={this.state.foods}
                    removeItem={this.removeItem}
                    updateItem={this.updateItem}
                    storeId={this.props.match.params.storeId}
                />
            </div>

        )
    }
}

App.propTypes = {
    params: PropTypes.object
}
export default App;