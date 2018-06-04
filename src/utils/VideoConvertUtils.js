var zencoder = require('zencoder')
var fileDownload = require('react-file-download') 
var client = new zencoder('7c22d96003d38db4878c4470e6f91cbd')

export default function onConvert(fileName, convertTo) {
  client.Job.create({
    input: `http://127.0.0.1:5000/videos/${fileName}`, 
    outputs: [
      {
        format: convertTo,
        url: `s3://zen-tests/awesome-movie.${convertTo}`
      }
    ]
  }, function(err, data) {
    if (err) { console.log(err); return; }

    poll(data, convertTo)
  })
}

function poll(data, convertTo) {
  setTimeout(function(){
    client.Job.progress(data.id, function(err, res) {
      if (err) { console.log("There was an error"); return err; }
      if (res.state === 'waiting') {
        console.log("Waiting")
        poll(data, convertTo)
      } else if (res.state === 'processing') {
        var progress = Math.round(res.progress * 100) / 100;
        console.log(`Progress: ${progress}`)
        poll(data, convertTo)
      } else if (res.state === 'finished') {
        console.log('Job finished!')
        fileDownload(data.url, `${new Date()}.${convertTo}`)
      }
    }, 5000)
  })
}