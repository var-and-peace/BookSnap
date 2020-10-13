import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import libraryReducer from './reducers/libraryReducer'
import singleBookReducer from './reducers/singleBookReducer'
import cameraReducer from './reducers/cameraReducer'

const rootReducer = combineReducers({
    library: libraryReducer,
    selectedBook: singleBookReducer,
    photos: cameraReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store