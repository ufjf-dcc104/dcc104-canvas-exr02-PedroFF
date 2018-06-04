var tela = document.querySelector("#canvas");
var ctx = tela.getContext('2d');
ctx.fillStyle = "grey";
ctx.fillRect(0, 0, tela.width, tela.height)

var dt = anterior = 0;
var tiros = [];
var vida = [];
var quantInimigos = 10;
var energia = 5;
var dano = false;
var pontos = 0;
var aumentarQuant = 0;
var cadencia = 0.5;
var corTiro = "yellow";
var sprite = new Sprite();
sprite.cdTiro = 0;
var spritesInimigos = [];

for(var e = 0; e < quantInimigos; e++) {
  var enemy = new Sprite();
  enemy.ix = getRandomIntInclusive(20, 480);
  enemy.iy = getRandomIntInclusive(-1000, -200);
  spritesInimigos.push(enemy);
}

//  --- Imagens ---
var imagens = new ImageLibrary();
imagens.load("nave", "icons/naveP.png");
imagens.load("vida", "icons/vida.png");
imagens.load("inimigo1", "icons/inimigo1.png");

var audios = new AudioLibrary();
audios.load("tiro", "sons/tiro.wav");

//Cria a vida
var life = new Sprite();
life.ix = getRandomIntInclusive(20, 480);
life.iy = getRandomIntInclusive(-10000, -5000);
vida.push(life);

function limpaTela()
{
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, tela.width, tela.height);
  ctx.font="20px Arial";
  //imagens.draw(ctx,"espaço", 0, 0);
  ctx.fillStyle = "white";
  ctx.fillText("Energia: " + energia, 10,20);
  ctx.fillText("Pontos: " + pontos, 10,50);
}
//Função que gera aleatoriedade
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function passo(t)
{
  dt = (t - anterior)/1000;
  //Verifica se a energia acabou e chama o Game Over
  if (energia <= 0) {
    //audios.play("explosion");
    ctx.fillStyle = "red";
    ctx.font = "Bold 70px Arial";
    ctx.fillText("FIM DE JOGO", canvas.width / 16, canvas.height / 2 + 20);
    return;
  }
  //Verifica se os inimigos sairam da tela
  for (var i = 0; i < spritesInimigos.length; i++) {
    if (spritesInimigos[i].limiteInimigos(0,0, tela.width, tela.height)) {
      spritesInimigos[i].iy = getRandomIntInclusive(-1000, -200);
      spritesInimigos[i].ix = getRandomIntInclusive(20, 480);
      spritesInimigos[i].ivy += 5;
    }
  }
  //Verifica se a vida saiu da tela
  for (var i = 0; i < vida.length; i++) {
    if (vida[i].limiteInimigos(0,0, tela.width, tela.height)) {
      vida[i].iy = getRandomIntInclusive(-10000, -5000);
      vida[i].ix = getRandomIntInclusive(20, 480);
    }
  }
  //Verifica se o tiro saiu da Tela
  for (var i = 0; i < tiros.length; i++) {
    if(tiros[i].limiteTiros(0,0,tela.width,tela.height)){
      tiros[i].vy = 0;
      tiros[i].x = 900;
      tiros[i].y = 900;
    }
  }
  //Movimenta o sprite principal e impõe limites
  sprite.mover(dt);
  sprite.cdTiro = sprite.cdTiro - dt ;
  sprite.impoeLimites(0,0, tela.width, tela.height);

  //Movimenta os inimigos e verifica se houve colisão com o sprite principal
  for (var i = 0; i < spritesInimigos.length; i++) {
    spritesInimigos[i].moveInimigos(dt);
    if(spritesInimigos[i].colidiuCom(sprite))
    {
      spritesInimigos[i].iy = getRandomIntInclusive(-1000, -200);
      spritesInimigos[i].ix = getRandomIntInclusive(20, 480);
      energia--;
    }
  }
  //Movimenta os tiros e verifica se acertou em algum inimigo
  for (var i = 0; i < tiros.length; i++) {
    tiros[i].mover(dt);
    for (var j = 0; j < spritesInimigos.length; j++) {
      if(tiros[i].acertou(spritesInimigos[j]))
      {
        spritesInimigos[j].iy = getRandomIntInclusive(-1000, -200);
        spritesInimigos[j].ix = getRandomIntInclusive(20, 480);
        pontos++;
        /*if(tiroEsp == false)
        {
          tiros[i].vy = 0;
          tiros[i].y = 900;
          tiros[i].x = 900;
        }*/
        //Aumenta a quantidade de inimigos a cada 10 pontos
        if(aumentarQuant < 10)
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
  //Movimenta o sprite vida e verifica colisões
  for (var i = 0; i < vida.length; i++) {
    vida[i].moveInimigos(dt);
    if(vida[i].colidiuCom(sprite))
    {
      //audios.play("bonus");
      vida[i].iy = getRandomIntInclusive(-10000, -5000);
      vida[i].ix = getRandomIntInclusive(20, 480);
      energia++;
    }
  }

  limpaTela();
  //Desenha os sprites

  sprite.desenhar(ctx,imagens.images["nave"]);

  for (var i = 0; i < spritesInimigos.length; i++) {
    spritesInimigos[i].desenhaInimigo(ctx, imagens.images["inimigo1"]);
  }
  for (var i = 0; i < tiros.length; i++) {
    tiros[i].desenharTiro(ctx);
  }
  for (var i = 0; i < vida.length; i++) {
    vida[i].desenharVida(ctx, imagens.images["vida"]);
    //vida[i].ivy = velocidadeSpritesBonus;
  }

  anterior = t;
  requestAnimationFrame(passo);
}
requestAnimationFrame(passo);
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
