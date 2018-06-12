(function() {
    'use strict';
    
    function selectFrame(id) {
      const list = document.querySelectorAll(".frame_stuff");
      for(const li of list) {
        li.classList.add("hidden");
      }

      const frame = document.querySelector(id);
      if(frame) {
        frame.classList.remove("hidden");
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      console.log('script ready for init');
      selectFrame("#ex_frame");
    });

    document.querySelector("#ex_button").addEventListener("click", (ev) => {
      selectFrame("#ex_frame");
    });

    document.querySelector("#fo_button").addEventListener("click", (ev) => {
      selectFrame("#fo_frame");
    });

    document.querySelector("#ga_button").addEventListener("click", (ev) => {
      selectFrame("#ga_frame");
    });
}());
