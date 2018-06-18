function Bola(context, x, y, r, cor){
	this.context = context;
	this.x = x;
	this.y = y;
	this.r = r;
	this.cor = cor;
	this.vx = 3;
	this.vy = 2;
}
Bola.prototype = {
	atualizar: function(){
		var vm = this;
		var largura = this.context.canvas.width;
		var altura = this.context.canvas.height;
		if(vm.x < vm.r || vm.x > largura-vm.r){
			vm.vx *= -1;
		}
		if(vm.y < vm.r || vm.y > altura-vm.r){
			vm.vy *= -1;	
		}
		vm.x += vm.vx;
		vm.y += vm.vy;
	},
	desenhar: function(){
		var ctx = this.context;
		var vm = this;
		ctx.save();
		ctx.fillStyle = this.cor;
		ctx.beginPath();
		ctx.arc(vm.x, vm.y, vm.r,0, 2*Math.PI, false);
		ctx.fill();
		ctx.restore();
	},
	retangulosColisao: function(){
		var vm = this;
		console.log(vm.x);
		return [
			{
				x: vm.x - vm.r,
				y: vm.y - vm.r,
				largura: vm.r*2,
				altura: vm.r*2
			}
		];
	},
	colidiuCom: function(sprite){
		this.vx *= -1;
		this.vy *= -1;
	}
};