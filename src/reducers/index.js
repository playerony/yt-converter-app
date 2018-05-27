import { combineReducers } from 'redux'
import { videoDetails, videoUrls } from './youtube.reducer'

export default combineReducers({
  videoDetails,
  videoUrls
})