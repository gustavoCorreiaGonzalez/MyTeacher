function dependenteDAO(connection){
	this._connection = connection
}

dependenteDAO.prototype.salva = function(dependentes, callback){
	for(var i=0; i< dependentes.length; i++)
		this._connection.query('INSERT INTO dependentes SET ?', dependentes[i], callback)
}

dependenteDAO.prototype.atualiza = function(dependente, callback){
	this._connection.query(
		'UPDATE dependentes SET nome = ?, area = ? WHERE id = ?',
		[dependente.nome, dependente.area, dependente.id], 
		callback
	)
}

dependenteDAO.prototype.atualizaStatus = function(dependente, callback){
	this._connection.query('UPDATE dependentes SET status = ? WHERE id = ?', dependente.status, callback)
}

dependenteDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM dependentes', callback)
}

dependenteDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM dependentes WHERE id = ?', [id], callback)
}

dependenteDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM dependentes WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return dependenteDAO
}