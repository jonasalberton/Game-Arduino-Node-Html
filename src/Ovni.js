function Ovni(context, imagem, imagemExplosao) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgExplosao = imagemExplosao;
}
Ovni.prototype = {
    atualizar: function() {
        this.y += this.velocidade * this.animador.decorrido / 1000;
        if (this.y > this.context.canvas.height) {
            this.animador.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function() {
        var ctx = this.context;
        var img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
        //this.desenharRetangulosDeColisao();
    },
    retangulosColisao: function() {
        return [{
            x: this.x,
            y: this.y + 10,
            largura: this.imagem.width,
            altura: this.imagem.height - 20
        }, {
            x: this.x + 20,
            y: this.y,
            largura: 28,
            altura: 10
        }, {
            x: this.x + 18,
            y: this.y + 22,
            largura: 28,
            altura: 10
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
        if (sprite instanceof Tiro) {
            this.animador.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animador.excluirSprite(sprite);
            this.colisor.excluirSprite(sprite);

            var explosao = new Explosao(this.context,
                this.imgExplosao, this.x, this.y);
            this.animador.novoSprite(explosao);
        }
    }
};