// An array of crashes and their locations
var crashes = [
  {
    name: "KIA",
    year: "1969",
    location: [12.28, 107.317],
    pilot: "Seibert F.W. Jr",
    info: "F-4 Phantom",
    backgroundImage: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/QF-4_Holloman_AFB.jpg" height="150px" width="150px" />'
  },
  {
    name: "Alive",
    year: "1968",
    location: [12.42, 107.883],
    pilot: "McGrath D.A.",
    info: "F-100 Super Sabre",
    backgroundImage: '<img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/F-100_Rogers_Dry_Lake.jpg" height="150px" width="150px" />'
  },
  {
    name: "KIA",
    year: "1965",
    location: [19.58333, 103.6667],
    pilot: "Ronca R.F.",
    info: "F-100 Super Sabre",
    backgroundImage: '<img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/F-100_Rogers_Dry_Lake.jpg" height="150px" width="150px" />'
  }
];

// Different color icons for KIA or survived
var kiaIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [15, 20]
});

var aliveIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [15, 20]
});

// An array which will be used to store created crashMarkers
var allMarkers = [];
var sixtyfiveMarkers = [];
var sixtyeightMarkers = [];
var sixtynineMarkers = [];

for (var i = 0; i < crashes.length; i++) {
  // loop through the crashes array, create a new marker, push it to the crashMarkers array
  
  if (crashes[i].name == "KIA" && crashes[i].year == "1965") {
    sixtyfiveMarkers.push(
      L.marker(crashes[i].location, {icon: kiaIcon}).bindPopup("<h5>" + "Pilot Status: " + crashes[i].name + "</h5>" + "<h5>" + "Pilot: " + crashes[i].pilot + "</h5>")
    );
    allMarkers.push(
      L.marker(crashes[i].location, {icon: kiaIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );  
  } else if (crashes[i].name == "Alive" && crashes[i].year == "1965") {
    sixtyfiveMarkers.push(
      L.marker(crashes[i].location, {icon: aliveIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
    allMarkers.push(
      L.marker(crashes[i].location, {icon: aliveIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
  } else if (crashes[i].name == "KIA" && crashes[i].year == "1968") {
    sixtyeightMarkers.push(
      L.marker(crashes[i].location, {icon: kiaIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
    allMarkers.push(
      L.marker(crashes[i].location, {icon: kiaIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
  } else if (crashes[i].name == "Alive" && crashes[i].year == "1968") {
    sixtyeightMarkers.push(
      L.marker(crashes[i].location, {icon: aliveIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
    allMarkers.push(
      L.marker(crashes[i].location, {icon: aliveIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
  } else if (crashes[i].name == "KIA" && crashes[i].year == "1969") {
    sixtynineMarkers.push(
      L.marker(crashes[i].location, {icon: kiaIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
    allMarkers.push(
      L.marker(crashes[i].location, {icon: kiaIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
  } else {
    sixtynineMarkers.push(
      L.marker(crashes[i].location, {icon: aliveIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
    allMarkers.push(
      L.marker(crashes[i].location, {icon: aliveIcon}).bindPopup("<h6>" + "Pilot Status:" + crashes[i].name + "</h6>" + "<h4>" + "Pilot:" + crashes[i].pilot + "</h4>" + "<h4>" + "Aircraft:" + crashes[i].info + "</h4>" + crashes[i].backgroundImage)
    );
  }
}

// Add all the crashMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var allLayer = L.layerGroup(allMarkers);
var sixtyfiveLayer = L.layerGroup(sixtyfiveMarkers);
var sixtyeightLayer = L.layerGroup(sixtyeightMarkers);
var sixtynineLayer = L.layerGroup(sixtynineMarkers);

// Define variables for our tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Overlays that may be toggled on or off
var overlayMaps = {
  "All": allLayer,
  "1965": sixtyfiveLayer,
  "1968": sixtyeightLayer,
  "1969": sixtynineLayer
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [15.35, 105.083],
  zoom: 6.25,
  layers: [dark, allLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(overlayMaps, null, {collapsed: false}).addTo(myMap);
