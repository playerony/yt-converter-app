export default function captureVideoFrame(video, format, quality) {
  if (typeof video === "string") {
    video = document.getElementById(video)
    video.crossOrigin="anonymous"
  }

  format = format || "jpeg"
  quality = quality || 0.92

  if (!video || (format !== "png" && format !== "jpeg"))
    return false

  let canvas = document.createElement("canvas")

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  canvas.getContext("2d").drawImage(video, 0, 0)

  let dataUri = canvas.toDataURL("image/" + format, quality)
  let data = dataUri.split(',')[1]
  let mimeType = dataUri.split(';')[0].slice(5)

  let bytes = window.atob(data)
  let buf = new ArrayBuffer(bytes.length)
  let arr = new Uint8Array(buf)

  for (let i = 0; i < bytes.length; i++)
    arr[i] = bytes.charCodeAt(i)

  let blob = new Blob([ arr ], { type: mimeType })
  return { blob: blob, dataUri: dataUri, format: format }
}
