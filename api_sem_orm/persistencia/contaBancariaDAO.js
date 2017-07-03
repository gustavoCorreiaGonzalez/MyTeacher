function contaBancariaDAO(connection){
	this._connection = connection
}

contaBancariaDAO.prototype.salva = function(contas_bancarias, callback){
	for(var i=0; i< contas_bancarias.length; i++)
		this._connection.query('INSERT INTO contas_bancarias SET ?', contas_bancarias[i], callback)
}

contaBancariaDAO.prototype.atualiza = function(conta_bancaria, id, callback){
	this._connection.query(
		'UPDATE contas_bancarias SET nome = ?, numero = ?, agencia = ?, banco = ?, codigo = ? WHERE id = ?',
		[conta_bancaria.nome, conta_bancaria.numero, conta_bancaria.agencia, conta_bancaria.banco, conta_bancaria.codigo, id], 
		callback
	)
}

contaBancariaDAO.prototype.atualizaStatus = function(conta_bancaria, callback){
	this._connection.query(
		'UPDATE contas_bancarias SET status = ? WHERE id = ?', 
		[conta_bancaria.status, conta_bancaria.id],
		callback
	)
}

contaBancariaDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM contas_bancarias WHERE status != "DELETADO"', callback)
}

contaBancariaDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM contas_bancarias WHERE id = ?', [id], callback)
}

contaBancariaDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM contas_bancarias WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return contaBancariaDAO
}