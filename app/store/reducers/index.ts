import listsReducer from './lists';
import produitsReducer from './produits';
import userReducer from './user';
import loginReducer from './login';
import registerReducer from './register';
import  searchApiReducer  from './searchApi';

const reducer = {
  lists: listsReducer,
  user: userReducer,
  produits: produitsReducer,
  login: loginReducer,
  register: registerReducer,
  searchApi: searchApiReducer
};

export default reducer;
