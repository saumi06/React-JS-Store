import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDJZmyEBNHag0qU-BPw2V8PTN902hLNmIM",
    authDomain: "food-store-sjn.firebaseapp.com",
    databaseURL: "https://food-store-sjn.firebaseio.com",
    projectId: "food-store-sjn"
});

const base = Rebase.createClass(firebaseApp.database());
export default base;