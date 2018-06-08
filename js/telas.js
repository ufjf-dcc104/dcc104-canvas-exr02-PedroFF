function telaSobre() {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, tela.width, tela.height);
  imagens.draw(ctx,"backg", 0, 0);
  ctx.font="Bold 35px Arial";
  ctx.fillText("Bem-vindo ao Space Shooter", 5, 200);
  ctx.font="18px Arial";
  ctx.fillText("O objetivo do jogo é desviar dos asteróides e destruí-los,", 10, 250);
  ctx.fillText("para isso usará as setas para o movimento lateral e a", 10, 280);
  ctx.fillText("barra de espaço para disparar os tiros.", 10, 310);
  ctx.fillText("Aperte ESC ou clique na seta, para voltar ao menu.", 10, 380);
  ctx.fillText("Bom jogo!",200, 400);
  ctx.fillRect(btn4.x,btn4.y, btn4.w, btn4.h);
  imagens.draw(ctx,"voltar", 5, 550);
  requestAnimationFrame(passo);
}

function telaRank() {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, tela.width, tela.height);
  imagens.draw(ctx,"backg", 0, 0);
  ctx.font="Bold 70px Arial";
  ctx.fillText("Rank", 150, 100);
  ordenaRank();
  var retomaPont = JSON.parse(localStorage.getItem('pontuacao'));
  if(retomaPont != null){
    ctx.font="Bold 35px Arial";
    ctx.fillText("NOME", 100, 200);
    ctx.fillText("SCORE", 280, 200);
    var j = 50
    for (var i = 0; i < retomaPont.length && i <= 5; i++) {
      ctx.fillText(1+i +". " + retomaPont[i].nome, 100, 200+j);
      ctx.fillText(retomaPont[i].pontuacao, 280, 200+j);
      j+=50;
    }
  }else{
    var pontuacao = [{"nome":"Pedro", "pontuacao":300}];
    localStorage.setItem('pontuacao', JSON.stringify(pontuacao));
    var retomaPont = JSON.parse(localStorage.getItem('pontuacao'));
    ctx.font="Bold 35px Arial";
    ctx.fillText("NOME", 100, 200);
    ctx.fillText("SCORE", 280, 200);
    var j = 50
    ctx.fillText("1. " + retomaPont[0].nome, 100, 200+j);
    ctx.fillText(retomaPont[0].pontuacao, 280, 200+j);
  }

  ctx.fillRect(btn4.x,btn4.y, btn4.w, btn4.h);
  imagens.draw(ctx,"voltar", 5, 550);
}

function telaTitle()
{

  ctx.fillStyle = "white";
  ctx.fillRect(0,0, tela.width, tela.height);
  imagens.draw(ctx,"backg", 0, 0);
  ctx.font="Bold 35px Arial";
  ctx.fillText("Bem-vindo ao Space Shooter", 5, 200);
  ctx.fillRect(btn1.x,btn1.y, btn1.w, btn1.h);
  ctx.fillRect(btn2.x,btn2.y, btn2.w, btn2.h);
  ctx.fillRect(btn3.x,btn3.y, btn3.w, btn3.h);
  imagens.draw(ctx,"enter",150, 300);
  imagens.draw(ctx,"rank", 150, 400);
  imagens.draw(ctx,"info", 150, 500);


  requestAnimationFrame(passo);
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
  requestAnimationFrame(passo);
}

// --- Funções que tratam os pontos ---

function salvarPontuacao() {
  if(localStorage){
    var retomaPont = JSON.parse(localStorage.getItem('pontuacao'));
    var nome = document.querySelector('#nome').value;
    retomaPont.push({'nome':nome , 'pontuacao': pontos});
    localStorage.setItem('pontuacao',JSON.stringify(retomaPont));
  }else{
    var pontuacao = [{"nome":"Pedro", "pontuacao":300}];
    localStorage.setItem('pontuacao', JSON.stringify(pontuacao));
  }
}

function compare(a,b) {
  if (a.pontuacao > b.pontuacao)
     return -1;
  if (a.pontuacao < b.pontuacao)
    return 1;
  return 0;
}


function ordenaRank() {
  var retomaPont = JSON.parse(localStorage.getItem('pontuacao'));
  if(retomaPont!= null && retomaPont.length >= 1){
    retomaPont.sort(compare);
    localStorage.setItem('pontuacao',retomaPont);
  }
}
