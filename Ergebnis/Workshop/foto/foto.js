var canvasWidth = 300;
var canvas = document.getElementById("foto_can");
var context = canvas.getContext("2d");
var file;

function input(e) {
  file = event.target.files[0];
  if(file) {
    var image = new Image();
    image.addEventListener("load", (event) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      var width = image.width;
      var height = image.height;
      if(width > height) {
        var ratio = height/width;
        var scale = canvasWidth/width;
        canvas.height = canvasWidth * ratio;
        canvas.width = canvasWidth;
      } else {
        var ratio = width/height;
        var scale = canvasWidth/height;
        canvas.height = canvasWidth;
        canvas.width = canvasWidth * ratio;
      }

      canvas.style.height = canvas.height + "px";
      canvas.style.width = canvas.width + "px";
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      updateFotoDownload();
    });
    image.src = URL.createObjectURL(file);
  }
  return false;
}

function updateFotoDownload() {
      var dataurl = canvas.toDataURL();
      var fotoDown = document.getElementById("foto_down");
      fotoDown.href = dataurl;
      if(file) {
        fotoDown.setAttribute("download", "greyscale_" + file.name);
      }
}

function schwarzWeiss() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

    for(var i = 0; i < data.length; i += 4) {
      var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // red
      data[i] = brightness;
      // green
      data[i + 1] = brightness;
      // blue
      data[i + 2] = brightness;
    }

    context.putImageData(imageData, 0, 0);
    updateFotoDownload();
}

function invertieren() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

    for(var i = 0; i < data.length; i += 4) {
      // red
      data[i] = 255-data[i];
      // green
      data[i + 1] = 255-data[i+1];
      // blue
      data[i + 2] = 255-data[i+2];
    }

    context.putImageData(imageData, 0, 0);
    updateFotoDownload();
}

function rotBlau() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

    for(var i = 0; i < data.length; i += 4) {
      var rot = data[i];

      // red
      data[i] = data[i+2];
      // blue
      data[i + 2] = rot;
    }

    context.putImageData(imageData, 0, 0);
    updateFotoDownload();
}




function gestreift() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

    for(let i = 0; i < data.length; i += 20) {
      // green
      data[i + 1] = 0;
      // blue
      data[i + 2] = 0;
    }

    context.putImageData(imageData, 0, 0);

    updateFotoDownload();
}

function starteCameraInput() {
  // Grab elements, create settings, etc.
  var video = document.getElementById('video');
  video.style.width = canvasWidth + "px";
  video.width = canvasWidth;
  video.style.height = canvasWidth + "px";
  video.height = canvasWidth;
  var mediaConfig =  { video: true };
  var errBack = function(e) {
    console.log('An error has occurred!', e)
  };

  // Put video listeners into place
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(mediaConfig)
      .then(function(stream) {
        try {
          video.srcObject = stream;
        } catch (error) {
          video.src = window.URL.createObjectURL(stream);
        }
        video.play();
      })
      .catch(function(problem) {
        console.warn('navigator.mediaDevices.getUserMedia problem', problem);
        console.warn(problem);
      });
  }

  video.addEventListener("click", (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const width = video.videoWidth;
    const height = video.videoHeight;

    if(width > height) {
      var ratio = height/width;
      var scale = canvasWidth/width;
      canvas.height = canvasWidth * ratio;
      canvas.width = canvasWidth;
    } else {
      var ratio = width/height;
      var scale = canvasWidth/height;
      canvas.height = canvasWidth;
      canvas.width = canvasWidth * ratio;
    }

    canvas.style.height = canvas.height + "px";
    canvas.style.width = canvas.width + "px";
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    updateFotoDownload();
  });
}
