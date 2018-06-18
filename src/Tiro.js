function Tiro(context, nave, cor) {
    this.context = context;
    this.nave = nave;
    this.largura = 4;
    this.altura = 20;
    this.x = nave.x + 18;
    this.y = nave.y - this.altura;
    this.velocidade = 600;
    this.cor = cor;
}
Tiro.prototype = {
    atualizar: function() {
        this.y -= this.velocidade * this.animador.decorrido / 1000;
        if (this.y < 0) {
            this.animador.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function() {
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.restore();
    },
    retangulosColisao: function() {
        return [{
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura
        }];
    },
    desenharRetangulosDeColisao: function() {
        var ctx = this.context;
        ctx.save();
        ctx.strokeStyle = 'yellow';

        var retangulos = this.retangulosColisao();
        for (var j = 0, countJ = retangulos.length; j < countJ; j++) {
            var rect = retangulos[j];
            ctx.strokeRect(rect.x, rect.y, rect.largura, rect.altura);
        }

        ctx.restore();
    },
    colidiuCom: function(sprite) {

    }
};