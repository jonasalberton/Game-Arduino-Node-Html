var SOM_TIRO = new Audio();
SOM_TIRO.src = 'sons/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Nave(context, teclado, imagem, x, y, velocidade, imgExplosao) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.animador = {};
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;

    this.vidas = 3;
    this.acabaramAsVidas = null;
    this.imgExplosao = imgExplosao;

    this.spriteSheet = new Spritesheet(context, imagem, 3, 2);
    this.spriteSheet.linha = 0;
    this.spriteSheet.intervalo = 100;
    this.ativarTiro = true;
}
Nave.prototype = {
    atualizar: function() {
        var vm = this;
        var incremento = this.velocidade * this.animador.decorrido / 1000;
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= incremento;
        }
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36) {
            this.x += incremento;
        }
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
            this.y -= incremento;
        }
        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48) {
            this.y += incremento;
        }
        this.teclado.disparou(ESPACO, function() {
            vm.atirar();
        });

    },
    desenhar: function() {

        if (this.teclado.pressionada(SETA_ESQUERDA)) {
            this.spriteSheet.linha = 1;
        } else if (this.teclado.pressionada(SETA_DIREITA)) {
            this.spriteSheet.linha = 2;
        } else
            this.spriteSheet.linha = 0;

        this.spriteSheet.desenhar(this.x, this.y);
        this.spriteSheet.proximoQuadro();
    },
    atirar: function() {
        if (this.ativarTiro) {
            SOM_TIRO.currentTime = 0.0;
            SOM_TIRO.play();
            var tiro = new Tiro(this.context, this, 'blue');
            this.animador.novoSprite(tiro);
            this.colisor.novoSprite(tiro);
        }
    },
    retangulosColisao: function() {
        return [{
            x: this.x,
            y: this.y + 18,
            largura: 15,
            altura: 14
        }, {
            x: this.x + 20,
            y: this.y + 18,
            largura: 15,
            altura: 14
        }, {
            x: this.x + 15,
            y: this.y,
            largura: 5,
            altura: 48
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
        if (sprite instanceof Ovni) {
            this.animador.excluirSprite(this);
            this.animador.excluirSprite(sprite);
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(sprite);

            var exp1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            var exp2 = new Explosao(this.context, this.imgExplosao, sprite.x, sprite.y);

            this.animador.novoSprite(exp1);
            this.animador.novoSprite(exp2);

            var nave = this;
            exp1.fimDaExplosao = function() {
                nave.vidas--;
                if (nave.vidas === 0) {
                    if (nave.acabaramAsVidas)
                        nave.acabaramAsVidas();
                } else {
                    nave.colisor.novoSprite(nave);
                    nave.animador.novoSprite(nave);

                    nave.posicionar();
                }
            }
        }
    },
    posicionar: function() {
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 18;
        this.y = canvas.height - 48;
    }
};