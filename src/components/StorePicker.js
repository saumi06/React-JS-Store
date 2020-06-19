import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component{
   
    goToStore(event){
        //grab text from box
        event.preventDefault();
        console.log('you changed the url');
        console.log(this.storeInput.value);
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);
        //transition from / to .store/storeid
        this.props.history.push(`/store/${storeId}`);

    }
    
    render() {
        return (
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                {/*Hello */}
                <h2>Please Enter A Store</h2>
                <input 
                type="text" 
                required 
                placeholder="Store Name"
                defaultValue={getFunName()} 
                ref={(input) => {this.storeInput = input}}/>
                <button type="submit">Visit Store -&gt;</button>
            </form>

        )
    }
}

StorePicker.contextTypes = {
    router: PropTypes.object.isRequired,
    
}
export default StorePicker;
