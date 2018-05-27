import axios from 'axios'

let downloadApiUrl = 'https://you-link.herokuapp.com'
let youtubeApiUrl = 'https://www.youtube.com/oembed?url='

export function fetchVideoDownloadUrls(videoUrl) {
  return axios.get(downloadApiUrl + '/?url=' + videoUrl)
    .then(response => {
      return response.data
    })
}

export function fetchVideoDetails(videoUrl) {
  return axios.get(youtubeApiUrl + videoUrl + '&format=json')
    .then(response => {
      return response.data
    })
}
