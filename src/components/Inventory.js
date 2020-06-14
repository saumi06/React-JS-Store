import React from 'react';
import AddFoodForm from './AddFoodForm';

class Inventory extends React.Component{
    render(){
        return (
        <div className="inventory">Inventory!!
    
            <AddFoodForm addItem={this.props.addItem}/>
            <button onClick={this.props.loadSamples}>Load Sample Items</button>
            </div>
        )
    }
}
export default Inventory;