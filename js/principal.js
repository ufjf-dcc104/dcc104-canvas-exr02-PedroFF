var tela = document.querySelector("#canvas");
var ctx = tela.getContext('2d');
ctx.fillStyle = "grey";
ctx.fillRect(0, 0, tela.width, tela.height)

var tiros = [];
var vida = [];
var quantInimigos = 10;
//  --- Sprites ---
var sprite = new Sprite();
var spritesInimigos = [];

//  --- Imagens ---
var imagens = new ImageLibrary();
imagens.load("nave", "icons/naveP.png");

var audios = new AudioLibrary();
audios.load("tiro", "sons/tiro.wav");

var life = new Sprite();
life.ix = getRandomIntInclusive(20, 480);
life.iy = getRandomIntInclusive(-10000, -5000);
vida.push(life);

for(var e = 0; e < quantInimigos; e++) {
  var enemy = new Sprite();
  enemy.ix = getRandomIntInclusive(20, 480);
  enemy.iy = getRandomIntInclusive(-1000, -200);
  spritesInimigos.push(enemy);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function passo(t)
{
  dt = (t - anterior)/1000;

  if (energia <= 0) {
  audios.play("explosion");
  ctx.fillStyle = "red";
  ctx.font = "Bold 70px Arial";
  ctx.fillText("FIM DE JOGO", canvas.width / 16, canvas.height / 2 + 20);
  return;
}

for (var i = 0; i < inimigos.length; i++) {
  if (inimigos[i].limiteInimigos(0,0, tela.width, tela.height)) {
    inimigos[i].iy = getRandomIntInclusive(-1000, -200);
    inimigos[i].ix = getRandomIntInclusive(20, 480);
    inimigos[i].ivy += 5;
  }
}

for (var i = 0; i < vida.length; i++) {
  if (vida[i].limiteInimigos(0,0, tela.width, tela.height)) {
    vida[i].iy = getRandomIntInclusive(-10000, -5000);
    vida[i].ix = getRandomIntInclusive(20, 480);
  }
}

for (var i = 0; i < tiros.length; i++) {
  if(tiros[i].limiteTiros(0,0,tela.width,tela.height)){
    tiros[i].vy = 0;
    tiros[i].x = 900;
    tiros[i].y = 900;
  }
}

  sprites.mover(dt);
  pc.cdTiro = pc.cdTiro - dt ;
  sprites.impoeLimites(0,0, tela.width, tela.height);


for (var i = 0; i < spritesInimigos.length; i++) {
  spritesInimigos[i].moverInimigos(dt);
  if(spritesInimigos[i].colidiuCom(pc))
  {
    spritesInimigos[i].iy = getRandomIntInclusive(-1000, -200);
    spritesInimigos[i].ix = getRandomIntInclusive(20, 480);
    energia--;
  }
}


//  --- Desenha nave ---
sprite.desenhar(ctx, imagens.images["nave"]);
