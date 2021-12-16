let background, player, pipe_bottom, pipe_top, logo, GameOverLogo;
let game_size = [572, 1014];
let game_running = false;
let game_started = false;
let GameOver = false;
let pipe = [800, 380];
let pipe_gab = 175;
let pipe_speed = 5;
let jump = 0;
let playercoordinates = [100, 350];


function preload() {
  // Lädt die Bilder
  background = loadImage("media/bg3.png");
  player = loadImage("media/player.png");
  pipe_bottom = loadImage("media/bottom_pipe.png");
  pipe_top = loadImage("media/top_pipe.png");
  font = loadFont('media/Crumbled-Pixels.ttf');
  GameOverFont = loadFont('media/PIXEL-LI.TTF');
  logo = loadImage("media/logo.png");
  GameOverLogo = loadImage("media/gameoverlogo.png")
}

function setup() {
  game_size = [500, windowHeight];
  createCanvas(game_size[0], game_size[1]);
  background.resize(0, game_size[1]);
  player.resize(0, 125);
  logo.resize(0, 400);
}

function play() {
  pipe[0] -= pipe_speed;
  if(pipe[0] < -pipe_top.width){
    pipe[0] = game_size[0];
    pipe[1] = 50 + random(game_size[1] - 200);
    pipe_gab = 175;
  }
  image(pipe_top, pipe[0], pipe[1]- pipe_top.height); // x Koordinate von der oberen Säule
  image(pipe_bottom, pipe[0], pipe[1]+ pipe_gab); // y Koordinate von der unteren Säule

  if(jump > -20){
    jump -= 1;
  }
  playercoordinates[1] -= jump;
  image(player, playercoordinates[0], playercoordinates[1]);

  if(collision(player, playercoordinates[0], playercoordinates[1], pipe_top, pipe[0], pipe[1]-pipe_top.height, pipe[1]+ pipe_gab)){
    pipe[0] = game_size[0];
    pipe[1] = 50 + random(game_size[1] - 200);
    pipe_gab =  175;
    game_running = false;
    GameOver = true;
  }
  
}

function collision(im1,x1,y1, im2,x2,y2, y3){
  if((x1 + im1.width / 2) > x2) { // Hier wird geprüft: trifft die Nase des Schweins in der Horizontalen auf eine Säule
    if(y1 > y2 && y1 < (y2 + im2.height -50)){ // Hier wird geprüft: fliegt das Schwein in der Vertikalen auf einer Höhe, die sich zwischen Beginn und Ende der oberen Säule befindet
      //noLoop();
      return true;
    }else{
      if(y1 > y3 -50){ // Hier noch zu prüfen: fliegt das Schwein in der Vertikalen auf einer Höhe, die sich zwischen Beginn und Ende der unteren Säule befindet
        return true;
        
      }else{
        return false;
      }
    }

    /*
    console.log((x1 + im1.width < x2));
    console.log((x1 > x2 + im2.width));
    console.log((y1 + im1.height < y2));
    console.log((y1 > y2 + im2.height));
    console.log("im1.height: " + im1.height);
    console.log("im1.width: " + im1.width);
    console.log("x1: " + x1);
    console.log("x2: " + x2);
    console.log("im2.width: " + im2.width);
    console.log("im2.height: " + im2.height);
    console.log("y1: " + y1);
    console.log("y2: " + y2);
*/
  } else {
    return false; // Es findet keine Kollision statt
  }
}

function draw() {
  image(background, 0, 0);
  
  if (!game_running) {
    if (GameOver == true){
      textAlign(CENTER, CENTER);
      textSize(100);
      textFont(GameOverFont);
      fill(255);
      text("Game Over", background.width/2-30, 200);
      image(GameOverLogo,game_size[0]/2-125, 250)
      textSize(50);
      textFont(font);
      fill(255);
      text("Press ENTER to play again", background.width/2 - 30, 600);
    } else {
      textAlign(CENTER, CENTER);
      textSize(60);
      textFont(GameOverFont);
      fill(255);
      text("Flying Guinea Pigs", background.width/2 - 30, 200);
      image(logo, game_size[0]/2-125, 200);
      textAlign(CENTER, CENTER);
      textSize(60);
      textFont(font);
      fill(255);
      text("Press SPACE to start", background.width/2 - 30, 600);
    }
    
  } else {
    play();
  }
}

function keyPressed(){
  if(GameOver == false){
  if(key == ' '){
    game_running = true;
      jump = 13;
  }
}
  if(GameOver == true){
    if(keyCode === ENTER){
      GameOver = false;
    }
    }
  }

