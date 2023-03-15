//~ Import modules
import settingsReducer from './settings';
// import productReducer from './Product';
// import userReducer from './User';
// import apiProduct from '../api/product.js';
// import reviewsReducer from './Reviews';

const reducers = {
  settings: settingsReducer
  // product: productReducer,
  // user: userReducer,
  // apiProduct
};

//export all combined reducers to use in the store
export default reducers;