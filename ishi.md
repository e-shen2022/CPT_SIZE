<head>
    <style>
    .navbar {
        position: static;
        z-index: 9999;
        }
    </style>
    <title>Dermatologist Location </title>
</head>
<html>
<style>
.dropbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.dropbtn:hover, .dropbtn:focus {
  background-color: #3e8e41;
}
#myInput {
  box-sizing: border-box;
  background-image: url('searchicon.png');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}
#myInput:focus {outline: 3px solid #ddd;}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown a:hover {background-color: #ddd;}
.show {display: block;}
</style>
    <head>
        <div class="px-5 py-5 mx-auto">
            <h1 td style="text-align: center"><strong>Find a Dermatologist</strong></h1>
            <div class="col-15">
                <center>
                  <html>
                  <head>
                    <title>Distance Calculator</title>
                    <style>
                      table, th, td {
                        border: 1px solid black;
                        border-collapse: collapse;
                        padding: 10px;
                      }
                    </style>
                  </head>
                  <body>
                    <p>Enter the longitude and latitude of your location:</p>
                    <form>
                      <label for="longitude">Longitude:</label>
                      <input type="text" id="longitude" name="longitude">
                      <label for="latitude">Latitude:</label>
                      <input type="text" id="latitude" name="latitude">
                      <button type="button" onclick="calculateDistances()">Calculate Distances</button>
                    </form>
                    <br>
                    <table>
                      <tr>
                        <th>End Point</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Distance (in km)</th>
                      </tr>
                      <tr>
                        <td>San Diego: Insight Dermatology</td>
                        <td>32.9</td>
                        <td>-117.1</td>
                        <td id="distance1"></td>
                      </tr>
                      <tr>
                        <td>Los Angeles: Metropolis Dermatology</td>
                        <td>34.1</td>
                        <td>-118.1</td>
                        <td id="distance2"></td>
                      </tr>
                      <tr>
                        <td>San Francisco: Dermatology Medical Group</td>
                        <td>37.8</td>
                        <td>-122.4</td>
                        <td id="distance3"></td>
                      </tr>
                      <tr>
                        <td>Sacramento: Calkin & Boudreaux Dermatology Associates</td>
                        <td>38.6</td>
                        <td>-121.4</td>
                        <td id="distance4"></td>
                      </tr>
                      <tr>
                        <td>San Jose: Khuu Dermatology</td>
                        <td>37.4</td>
                        <td>-122.1</td>
                        <td id="distance5"></td>
                      </tr>
                    </table>
                    <script>
                      // Function to calculate the distance between two points using their latitude and longitude
                      function calculateDistance(startLat, startLon, endLat, endLon) {
                        const earthRadius = 6371; // Radius of the earth in km
                        const dLat = (endLat - startLat) * Math.PI / 180;  // Convert degrees to radians
                        const dLon = (endLon - startLon) * Math.PI / 180;
                        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(startLat * Math.PI / 180) * Math.cos(endLat * Math.PI / 180) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        const distance = earthRadius * c; // Distance in km
                        return distance.toFixed(2); // Round to 2 decimal places
                      }
                      // Function to calculate and display the distances between the start point and the end points
                      function calculateDistances() {
                        const startLat = parseFloat(document.getElementById("latitude").value);
                        const startLon = parseFloat(document.getElementById("longitude").value);
                        document.getElementById("distance1").innerHTML = calculateDistance(startLat, startLon, 20.654321, 10.123456);
                        document.getElementById("distance2").innerHTML = calculateDistance(startLat, startLon, 30.987654, 5.678901);
                        document.getElementById("distance3").innerHTML = calculateDistance(startLat, startLon, 40.123456, -3.141592);
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
</script>

<html>
  <head>
    <script src="https://maps.googleapis.com/maps/api/js?key=##yourapikey##"></script>
    <script>
        var map;
        var marker1;
        var marker2;
        var distance;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: 37.7749, lng: -122.4194}
          });
          map.addListener('click', function(event) {
            if (!marker1) {
              marker1 = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: 'Start'
              });
            } else if (!marker2) {
              marker2 = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: 'End'
              });
              calculateDistance();
            } else {
              marker1.setPosition(event.latLng);
              marker2.setMap(null);
              marker2 = null;
            }
          });
        }
        function calculateDistance() {
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix({
            origins: [marker1.getPosition()],
            destinations: [marker2.getPosition()],
            unitSystem: google.maps.UnitSystem.METRIC,
          }, function(response, status) {
            if (status !== 'OK') {
              alert('Error was: ' + status);
            } else {
              distance = response.rows[0].elements[0].distance.text;
              var infowindow = new google.maps.InfoWindow({
                content: 'Distance: ' + distance
              });
              infowindow.open(map, marker1);
            }
          });
        }
      </script>
  </head>
  <body onload="initMap()">
    <div id="map" style="height: 450; width: 100%;"></div>
  </body>
</html>