import listsReducer from './lists';
import produitsReducer from './produits';
import userReducer from './user';

const reducer = {
  lists: listsReducer,
  user: userReducer,
  produits: produitsReducer
};

export default reducer;
