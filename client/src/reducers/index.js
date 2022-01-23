import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
// установить мидлвэр для браузера
// npm i redux-devtools-extension
// установить redux и react-redux
// т.к. redux синхронная, нужно установить redux-thunk для выполнения АСИНХРОННОГО кода
// npm i redux react-redux redux-thunk


const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
