var tela = document.querySelector("#canvas");
var ctx = tela.getContext('2d');

//  --- Imagens ---
var imagens = new ImageLibrary();
imagens.load("nave", "icons/naveP.png");
imagens.load("vida", "icons/vida.png");
imagens.load("backg", "icons/background.png");
imagens.load("info", "icons/info.png");
imagens.load("enter", "icons/enter.png");
imagens.load("voltar", "icons/voltar.png");
imagens.load("rank", "icons/rank.png");
imagens.load("inimigo1", "icons/inimigo1.png");

//  --- Sons ---
var audios = new AudioLibrary();
audios.load("tiro", "sons/tiro.wav");
audios.load("vida", "sons/vida.wav");
audios.load("explosao", "sons/explosao.wav");
audios.load("hit", "sons/Hit.wav");

//  --- Variáveis ---
var estado = "menu";
var tiros = [];
var tiroEspecial = [];
var vida = [];
var dt = anterior = 0;
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
var btn1 = new Botao(150,300,200,70);
var btn2 = new Botao(150,400,200,70);
var btn3 = new Botao(150,500,200,70);
var btn4 = new Botao(30,590,150,20);
var input = document.createElement('input');

// --- Criando inimigos ---
for(var e = 0; e < quantInimigos; e++)
{
  var enemy = new Sprite();
  enemy.ix = getRandomIntInclusive(20, 480);
  enemy.iy = getRandomIntInclusive(-1000, -200);
  spritesInimigos.push(enemy);
}

// --- Criando Vida ---
var life = new Sprite();
life.ix = getRandomIntInclusive(20, 480);
life.iy = getRandomIntInclusive(-10000, -5000);
vida.push(life);

//  --- Criando tiro especial ---
var tiroE = new Sprite();
life.ix = getRandomIntInclusive(20, 480);
life.iy = getRandomIntInclusive(-10000, -5000);
tiroEspecial.push(tiroE);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function passo(t)
{
  dt = (t - anterior)/1000;
  if(estado == "menu"){
    telaTitle();
    return;
  }else if(estado == "jogo"){
    telaJogo();
    //return;
  }else if(estado == "fim"){
    ctx.fillStyle = "red";
    ctx.font = "Bold 70px Arial";
    ctx.fillText("FIM DE JOGO", 15, 225);
    input.type = 'text';
    input.id ='nome';
    input.placeholder ='Digite seu nome';
    input.style.position = 'absolute';
    input.style.font ='18px arial';
    input.style.left = '550px';
    input.style.top = '325px';
    document.body.appendChild(input);
    input.focus();
    return;
  }else if(estado == "info"){
    telaSobre();
    return;
  }else if (estado == "rank") {
    telaRank();
    return;
  }
  if (energia <= 0) {
    estado = "fim";
    audios.play("explosao");
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

  for (var i = 0; i < tiroE.length; i++) {
    if (tiroE[i].limiteInimigos(0,0, tela.width, tela.height)) {
      tiroE[i].iy = getRandomIntInclusive(-10000, -5000);
      tiroE[i].ix = getRandomIntInclusive(20, 480);
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
      if(tiros[i].acertouTiro(spritesInimigos[j]))
      {
        spritesInimigos[j].ix = 10000;
        spritesInimigos[j].iy = 10000;
        tiros[i].x = 10000;
        tiros[i].y = 10000;
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
  //requestAnimationFrame(passo);
}
requestAnimationFrame(passo);

tela.onclick = function(e){
  var rectNav = tela.getBoundingClientRect();
  var pos = {
      x: e.clientX - rectNav.left,
      y: e.clientY - rectNav.top
  };
  if(estado == "menu"){
    if (pos.x>btn1.x && pos.x<(btn1.x+btn1.w) && pos.y>btn1.y && pos.y<(btn1.y+btn1.h)){
        telaJogo();
        estado = "jogo";
      } else if(pos.x>btn2.x && pos.x<(btn2.x+btn2.w) && pos.y>btn2.y && pos.y<(btn2.y+btn2.h)){
        telaRank();
        estado ="rank";
      } else if(pos.x>btn3.x && pos.x<(btn3.x+btn3.w) && pos.y>btn3.y && pos.y<(btn3.y+btn3.h)){
        telaSobre();
        estado ="info";
      }
  } else if (estado == "info" || estado == "rank") {
      if(pos.x>btn4.x && pos.x<(btn4.x+btn4.w) && pos.y>btn4.y && pos.y<(btn4.y+btn4.h)){
      telaTitle();
      estado ="menu";
      }
    }
}

addEventListener("keydown", function(e)
{
  switch (e.keyCode) {
    case 78:
    if(estado == "menu"){
      telaJogo();
      estado = "jogo";
    }
    break;
    case 13:
    if(estado == "fim"){
      salvarPontuacao();
      document.body.removeChild(input);
      input.value = "";
      dt = anterior = 0;
      quantInimigos = 10;
      for (var i = 0; i < spritesInimigos.length; i++) {
        spritesInimigos[i].ivy = 200;
      }

      energia = 6;
      dano = false;
      pontos = 0;
      aumentarQuant = 0;
      cadencia = 0.5;
      telaTitle();
      estado = "menu";
    }
      return;
    break;
    case 27:
    if(estado == "info"){
      telaTitle();
      estado = "menu";
    }
    break;
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
