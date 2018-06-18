var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var btnJogar = document.getElementById('link_jogar');
var imagens = [];
var animador = {};
var teclado = {};
var colisor = {};
var nuvens = {};
var estrelas = {};
var espaco = {};
var nave = {};
var inimigo = {};
var totalImagens = 0;
var imagensCarregadas = 0;
var musicaAcao = null;
var painel = null;

carregarImagens();
carregarMusicas();

function mostrarLinkJogar() {
    btnJogar.style.display = 'block';
}

function iniciarJogo() {
    criadorInimigos.ultimoOvni = new Date().getTime();
    btnJogar.style.display = 'none';
    musicaAcao.play();
    animador.ligar();
    nave.ativarTiro = true;
    painel.pontuacao = 0;
    teclado.disparou(ENTER, pausarJogo);
};


function carregarMusicas() {
    musicaAcao = new Audio();
    musicaAcao.src = "sons/musica-acao.mp3";
    musicaAcao.load();
    musicaAcao.volume = 0.5;
    musicaAcao.loop = true;
}

function carregarImagens() {
    imagens = {
        espaco: "fundo-espaco.png",
        estrelas: "fundo-estrelas.png",
        nuvens: "fundo-estrelas.png",
        nave: "nave-spritesheet.png",
        ovni: "ovni.png",
        explosao: "explosao.png"
    };

    for (var i in imagens) {
        var img = new Image();
        img.src = 'images/' + imagens[i];
        img.onload = carregando;
        imagens[i] = img;
        totalImagens++;
    }
}

function carregando() {
    context.save();
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '50px sans-serif';
    context.fillText("Carregando...", 100, 200);
    context.strokeText("Carregando", 100, 200);

    imagensCarregadas++;

    var tamanhoTotal = 300;
    var tamanho = imagensCarregadas / totalImagens * tamanhoTotal;
    context.fillStyle = 'yellow';
    context.fillRect(100, 250, tamanho, 50);
    context.restore();



    if (imagensCarregadas === totalImagens)
        iniciarObjetos();
}

function iniciarObjetos() {
    animador = new Animador(context);
    teclado = new Teclado(document);
    colisor = new Colisor();
    espaco = new Fundo(context, imagens.espaco, 60);
    estrelas = new Fundo(context, imagens.estrelas, 150);
    nuvens = new Fundo(context, imagens.nuvens, 500);
    nave = new Nave(context, teclado, imagens.nave, (canvas.width / 2 - 18), (canvas.height - 48), 250, imagens.explosao);
    painel = new Painel(context, nave);

    animador.novoSprite(espaco);
    animador.novoSprite(estrelas);
    animador.novoSprite(nuvens);
    animador.novoSprite(nave);
    animador.novoSprite(painel);

    colisor.novoSprite(nave);
    animador.novoProcessamento(colisor);
    criacaoInimigos();

    painel.pontuacao = 0;

    colisor.aoColidir = function(o1, o2) {
        if ((o1 instanceof Tiro && o2 instanceof Ovni) ||
            (o1 instanceof Ovni && o2 instanceof Tiro)) {
            painel.pontuacao += 10;
        }
    }

    mostrarLinkJogar();
    teclado.disparou(ENTER, iniciarJogo);

    nave.acabaramAsVidas = function() {
        animador.desligar();
        gameOver();
    }
    //animador.ligar();
}

function gameOver() {
    nave.ativarTiro = false;
    teclado.disparou(ENTER, null);
    musicaAcao.pause();
    musicaAcao.currentTime = 0.0;
    removerInimigos();
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);
    context.save();
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '70px sans-serif';
    context.fillText("Game Over", 40, 200);
    context.strokeText("Game Over", 40, 200);
    context.restore();

    mostrarLinkJogar();

    nave.vidas = 3;
    nave.posicionar();
    animador.novoSprite(nave);
    colisor.novoSprite(nave);

}

function removerInimigos() {
    for (var i in animador.sprites) {
        if (animador.sprites[i] instanceof Ovni) {
            animador.excluirSprite(animador.sprites[i]);
        }
    }
    for (var i in colisor.sprites) {
        if (colisor.sprites[i] instanceof Ovni) {
            colisor.excluirSprite(animador.sprites[i]);
        }
    }
}

function criacaoInimigos() {
    criadorInimigos = {
        ultimoOvni: new Date().getTime(),

        processar: function() {
            var agora = new Date().getTime();
            var decorrido = agora - this.ultimoOvni;
            if (decorrido > 1000) {
                novoOvni();
                this.ultimoOvni = agora;
            }
        }
    };

    animador.novoProcessamento(criadorInimigos);
}

function novoOvni() {
    var ovni = new Ovni(context, imagens.ovni, imagens.explosao);
    ovni.x = Math.floor(Math.random() * (context.canvas.width - imagens.ovni.width + 1));
    ovni.y = imagens.ovni.height;
    ovni.velocidade = Math.floor(Math.random() * 500) + 150;
    colisor.novoSprite(ovni);
    animador.novoSprite(ovni);
}

function pausarJogo() {
    if (animador.ligado) {
        animador.desligar();
        nave.ativarTiro = false;

        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.font = '50px sans-serif';
        context.fillText("Pausado", 160, 200);
        context.strokeText("Pausado", 160, 200);
        context.restore();

        musicaAcao.pause();
    } else {
        criadorInimigos.ultimoOvni = new Date().getTime();
        animador.ligar();
        nave.ativarTiro = true;
        musicaAcao.play();
    }
}