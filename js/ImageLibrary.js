function ImageLibrary() {
  this.images = {};
  this.loaded = 0;
  this.size = 0;
}

ImageLibrary.prototype.load = function (key,url) {
  var img = new Image();
  this.images[key] = img;
  this.size++;
  var that = this;
  img.addEventListener('load', function () {
    that.loaded++;
  })
  img.src = url;
};

ImageLibrary.prototype.draw = function (ctx,key,x,y) {
  ctx.drawImage(this.images[key],x,y);
};
