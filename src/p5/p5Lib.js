let screenWidth;
let screenHeight;

let canvas;
const canvasLeft = 0;
const canvasTop = 0;
const canvasRight = 0;
const canvasBottom = 0;

let baseRatioX;
let baseRatioY;
let originX = 0;
let originY = 0;

let planetCount;

let planets = [];
let sun;

let singleValues = [];
let minValues = [];
let maxValues = [];

export function setup(sketch, rangedSliders, singleSliders) {
  console.log("setup...");

  setupScreen(sketch, rangedSliders, singleSliders);

  generatePlanets(sketch);
  generateSun();
}

export function draw(sketch, rangedSliders, singleSliders) {
  sketch.background(singleValues[10], singleValues[11], singleValues[12]);

  setOrigin(sketch);

  movePlanets(sketch);
  drawPlanets(sketch);

  sun.x = originX;
  sun.y = originY;
  drawCircle(sketch, sun);

  displayFPS(sketch);
}

export function windowResized(sketch) {
  resizeScreenDimentions(sketch);
}

function setupScreen(sketch, rangedSliders, singleSliders) {
  getSliders(rangedSliders, singleSliders);
  resizeScreenDimentions(sketch);
  setOrigin(sketch);
  canvas = sketch.createCanvas(screenWidth, screenHeight);
  canvas.position(canvasLeft, canvasTop, "fixed");
}

function resizeScreenDimentions(sketch) {
  screenWidth = sketch.windowWidth - canvasRight;
  screenHeight = sketch.windowHeight - canvasBottom;

  canvas = sketch.resizeCanvas(screenWidth, screenHeight);
}

function setOrigin(sketch) {
  let baseX = baseRatioX * screenWidth;
  let baseY = baseRatioY * screenHeight;

  originX = singleValues[6] * (sketch.mouseX - screenWidth / 2) + baseX;
  originY = singleValues[7] * (sketch.mouseY - screenHeight / 2) + baseY;
}

function getSliders(rangedSliders, singleSliders) {
  for (let i = 0; i < rangedSliders.length; i++) {
    minValues[i] = rangedSliders[i].value[0];
    maxValues[i] = rangedSliders[i].value[1];
  }

  for (let i = 0; i < singleSliders.length; i++) {
    singleValues[i] = singleSliders[i].value;
  }

  baseRatioX = singleSliders[8].value;
  baseRatioY = singleSliders[9].value;
}

function generateSun() {
  var sunRadius = singleValues[0];
  var sunRed = singleValues[1];
  var sunGreen = singleValues[2];
  var sunBlue = singleValues[3];
  var sunAlpha = singleValues[4];

  sun = new Star(
    originX,
    originY,
    sunRadius,
    sunRed,
    sunGreen,
    sunBlue,
    sunAlpha
  );
}

function generatePlanets(sketch) {
  planetCount = singleValues[5];

  for (var i = 0; i < planetCount; i++) {
    generatePlanet(i, sketch);
  }
}

function generatePlanet(i, sketch) {
  var planetRadius = sketch.random(minValues[0], maxValues[0]);

  var orbitalRadius = sketch.random(minValues[1], maxValues[1]);
  var orbitalAngle = -sketch.radians(sketch.random(minValues[2], maxValues[2]));
  var orbitalVelocity = sketch.radians(
    sketch.random(minValues[3], maxValues[3])
  );

  var r = sketch.random(minValues[4], maxValues[4]);
  var g = sketch.random(minValues[5], maxValues[5]);
  var b = sketch.random(minValues[6], maxValues[6]);
  var a = sketch.random(minValues[7], maxValues[7]);

  var vectorX = orbitalRadius * sketch.cos(orbitalAngle);
  var vectorY = orbitalRadius * sketch.sin(orbitalAngle);
  var x = originX + vectorX;
  var y = originY + vectorY;

  var planet = new Planet(
    x,
    y,
    planetRadius,
    orbitalRadius,
    orbitalAngle,
    orbitalVelocity,
    r,
    g,
    b,
    a
  );

  planets[i] = planet;
}

function movePlanets(sketch) {
  for (var i = 0; i < planetCount; i++) {
    circularPlanetMovement(i, sketch);
  }
}

function drawPlanets(sketch) {
  for (var i = 0; i < planetCount; i++) {
    drawCircle(sketch, planets[i]);
  }
}

function circularPlanetMovement(i, sketch) {
  var planet = planets[i];

  planet.orbitalAngle += planet.orbitalVelocity;
  var vectorX = planet.orbitalRadius * sketch.cos(planet.orbitalAngle);
  var vectorY = planet.orbitalRadius * sketch.sin(planet.orbitalAngle);

  planet.x = originX + vectorX;
  planet.y = originY + vectorY;
}

function drawCircle(sketch, obj) {
  sketch.noStroke();
  sketch.fill(obj.r, obj.g, obj.b, obj.a);
  sketch.circle(obj.x, obj.y, obj.radius);
}

class Star {
  constructor(x, y, radius, r, g, b, a) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

class Planet extends Star {
  constructor(
    x,
    y,
    radius,
    orbitalRadius,
    orbitalAngle,
    orbitalVelocity,
    r,
    g,
    b,
    a
  ) {
    super(x, y, radius, r, g, b, a);
    this.orbitalRadius = orbitalRadius;
    this.orbitalAngle = orbitalAngle;
    this.orbitalVelocity = orbitalVelocity;
  }
}

function displayFPS(sketch) {
  let fps = sketch.frameRate();
  sketch.fill(255);
  sketch.stroke(0);
  sketch.text("FPS: " + fps.toFixed(2), 10, sketch.height - 10);
}
