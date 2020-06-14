import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Item from './Item';
import sampleItems from '../sample-items';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();
        this.addItem = this.addItem.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        this.state = {
            foods: {},
            order: {}

        };
    }

    componentDidMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/foods`,
            {
                context: this,
                state: 'foods'
            });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
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
                <Order foods={this.state.foods} order={this.state.order} />
                <Inventory addItem={this.addItem}
                    loadSamples={this.loadSamples} />
            </div>

        )
    }
}
export default App;