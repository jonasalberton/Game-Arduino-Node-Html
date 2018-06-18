function Painel(context, nave) {
    this.context = context;
    this.nave = nave;
    this.spritesheet = new Spritesheet(context, nave.imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.coluna = 0;
    this.pontuacao = 0;
}

Painel.prototype = {
    atualizar: function() {

    },
    desenhar: function() {
        var ctx = this.context;
        var x = 20;
        var y = 20;

        for(var i = 0; i < this.nave.vidas; i++){
        	this.spritesheet.desenhar(x, y);
        	x += 40;
        }

        // Pontuação 
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '18px sans-serif';
        ctx.fillText("Pontos: "+this.pontuacao, 200, 27);
        ctx.restore();


    }
}