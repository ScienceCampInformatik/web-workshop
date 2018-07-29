
(function() {
  function selectFrame(id) {
    var list = document.getElementsByClassName('frame_stuff');
    for(var li of list) {
      li.classList.add('hidden');
    }

    var frame = document.getElementById(id);
    if(frame) {
      frame.classList.remove('hidden');
    }
  }

  function setHeight(height) {
    var inhalt = document.getElementById('inhalt');
    if(inhalt) {
      inhalt.style.height = height;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    selectFrame('exkursion_frame');
  });

  document.getElementById('exkursion_button').addEventListener('click', (e) => {
    setHeight('1500px');
    selectFrame('exkursion_frame');
  });

  document.getElementById('foto_button').addEventListener('click', (e) => {
    setHeight('800px');
    selectFrame('foto_frame');
  });

  document.getElementById('spiel_button').addEventListener('click', (e) => {
    setHeight('500px');
    selectFrame('spiel_frame');
  });

}());
