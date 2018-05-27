function importAll(r) {
  return r.keys().map(r)
}

function importGalleryPhotos() {
  return importAll(require.context("../other/gallery/", false, /\.(png|jpe?g|bmp)$/))
}

function prepareGalleryView() {
  let photos = importGalleryPhotos()
  let resultList = []

  for(let i=0 ; i<photos.length ; i++) {
    let element = {
      src: photos[i],
      width: 1,
      height: 1
    }

    resultList.push(element)
  }

  return resultList
}

export default prepareGalleryView()