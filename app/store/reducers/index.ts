import listsReducer from './lists';
import produitsReducer from './produits';
import userReducer from './user';
import loginReducer from './login';
import registerReducer from './register';
import  searchApiReducer  from './searchApi';
import  listDecourseReducer  from './listdecourse';

const reducer = {
  lists: listsReducer,
  user: userReducer,
  produits: produitsReducer,
  login: loginReducer,
  register: registerReducer,
  searchApi: searchApiReducer,
  listDecourse: listDecourseReducer
};

export default reducer;
