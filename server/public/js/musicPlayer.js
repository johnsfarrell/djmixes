function loadSong() {
    const mixId = document.getElementById('mixId').value;
    const audioPlayer = document.getElementById('audioPlayer');
  
    fetch(`/mix/${mixId}`)
      .then(response => response.json())
      .then(data => {
        if (data.url) {
          audioPlayer.src = data.url;
          audioPlayer.play();
        } else {
          alert('Mix not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to load mix');
      });
  }

// Check for songId in the URL when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mixId = urlParams.get('mixId');
  
    if (mixId) {
      loadSong(mixId); // Automatically load and play the song
    } else {
      alert('No mix ID provided in the URL');
    }
  });