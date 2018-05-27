import {
  VIDEO_DETAILS_FAILURE,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_RESPONSE,
  
  VIDEO_DOWNLOAD_FAILURE,
  VIDEO_DOWNLOAD_REQUEST,
  VIDEO_DOWNLOAD_RESPONSE
} from '../constants/youtube.constants'

export function videoUrls(
  state = { 
    videoUrls: {}, 
    error: {},
    isFetching: false,
    isError: false
  }, 
  action
) {
  switch(action.type) {
    case VIDEO_DOWNLOAD_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false
      }

    case VIDEO_DOWNLOAD_RESPONSE:
      return {
        ...state,
        videoUrls: action.json,
        isFetching: false,
        isError: false
      }

    case VIDEO_DOWNLOAD_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        isError: true
      }

    default:
      return state
  }    
}

export function videoDetails(
  state = { 
      details: {}, 
      error: {},
      isFetching: false,
      isError: false
  }, 
  action
) {
  switch (action.type) {
    case VIDEO_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false
      }

    case VIDEO_DETAILS_RESPONSE:
      return {
        ...state,
        details: action.json,
        isFetching: false,
        isError: false
      }

    case VIDEO_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        isError: true,
        isFetching: false
      }

    default: return state
  }
}
