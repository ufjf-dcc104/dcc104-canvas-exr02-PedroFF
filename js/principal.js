var tela = document.querySelector("#canvas");
var ctx = tela.getContext('2d');

//  --- Imagens ---
var imagens = new ImageLibrary();
imagens.load("nave", "icons/naveP.png");
imagens.load("vida", "icons/vida.png");
imagens.load("backg", "icons/background.png");
imagens.load("inimigo1", "icons/inimigo1.png");

//  --- Sons ---
var audios = new AudioLibrary();
audios.load("tiro", "sons/tiro.wav");
audios.load("vida", "sons/vida.wav");
audios.load("explosao", "sons/explosao.wav");
audios.load("hit", "sons/Hit.wav");

var dt = anterior = 0;
var tiros = [];
var vida = [];
var quantInimigos = 10;
var energia = 6;
var dano = false;
var pontos = 0;
var aumentarQuant = 0;
var cadencia = 0.5;
var corTiro = "yellow";
var sprite = new Sprite();
sprite.cdTiro = 0;
var spritesInimigos = [];

for(var e = 0; e < quantInimigos; e++)
{
  var enemy = new Sprite();
  enemy.ix = getRandomIntInclusive(20, 480);
  enemy.iy = getRandomIntInclusive(-1000, -200);
  spritesInimigos.push(enemy);
}


var life = new Sprite();
life.ix = getRandomIntInclusive(20, 480);
life.iy = getRandomIntInclusive(-10000, -5000);
vida.push(life);


function telaTitle()
{
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, tela.width, tela.height);
  imagens.draw(ctx,"backg", 0, 0);
  ctx.font="Bold 35px Arial";
  ctx.fillText("Bem-vindo ao Space Shooter", 5, 200);
  ctx.font="18px Arial";
  ctx.fillText("O objetivo do jogo é desviar dos asteróides e destruí-los,", 10, 250);
  ctx.fillText("para isso usará as setas para o movimento lateral e a", 10, 280);
  ctx.fillText("barra de espaço para disparar os tiros.", 10, 310);
  ctx.fillText("Bom jogo!",200, 380);
  ctx.fillText("Aperte Enter para jogar.", 140, 400);
  addEventListener("keydown", function(event)
  {
    event.preventDefault();
    if (event.keyCode === 13) {
      telaJogo();
      requestAnimationFrame(passo);
    }
  });
}

function limpaTela() {
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, tela.width, tela.height);
}

function telaJogo()
{
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, tela.width, tela.height);
  ctx.font="20px Arial";
  imagens.draw(ctx,"backg", 0, 0);
  ctx.fillStyle = "white";
  ctx.fillText("Energia: " + energia, 10,20);
  ctx.fillText("Pontos: " + pontos, 10,50);
  //requestAnimationFrame(passo);
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
    audios.play("explosao");
    ctx.fillStyle = "red";
    ctx.font = "Bold 70px Arial";
    ctx.fillText("FIM DE JOGO", 15, tela.height / 2);
    addEventListener("keydown", function(event)
    {
      event.preventDefault();
      if (event.keyCode === 13) {
        energia = 6;
        quantInimigos = 10;
        pontos = 0;
        requestAnimationFrame(telaTitle);
      }
    });
    return;
  }

  for (var i = 0; i < spritesInimigos.length; i++) {
    if (spritesInimigos[i].limiteInimigos(0,0, tela.width, tela.height)) {
      spritesInimigos[i].iy = getRandomIntInclusive(-1000, -200);
      spritesInimigos[i].ix = getRandomIntInclusive(20, 480);
      spritesInimigos[i].ivy += 5;
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

  sprite.mover(dt);
  sprite.cdTiro = sprite.cdTiro - dt ;
  sprite.impoeLimites(0,0, tela.width, tela.height);


  for (var i = 0; i < spritesInimigos.length; i++) {
    spritesInimigos[i].moveInimigos(dt);
    if(spritesInimigos[i].colidiuCom(sprite))
    {
      audios.play("hit");
      spritesInimigos[i].iy = 10000;
      spritesInimigos[i].ix = 10000;
      energia--;
    }
  }

  for (var i = 0; i < tiros.length; i++) {
    tiros[i].mover(dt);
    for (var j = 0; j < spritesInimigos.length; j++) {
      if(tiros[i].acertou(spritesInimigos[j]))
      {
        spritesInimigos[j].ix = 10000;
        spritesInimigos[j].iy = 10000;
        pontos++;

        if(aumentarQuant < 15)
        {
          aumentarQuant++;
        }
        else {
          aumentarQuant = 0;
          var enemy = new Sprite();
          enemy.ix = getRandomIntInclusive(20, 480);
          enemy.iy = getRandomIntInclusive(-1000, -200);
          spritesInimigos.push(enemy);
        }
      }
    }
  }

  for (var i = 0; i < vida.length; i++) {
    vida[i].moveInimigos(dt);
    if(vida[i].colidiuCom(sprite))
    {
      audios.play("vida");
      vida[i].iy = getRandomIntInclusive(-10000, -5000);
      vida[i].ix = getRandomIntInclusive(20, 480);
      energia++;
    }
  }

  telaJogo();

  sprite.desenhar(ctx,imagens.images["nave"]);

  for (var i = 0; i < spritesInimigos.length; i++) {
    spritesInimigos[i].desenhaInimigo(ctx, imagens.images["inimigo1"]);
  }
  for (var i = 0; i < tiros.length; i++) {
    tiros[i].desenharTiro(ctx);
  }
  for (var i = 0; i < vida.length; i++) {
    vida[i].desenharVida(ctx, imagens.images["vida"]);

  }

  anterior = t;
  requestAnimationFrame(passo);
}

limpaTela();
requestAnimationFrame(telaTitle);

addEventListener("keydown", function(e)
{
  switch (e.keyCode) {
    case 37:
    sprite.vx = -250;
    e.preventDefault();
    break;
    case 39:
    sprite.vx = 250;
    e.preventDefault();
    break;
    case 32:
    var tiro = new Sprite();
    if(sprite.cdTiro <= 0)
    {
      tiro.x = sprite.x;
      tiro.y = sprite.y;
      tiro.w = 5;
      tiro.h = 5;
      tiro.cor = corTiro;
      tiro.vy = -500;
      tiros.push(tiro);
      sprite.cdTiro = cadencia;
      audios.play("tiro");
    }
    break;
  }
});
addEventListener("keyup", function(e)
{
  if (e.keyCode === 37 || e.keyCode === 39)
  {
    sprite.vx = 0;
    e.preventDefault();
  }
});
