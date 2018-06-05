function Sprite() {
  //nave principal
    this.x = 200;
    this.y = 580;
    this.w = 90;
    this.h = 60;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.cor = "#4169E1";
    this.ang = 270;
  //asteroides
   this.ix = 100;
   this.iy = 10;
   this.iw = 65;
   this.ih = 40;
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
  ctx.fillRect(this.x + 50,this.y, 5, 20);
}

Sprite.prototype.desenhaInimigo = function(ctx, key) {
  ctx.drawImage(key, this.ix, this.iy);
}

Sprite.prototype.desenharVida = function(ctx, key) {
  ctx.drawImage(key, this.ix, this.iy);
}

Sprite.prototype.mover = function(dt) {
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
}

Sprite.prototype.moveInimigos = function(dt) {
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
    this.x = x + w - this.w;
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
  if (alvo.ix + alvo.iw < this.x + 50) return false;
  if (alvo.ix > this.x + 50 + this.w) return false;
  if (alvo.iy + alvo.ih < this.y) return false;
  if (alvo.iy > this.y + this.h) return false;

  return true;
}

Sprite.prototype.colidiuCom = function (alvo) {
  if (alvo.x + alvo.w < this.ix) return false;
  if (alvo.x > this.ix + this.iw) return false;
  if (alvo.y + alvo.h < this.iy) return false;
  if (alvo.y > this.iy + this.ih) return false;

  return true;

}

Sprite.prototype.limiteInimigos = function (x, y, w, h) {
  if(this.iy > h)
  {
    return true;
  }
}

Sprite.prototype.limiteTiros = function (x, y, w, h) {
  if(this.y < -100 ) return true;
}
