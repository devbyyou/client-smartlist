import categorieReducer from './categorie';
import produitsReducer from './produits';
import userReducer from './user';
import loginReducer from './login';
import registerReducer from './register';
import  searchApiReducer  from './searchApi';
import  listDecourseReducer  from './listdecourse';

const reducer = {
  categorie: categorieReducer,
  user: userReducer,
  produits: produitsReducer,
  login: loginReducer,
  register: registerReducer,
  searchApi: searchApiReducer,
  listDecourse: listDecourseReducer
};

export default reducer;
