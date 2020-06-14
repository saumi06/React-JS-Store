import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Item from './Item';
import sampleItems from '../sample-items';

class App extends React.Component{
    constructor(){
        super();
        this.addItem = this.addItem.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        
        this.state = {
            foods: {},
            order: {}

        };
    }
    addItem(food){
        //update state
        const foods = {...this.state.foods};
        //this takes a copy of food and puts it into foods
        //add in our food
        const timestamp = Date.now();
        foods[`food-${timestamp}`] = food;
        //this.state.foods.food1= food;
        //set state
        this.setState({foods})
    }
    loadSamples(){
        this.setState({
            foods:sampleItems
        });
    }
    render(){
        return ( 
            <div className= "catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Food Market"/>
                    <ul className="list-of-items">
                       {
                        Object
                            .keys(this.state.foods)
                            .map(key => <Item key={key} details={this.state.foods[key]}/>)
                       }
                    </ul>
        
                </div>
                <Order />
                <Inventory addItem={this.addItem} 
                loadSamples={this.loadSamples}/>
            </div>

        )
    }
}
export default App;