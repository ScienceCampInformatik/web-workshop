(function() {
    'use strict';
    const canvasWidth = 200;

    document.addEventListener('DOMContentLoaded', function() {
      console.log('script ready for init');

      const canvas = document.querySelector("#foto_can");
      const context = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasWidth;
      context.fillStyle = "black";
      context.fillRect(0,0,canvasWidth, canvasWidth);
      const input = document.querySelector("#foto_input");
      let file;

      input.addEventListener("change", (event) => {
        file = event.target.files[0];
        if(file) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          const image = new Image();
          image.addEventListener("load", (event) => {
            const width = image.width;
            const height = image.height;
            const ratio = height/width;
            const scale = canvasWidth/width;
            canvas.height = canvasWidth * ratio;
            canvas.width = canvasWidth;

            context.drawImage(image, 0, 0, canvas.width, canvas.height);
          });
          image.src = URL.createObjectURL(file);
        }
        return false;
      });


      document.querySelector("#grey_button").addEventListener("click", (event) => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

          for(let i = 0; i < data.length; i += 4) {
            const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            // red
            data[i] = brightness;
            // green
            data[i + 1] = brightness;
            // blue
            data[i + 2] = brightness;
          }

          context.putImageData(imageData, 0, 0);

          const dataurl = canvas.toDataURL();
          const fotoDown = document.querySelector("#foto_down");
          fotoDown.href = dataurl;
          if(file) {
            fotoDown.setAttribute("download", "greyscale_" + file.name);
          }
      });

      document.querySelector("#bla_button").addEventListener("click", (event) => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

          for(let i = 0; i < data.length; i += 20) {
            // red
            //data[i] = 0;
            // green
            data[i + 1] = 0;
            // blue
            data[i + 2] = 0;
          }

          context.putImageData(imageData, 0, 0);

          const dataurl = canvas.toDataURL();
          const fotoDown = document.querySelector("#foto_down");
          fotoDown.href = dataurl;
          if(file) {
            fotoDown.setAttribute("download", "nored_" + file.name);
          }
      });

          document.querySelector("#start_cam").addEventListener("click", (event) => {
            // Grab elements, create settings, etc.
            var video = document.getElementById('video');
            video.width = canvasWidth;
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
              console.log(event);
              context.clearRect(0, 0, canvas.width, canvas.height);
              const width = video.videoWidth;
              const height = video.videoHeight;
              const ratio = height/width;
              const scale = canvasWidth/width;
              canvas.height = canvasWidth * ratio;
              canvas.width = canvasWidth;

              context.drawImage(video, 0, 0, canvas.width, canvas.height);
               return false;
            });
          });
    });



})();
