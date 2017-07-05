var DateDiff = require('date-diff');

module.exports = function() {
	return calculoPreco
}

function calculoPreco(aula) {
	var data_inicio = new Date(aula['data_inicio'])
	var data_fim = new Date(aula['data_fim'])
	
	var diff = new DateDiff(data_fim, data_inicio).hours();

	var valor = diff * 30

	return valor
}