import React from 'react';
import AddFoodForm from './AddFoodForm';

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e, key) {
        const item = this.props.foods[key];
        //take a copy of item and update
        const updateItem = {
            ...item,
            [e.target.name]: e.target.value
        };

        this.props.updateItem(key, updateItem);

    }
    renderInventory(key) {

        const item = this.props.foods[key];

        return (
            <div className="item-edit" key={key}>
                <input type="text" name="name" value={item.name} placeholder="Food Name"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <input type="text" name="price" value={item.price} placeholder="Food Price" 
                onChange={(e) => this.handleChange(e, key)} />
                <select type="text" name="status" value={item.status} placeholder="Food Status" 
                onChange={(e) => this.handleChange(e, key)} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={item.desc} placeholder="Food Desc" 
                onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="image" value={item.image} placeholder="Food Image" 
                onChange={(e) => this.handleChange(e, key)} />
            <button onClick={() => this.props.removeItem(key)}>Remove Item</button>
            </div>
        )
    }
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.foods).map(this.renderInventory)}
                <AddFoodForm addItem={this.props.addItem} />
                <button onClick={this.props.loadSamples}>
                    Load Sample Items</button>
            </div>
        )
    }
}
export default Inventory;