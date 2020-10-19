import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import libraryReducer from './reducers/libraryReducer'
import singleBookReducer from './reducers/singleBookReducer'
import scanReducer from './reducers/scanReducer'

const rootReducer = combineReducers({
  library: libraryReducer,
  selectedBook: singleBookReducer,
  scanResults: scanReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
