//~ Import modules
import settingsReducer from './Settings';
import userReducer from './User';
import cartReducer from './Cart';


const reducers = {
  settings: settingsReducer,
  user: userReducer,
  cart: cartReducer

};

//export all combined reducers to use in the store
export default reducers;