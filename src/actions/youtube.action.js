import {
  VIDEO_DOWNLOAD_FAILURE,
  VIDEO_DOWNLOAD_REQUEST,
  VIDEO_DOWNLOAD_RESET,
  VIDEO_DOWNLOAD_RESPONSE,

  VIDEO_DETAILS_FAILURE,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_RESPONSE
} from '../constants/youtube.constants'
import * as YouTubeService from '../services/youtube.service'

function requestVideoDownloadUrls(videoUrl) {
  return {
    type: VIDEO_DOWNLOAD_REQUEST,
    videoUrl
  }
}

function requestVideoDetails(videoUrl) {
  return {
    type: VIDEO_DETAILS_REQUEST,
    videoUrl
  }
}


function responseVideoDownloadUrls(json) {
  return {
    type: VIDEO_DOWNLOAD_RESPONSE,
    json
  }
}

function responseVideoDetails(json) {
  return {
    type: VIDEO_DETAILS_RESPONSE,
    json
  }
}

function failureVideoDownloadUrls(error) {
  return {
    type: VIDEO_DOWNLOAD_FAILURE,
    error
  }
}

function failureVideoDetails(error) {
  return {
    type: VIDEO_DETAILS_FAILURE,
    error
  }
}

export function resetVideoDownloadUrls() {
  return {
    type: VIDEO_DOWNLOAD_RESET
  }
}

function isErrorResponse(json) {
  return (json.length === 0 || json[0].status === 'fail') ? true : false;
}

export function fetchVideoDownloadUrls(videoUrl) {
  return dispatch => {
    dispatch(requestVideoDownloadUrls(videoUrl))
    YouTubeService.fetchVideoDownloadUrls(videoUrl)
      .then(
        json => {
          if(!isErrorResponse(json))
            dispatch(responseVideoDownloadUrls(json))
          else
            dispatch(failureVideoDownloadUrls(json[0].reason))
        }
      )
      .catch(function(error) {
        dispatch(failureVideoDownloadUrls(error))
      })
  }
}

export function fetchVideoDetailsByUrl(videoUrl) {
  return dispatch => {
    dispatch(requestVideoDetails(videoUrl))
    YouTubeService.fetchVideoDetails(videoUrl)
      .then(
        json => {
          dispatch(responseVideoDetails(json))
        }
      )
      .catch(function(error) {
        dispatch(failureVideoDetails(error))
      })
  }
}