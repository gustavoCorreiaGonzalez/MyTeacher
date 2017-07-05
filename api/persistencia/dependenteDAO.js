function dependenteDAO(connection){
	this._connection = connection
}

dependenteDAO.prototype.salva = function(dependentes, callback){
	for(var i=0; i< dependentes.length; i++)
		this._connection.query('INSERT INTO dependentes SET ?', dependentes[i], callback)
}

dependenteDAO.prototype.atualiza = function(dependente, id, callback){
	this._connection.query(
		'UPDATE dependentes SET nome = ?, escola = ?, ano_letivo = ? WHERE id = ?',
		[dependente.nome, dependente.escola, dependente.ano_letivo, id], 
		callback
	)
}

dependenteDAO.prototype.atualizaStatus = function(dependente, callback){
	this._connection.query(
		'UPDATE dependentes SET status = ? WHERE clientes_id = ?', 
		[dependente.status, dependente.id], 
		callback
	)
}

dependenteDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM dependentes WHERE status != "DELETADO"', callback)
}

dependenteDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM dependentes WHERE id = ?', [id], callback)
}

dependenteDAO.prototype.buscaPorIdDoCliente = function(id, callback){
	this._connection.query('SELECT * FROM dependentes WHERE clientes_id = ?', [id], callback)
}

module.exports = function(){
	return dependenteDAO
}