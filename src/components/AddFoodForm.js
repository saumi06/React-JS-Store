import React from 'react';
import PropTypes from 'prop-types';

class AddFoodForm extends React.Component{
    createItem(event){
        event.preventDefault();   
        console.log('gonna order some food');
        const food = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.addItem(food);
        this.foodForm.reset();
        console.log(food);
    }
    render(){
        return (
        <form ref = {(input) =>this.foodForm=input} className= "item-edit" onSubmit={(e)=>this.createItem(e)}>
            <input ref = {(input) => this.name = input} type="text" placeholder= "Food Name"/>
            <input ref = {(input) => this.price = input} type="text" placeholder= "Food Price"/>
            <select ref = {(input) => this.status = input}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold out!</option>
            </select>
            <textarea ref = {(input) => this.desc = input} placeholder= "Food Desc"/>
            <input ref = {(input) => this.image = input} type="text" placeholder= "Food Image"/>
            <button type="submit">+ Add Item</button>
        </form>
        )
    }
}
AddFoodForm.propTypes ={
    addItem: PropTypes.func.isRequired
}
export default AddFoodForm;