var options = {
  lat: 45.693237, //starting position
  lng: 9.6320701, //Bergamo
  zoom: 4,
  style: 'mapbox://styles/serenamilesi/cjor0dgnufycx2qnxeu6jtymn',
  pitch: 50
};

var mappa = new Mappa('MapboxGL', 'pk.eyJ1Ijoic2VyZW5hbWlsZXNpIiwiYSI6ImNqb3F6MWU5dzA4ZnYzcXNjamhsanhxaGQifQ.dr8EvSmmuPNTcHrePhs0yA');
var myMap;

var canvas;
var meteorites;

function preload() {
  // Load the data
  meteorites = loadTable('assets/Meteorite_Landings.csv', 'csv', 'header');

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Redraw the meteorites when the map change
  myMap.onChange(drawMeteorites);

  fill('#962196');
  noStroke();
}

function draw() {
  rect(0, 0, windowWidth, windowHeight / 8);

  //text
  push();
  textFont('Ubuntu Condensed');
  textSize(25);
  textAlign(CENTER);
  fill('white');
  text('A visualization of the 5000 largest recorded meteorite landings in the world', windowWidth / 2, windowHeight / 13);
  pop();

  //text2
  push();
  textFont('Ubuntu Condensed ');
  textSize(20);
  textAlign(CENTER);
  fill('#f0a314');
  text('Go explore!', windowWidth / 2, windowHeight / 9);
  pop();
}

//draw meteorites - access the csv file
function drawMeteorites() {

  clear();

  for (var i = 0; i < meteorites.getRowCount(); i += 1) {

    // Get the position of each meteorite
    var latitude = Number(meteorites.getString(i, 'reclat'));
    var longitude = Number(meteorites.getString(i, 'reclong'));

    // Transform lat/lng to pixel position
    var pos = myMap.latLngToPixel(latitude, longitude);

    //max size (558 min - 60000000 max dimension of a meteorite)
    var size = meteorites.getString(i, 'mass (g)'); //get the mass of each meteorite
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    ellipse(pos.x, pos.y, size, size);
  }
}
