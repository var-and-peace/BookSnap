import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import libraryReducer from './reducers/libraryReducer'
import singleBookReducer from './reducers/singleBookReducer'
import scanReducer from './reducers/scanReducer'
import searchReducer from './reducers/searchReducer'
import scanSelectReducer from './reducers/scanSelectReducer'

const rootReducer = combineReducers({
  library: libraryReducer,
  selectedBook: singleBookReducer,
  scanResults: scanReducer,
  searchResults: searchReducer,
  scanSelection: scanSelectReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
