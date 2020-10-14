import axios from 'axios'

// INITIAL LIBRARY STATE
initialPhotos = {}

// ACTION CONSTANTS
const GOT_PHOTOS = 'GOT_PHOTOS'

// ACTION CREATORS
export const gotPhotos = (photos) => ({
  type: GOT_PHOTOS,
  photos,
})

// THUNK CREATORS
export const getPhotos = (photos) => async (dispatch) => {
  try {
    // send photos to text recognition engine
    // receive array of books
    dispatch(gotPhotos(photos))
  } catch (err) {
    console.error(err)
  }
}

// LIBRARY REDUCER
const cameraReducer = (state = initialPhotos, action) => {
  switch (action.type) {
    case GOT_PHOTOS:
      return action.photos
    default:
      return state
  }
}

export default cameraReducer
