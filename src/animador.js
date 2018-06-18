function Animador(context) {
    this.context = context;
    this.ligado = false;
    this.sprites = [];
    this.spriteExcluir = [];
    this.processamentos = [];
    this.processamentosExcluir = [];
    this.ultimoCiclo = 0;
    this.decorrido = 0;
}
Animador.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.animador = this;
    },
    novoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        processamento.animador = this;
    },
    ligar: function() {
        this.ligado = true;
        this.ultimoCiclo = 0;
        this.proximoFrame();
    },
    desligar: function() {
        this.ligado = false;
    },
    proximoFrame: function() {
        if (!this.ligado) {
            return;
        }
        var agora = new Date().getTime();
        if (this.ultimoCiclo === 0)
            this.ultimoCiclo = agora;
        this.decorrido = agora - this.ultimoCiclo;

        var vm = this;
        var i = 0;
        var quantidade = this.sprites.length;
        var quantidadeProcessos = this.processamentos.length;

        for (; i < quantidade; i++) {
            vm.sprites[i].atualizar();
        }
        for (i = 0; i < quantidade; i++) {
            vm.sprites[i].desenhar();
        }

        for (i = 0; i < quantidadeProcessos; i++) {
            vm.processamentos[i].processar();
        }

        vm.processarExclusoes();

        this.ultimoCiclo = agora;

        requestAnimationFrame(function() {
            vm.proximoFrame();
        });
    },
    limparTela: function() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    excluirSprite: function(sprite) {
        this.spriteExcluir.push(sprite);
    },
    excluirProcessamento: function(processamento) {
        this.excluirProcessamento.push(processamento);
    },
    processarExclusoes: function() {
        var novosSprites = [];
        var novosProcessamentos = [];

        var i = 0;
        var qtdSprites = this.sprites.length;
        var qtdProcessos = this.processamentos.length;

        for (; i < qtdSprites; i++) {
            if (this.spriteExcluir.indexOf(this.sprites[i]) == -1) {
                novosSprites.push(this.sprites[i]);
            }
        }
        for (i = 0; i < qtdProcessos; i++) {
            if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1) {
                novosProcessamentos.push(this.processamentos[i]);
            }
        }

        this.spriteExcluir = [];
        this.processamentosExcluir = [];

        this.sprites = novosSprites;
        this.processamentos = novosProcessamentos;
    }

};