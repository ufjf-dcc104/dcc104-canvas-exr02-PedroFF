function Sprite() {
  //nave principal
    this.x = 200;
    this.y = 580;
    this.w = 50;
    this.h = 50;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.cor = "#4169E1";
    this.ang = 270;
  //asteroides
   this.ix = 100;
   this.iy = 0;
   this.iw = 32;
   this.ih = 32;
   this.ivx = 0;
   this.ivy = 200;
   this.iax = 0;
   this.iay = 0;
   this.icor = "#DC143C";
   this.iang = 90;
   this.iQuant = 0;

   //vida do sprite
   this.corVida = "#00FF00";
}

Sprite.prototype.desenhar = function(ctx, key) {
  ctx.drawImage(key, this.x, this.y);
}

Sprite.prototype.desenharTiro = function(ctx, key) {
  ctx.fillStyle = this.cor;
  ctx.fillRect(this.x + 14,this.y, 5, 20);
}

Sprite.prototype.desenhaInimigo = function(ctx, key) {
  ctx.drawImage(key, this.ix, this.iy);
}

Sprite.prototype.mover = function(dt) {
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
}

Sprite.prototype.movimentarInimigos = function(dt) {
  this.iy = this.iy + this.ivy*dt;
}

Sprite.prototype.impoeLimites = function (x, y, w, h) {
  if(this.x < x)
  {
    this.x = x;
    this.vx = 0;
  }
  if(this.x + this.w > x + w)
  {
    this.x = x + w - this.h;
    this.vx = 0;
  }
  if(this.y < y)
  {
    this.y = y;
    this.vy = 0;
  }
  if(this.y + this.h > y + h)
  {
    this.y = y + h - this.h;
    this.vy = 0;
  }
}

Sprite.prototype.acertou = function (alvo)
{
  if (alvo.ix + alvo.iw < this.x + 15) return false;
  if (alvo.ix > this.x + 15 + this.w) return false;
  if (alvo.iy + alvo.ih < this.y) return false;
  if (alvo.iy > this.y + this.h) return false;

  return true;
}
