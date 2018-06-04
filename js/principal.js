var tela = document.querySelector("#canvas");
var ctx = tela.getContext('2d');
ctx.fillStyle = "grey";
ctx.fillRect(0, 0, tela.width, tela.height)

//  --- Sprites ---
var sprite = new Sprite();
var spritesInimigos = [];

//  --- Imagens ---
var imagens = new ImageLibrary();
imagens.load("naveP", "imagens/naveP.png");

//  --- Desenha nave ---
sprite.desenhar(ctx, imagens.images["naveP"]);
