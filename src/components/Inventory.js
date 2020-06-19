import React from 'react';
import AddFoodForm from './AddFoodForm';
import PropTypes from 'prop-types';
import base, {firebaseApp} from '../base';
import firebase from 'firebase';


class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.authHandler({ user });
      }
    });

  }

  handleChange = (e, key) => {
    const item = this.props.foods[key];
    //take a copy of item and update
    const updateItem = {
      ...item,
      [e.target.name]: e.target.value
    };

    this.props.updateItem(key, updateItem);

  };
  
  authenticate = (provider) => {
    console.log("Trying to login with ",provider);
    
    if(provider==="google"){
      var authProvider = new firebase.auth.GoogleAuthProvider();
    } 
    else if(provider === "facebook"){
      authProvider = new firebase.auth.FacebookAuthProvider();
    }
    
    firebaseApp
    .auth()
    .signInWithPopup(authProvider)
    .then(this.authHandler);
  };

  logout = async () =>{
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authHandler = async authData =>{
    const store = await base.fetch(this.props.storeId, {
      context:this });
      console.log(store);
      if(!store.owner){
        await base.post(`${this.props.storeId}/owner`,{
          data: authData.user.uid
        });
      }
      this.setState({
        uid: authData.user.uid,
        owner:store.owner || authData.user.uid
      });
  };

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="google" onClick={() => this.authenticate('google')
        }>Log in with Google</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')
        }>Log in with Facebook</button>
      </nav>
    )
  };

  renderInventory = (key) => {

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
  };

  render() {
    const logout = <button onClick={    this.logout}>Log Out!</button>

    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    //
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of the store</p>
          {logout}
        </div>

      )
    }
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.foods).map(this.renderInventory)}
        <AddFoodForm addItem={this.props.addItem} />
        <button onClick={this.props.loadSamples}>
          Load Sample Items</button>
      </div>
    )
  }
  static propTypes = {
    updateItem: PropTypes.func.isRequired,
    foods: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  }
}

export default Inventory;