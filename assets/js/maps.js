//This code was thought by CI
function initMap() {
    let newyork = { lat: 40.86751 , lng: -73.96054 };
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: newyork,
    });

    const marker = new google.maps.Marker({
      position: newyork,
      map: map,
    });
  }
  