let background, player, pipe_bottom, pipe_top;
let game_size = [572, 1014];
let game_running = false;
let pipe = [200, 100];
let pipe_gab = 100;
let pipe_speed = 10;

function preload() {
  // Lädt die Bilder
  background = loadImage("media/bg3.png");
  player = loadImage("media/player.png");
  pipe_bottom = loadImage("media/bottom_pipe.png");
  pipe_top = loadImage("media/top_pipe.png");
}

function setup() {
  game_size = [windowWidth, windowHeight];
  createCanvas(game_size[0], game_size[1]);
  background.resize(0, game_size[1]);
  player.resize(0, 125);
  frameRate(25);
}

function play() {
  image(pipe_top, pipe[0], pipe[1] - pipe_top.height);
  image(pipe_bottom, pipe[0], pipe[1] + pipe_gab);
}

function draw() {
  image(background, 0, 0);
  image(player, 100, 450);
  if (!game_running) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255);
    text("Flying Guinea Pigs", game_size[0] / 3.5, game_size[1] / 5);
    text("Click to start", game_size[0] / 3.5, game_size[1] / 3);
    if (mouseIsPressed) {
      game_running = true;
    }
  } else {
    play();
  }
}
