var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var SETA_CIMA = 38;
var SETA_BAIXO = 40;
var ESPACO = 32;
var ENTER = 13;

function Teclado(elemento) {
    var vm = this;
    vm.elemento = elemento;
    vm.pressionadas = [];
    vm.disparadas = [];
    vm.funcoesDisparo = [];

    window.addEventListener('keydown', function(evento) {
        var tecla = evento.keyCode;
        vm.pressionadas[tecla] = true;

        if (vm.funcoesDisparo[tecla] && !vm.disparadas[tecla]) {
            vm.disparadas[tecla] = true;
            vm.funcoesDisparo[tecla]();
        }
    });

    window.addEventListener('keyup', function(evento) {
        var tecla = evento.keyCode;
        vm.pressionadas[tecla] = false;
        vm.disparadas[tecla] = false;
    });
}
Teclado.prototype = {
    pressionada: function(tecla) {
        return this.pressionadas[tecla];
    },
    disparou: function(tecla, callback) {
        this.funcoesDisparo[tecla] = callback;
    }
};