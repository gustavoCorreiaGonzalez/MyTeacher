function clienteDAO(connection){
	this._connection = connection
}

clienteDAO.prototype.salva = function(cliente, callback){
	this._connection.query('INSERT INTO clientes SET ?', cliente, callback)
}

clienteDAO.prototype.atualiza = function(cliente, callback){
	this._connection.query(
		'UPDATE clientes SET curso = ?, periodo = ?, tempo_resposta = ? WHERE id = ?',
		[cliente.cruso, cliente.periodo, cliente.tempo_resposta, cliente.id], 
		callback
	)
}

clienteDAO.prototype.atualizaStatus = function(cliente, callback){
	this._connection.query('UPDATE clientes SET status = ? WHERE id = ?', [cliente.status, cliente.id], callback)
}

clienteDAO.prototype.lista = function(callback){
	this._connection.query(
		'SELECT * FROM usuarios AS u INNER JOIN clientes AS c ON u.id = c.usuarios_id',
		callback
	)
}

clienteDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query(
		'SELECT * FROM usuarios AS u INNER JOIN clientes AS c ON u.id = c.usuarios_id WHERE c.usuarios_id = ?', [id],
		callback
	)
}

clienteDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM clientes WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return clienteDAO
}