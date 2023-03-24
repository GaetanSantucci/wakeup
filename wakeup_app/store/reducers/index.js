//~ Import modules
import settingsReducer from './Settings';
// import productReducer from './Product';
import userReducer from './User';
// import apiProduct from '../api/product.js';
// import reviewsReducer from './Reviews';

const reducers = {
  settings: settingsReducer,
  user: userReducer
  // product: productReducer,
  // apiProduct
};

//export all combined reducers to use in the store
export default reducers;