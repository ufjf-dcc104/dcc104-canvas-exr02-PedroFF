AudioLibrary = function(){
this.MAX_CANAIS = 10;
this.audios = {};
this.canais = [];
this.loaded = 0;
this.size = 0;
for (var i = 0; i < this.MAX_CANAIS; i++) {
  this.canais[i] = {
    audio: new Audio(),
    fim: -1
  }
}
};

AudioLibrary.prototype.load = function (key, url){
this.audios[key] = new Audio();
  this.size++;
  this.audios[key].src = url;
  that = this;
  this.audios[key].addEventListener('canplaythrough',function(){
    that.loaded++;
  })
this.audios[key].load();
}

AudioLibrary.prototype.play = function (key){
var agora = new Date();
for (var i = 0; i < this.canais.length; i++) {
  var canal = this.canais[i];
  if(canal.fim < agora.getTime()){
    canal.audio.src = this.audios[key].src;
    canal.fim = this.audios[key].duration*1000+agora.getTime();
    canal.audio.play();
    break;
  }
}
}
