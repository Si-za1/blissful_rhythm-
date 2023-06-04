document.addEventListener("DOMContentLoaded", function() {
    var videoThumbnails = document.querySelectorAll(".video-thumbnail");
    var container = document.querySelector(".container");
  
   
      videoThumbnails.addEventListener("click", function() {
        // Hide the container
        container.style.display = "none";
  
        var videoPlayer = this.nextElementSibling;
        videoPlayer.style.display = "block";
        videoPlayer.style.width = "50%";
  
      });
  });
  