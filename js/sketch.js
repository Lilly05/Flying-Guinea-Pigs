let background, player, pipe_bottom, pipe_top, logo, logo1, logo2, logo3, GameOverLogo, GameOverLogo1, GameOverLogo2, GameOverLogo3, carrot;
let game_size = [572, 1014];
let game_running, GameOver  = false;
let pipe = [600, 800];
let pipe_gab = 200;
let pipe_speed = 6;
let jump, score10, score20 = 0;
let score = 0;
let playercoordinates = [100, 350];
let player2unlocked, player3unlocked = false;

function preload() {
  // Lädt die Bilder und Schriften
  background = loadImage("media/background3.jpg");
  player = loadImage("media/player.png");
  pipe_bottom = loadImage("media/bottom_pipe.png");
  pipe_top = loadImage("media/top_pipe.png");
  player1 = loadImage("media/player.png");
  player2 = loadImage("media/player2.png");
  player3 = loadImage("media/player3.png");
  logo1 = loadImage("media/logo.png");
  logo2 = loadImage("media/logo2.png");
  logo3 = loadImage("media/logo3.png");
  GameOverLogo1 = loadImage("media/gameoverlogo.png");
  GameOverLogo2 = loadImage("media/gameoverlogo2.png");
  GameOverLogo3 = loadImage("media/gameoverlogo3.png");
  logo = loadImage("media/logo.png");
  GameOverLogo = loadImage("media/gameoverlogo.png");
  carrot = loadImage("media/carrot.png");
  font2 = loadFont("media/Pixeled.ttf");
  font = loadFont('media/Crumbled-Pixels.ttf');
}

function setup() {
  game_size = [500, windowHeight-50];
  createCanvas(game_size[0], game_size[1]);
  background.resize(0, game_size[1]);
  player.resize(0, 125);
  player1.resize(0, 125);
  player2.resize(0,125);
  player3.resize(0, 125);
  logo.resize(0, 400);
  background.resize(500, window.height);
}

function game() {
  pipe[0] -= pipe_speed; 
  if(pipe[0] < -pipe_top.width){
    pipe[0] = game_size[0];
    pipe[1] = 50 + random(game_size[1] - 200);
    pipe_gab = 175;
    score += 1;
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
    pipe[1] = 50 + random(game_size[1] - 175);
    pipe_gab =  175;
    game_running = false;
    GameOver = true;
  }
  fill(000);
  textFont(font2);
  textSize(20);
  text("Score:  " + score, 100, 30);
}

function collision(im1,x1,y1, im2,x2,y2, y3){
  if((x1 + im1.width / 2) > x2) { // Hier wird geprüft: trifft die Nase des Schweins in der Horizontalen auf eine Säule
    if(y1 < (y2 + im2.height - 50)){ // Hier wird geprüft: fliegt das Schwein in der Vertikalen auf einer Höhe, die sich zwischen Beginn und Ende der oberen Säule befindet
      if(x1 < x2 + 200){
        return true; // Es findet eine Kollision statt
      }else{
        return false; // Es findet keine Kollision statt
      }
    }else{
      if(y1 > y3 - 75){ // Hier wird prüfen: fliegt das Schwein in der Vertikalen auf einer Höhe, die sich zwischen Beginn und Ende der unteren Säule befindet
        if(x1 < x2 + 200){
          return true; // Es findet eine Kollision statt
        }else{
          return false; // Es findet keine Kollision statt
        }
      }else{
        return false; // Es findet keine Kollision statt
      }
    }
  }else if(y1 < 0){
    return true; // Es findet eine Kollision statt
  }else if(y1 > 1000){
    return true; // Es findet eine Kollision statt
  }
  else {
    return false; // Es findet keine Kollision statt
  }
  
}

function draw() {
  image(background, 0, 0);
  if (!game_running) {
    if (GameOver == true){
      playercoordinates = [100, 350];
      textAlign(CENTER, CENTER);
      textSize(50);
      textFont(font2);
      fill(000);
      text("Game Over", background.width/2 , 200);
      image(GameOverLogo,game_size[0]/2-125, 250)
      textSize(30);
      textFont(font2);
      fill(255);
      text("Score: " + score, background.width/2, 600);
      textSize(50);
      textFont(font);
      fill(255);
      text("Press ENTER to play again", background.width/2 , 700);
      if(score >= 10){
        score10 = score;
      }
      if(score >= 20){
        score20 = score;
      }
      if(score10 >= 10){
        player2unlocked = true;
      }else{
        player2unlocked = false;
      }
      if(score20 >= 20){
        player3unlocked = true;
      }else{
        player3unlocked = false;
      }
    } else {
      textAlign(CENTER, CENTER);
      textSize(30);
      textFont(font2);
      fill(000);
      text("Flying Guinea Pigs", background.width/2 , 100);
      image(logo, background.width/2-140, 100);
      textAlign(CENTER, CENTER);
      textSize(60);
      textFont(font);
      fill(000);
      text("Press SPACE to start", background.width/2 , 450);
      textFont(font2);
      textSize(20);
      fill(255);
      text("Choose your player", background.width/2, 550);
      image(player1, 70, 600);
      image(player2, 70, 700);
      image(player3, 70, 800);
      textSize(15);
      text("UNLOCKED", 300, 650);
      textFont(font);
      textSize(40);
      text("Press a to equip", 300, 700);
      if(player2unlocked == true){
        textFont(font2);
        textSize(15)
        text("UNLOCKED", 300, 750);
        textFont(font);
        textSize(40);
        text("Press b to equip", 300, 800);
      }else{
        textFont(font2);
        textSize(15);
        text("Required Score: 10", 300, 750);
      }
      if(player3unlocked == true){
        textFont(font2);
        textSize(15)
        text("UNLOCKED", 300, 850);
        textFont(font);
        textSize(40);
        text("Press c to equip", 300, 900);
      }else{
        textFont(font2);
        textSize(15);
        text("Required Score: 20", 300, 850);
      }
    }
  } else {
    game();
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
      score = 0;
    }
    }
    if(game_running == false){
      if(key == 'a'){
        player = player1;
        logo = logo1;
        GameOverLogo = GameOverLogo1;
      }
      if(player2unlocked == true){
        if(key == 'b'){
          player = player2;
          logo = logo2;
          GameOverLogo = GameOverLogo2;
        }
      }
      if(player3unlocked == true){
        if(key == 'c'){
          player = player3;
          logo = logo3;
          GameOverLogo = GameOverLogo3;
        }
      }
    }
  }

