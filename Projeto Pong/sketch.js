//variaveis relacionadas a bola
let posicaox = 300;
let posicaoy = 200;
let diametro = 15;
let velocidadexbola = 7;
let velocidadeybola = 7;
let raio = diametro/2;

// Variaveis relacionadas a raquete
let xraquete = 5;
let yraquete = 150;
let comprimentoraquete = 10;
let alturaraquete = 90;
let colisao = false;

//Variaveis relacionadas a raquete do oponente
let xraqueteOponente = 585;
let yraqueteOponente = 150;
let velocidadeRaqueteOponente;

//Variaveis relacionadas ao placar
let meusPontos = 0;
let pontosOponente = 0;
let chanceDeErrar = 0;

//Sons do game
let ponto;
let batida;
let trilha;
function preload(){
  trilha = loadSound("sons/trilha.mp3");
  ponto = loadSound("sons/ponto.mp3");
  batida = loadSound("sons/raquetada.mp3");
}
function setup() {
createCanvas(600, 400);
  trilha.loop();
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
function bolinhaNaoFicaPresa(){
    if (posicaox - raio < 0){
    posicaox = 23
    }
}
function draw() {
background(0);
bolinha();
raquete();
raqueteOponente();
placar();
bolinhaNaoFicaPresa()
}

function bolinha(){
circle(posicaox, posicaoy, diametro);
posicaox += velocidadexbola;
posicaoy += velocidadeybola;
if (posicaox + raio > width || posicaox - raio < 0){
  velocidadexbola *= -1;
}
if (posicaoy + raio > height || posicaoy - raio < 0){
  velocidadeybola *= -1;
}
}

function raquete(){
rect(xraquete, yraquete, comprimentoraquete, alturaraquete);

if(keyIsDown(UP_ARROW) && yraquete > 0){
  yraquete -= 10;
}
if(keyIsDown(DOWN_ARROW) && yraquete + alturaraquete < height){
  yraquete += 10;
}
colisao = collideRectCircle(xraquete, yraquete, comprimentoraquete, alturaraquete, posicaox, posicaoy, raio);
if(colisao){
  velocidadexbola *= -1;
  batida.play();
}
}

function raqueteOponente(){
rect(xraqueteOponente, yraqueteOponente, comprimentoraquete, alturaraquete);
//Modo 1 Jogador
//velocidadeRaqueteOponente = posicaoy - yraqueteOponente - comprimentoraquete/2 -30 ; 
//yraqueteOponente += velocidadeRaqueteOponente + chanceDeErrar;
//calculaChanceDeErrar();
//Modo Multiplayer
if(keyIsDown(87) && yraqueteOponente > 0){
  yraqueteOponente -= 10;
}
if(keyIsDown(83) && yraqueteOponente + alturaraquete < height){
  yraqueteOponente += 10;
}
  
colisao = collideRectCircle(xraqueteOponente, yraqueteOponente, comprimentoraquete, alturaraquete, posicaox, posicaoy, raio);
if(colisao){
  velocidadexbola *= -1;
  batida.play();
}
}
function placar(){
stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0,191,255));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(0,191,255));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
if (posicaox > 590){
  meusPontos += 1;
  ponto.play();
}
if (posicaox < 10){
  pontosOponente += 1;
  ponto.play();
}


}

//Programed By Jonathan Fernandes da Costa