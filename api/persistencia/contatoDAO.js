function contatoDAO(connection){
	this._connection = connection
}

contatoDAO.prototype.salva = function(contato, callback){
	this._connection.query('INSERT INTO contatos SET ?', contato, callback)
}

contatoDAO.prototype.atualiza = function(contato, id, callback){
	this._connection.query(
		'UPDATE contatos SET telefone = ?, celular = ? WHERE id = ?',
		[contato.telefone, contato.celular, id],
		callback
	)
}

contatoDAO.prototype.atualizaStatus = function(materia, callback){
	this._connection.query(
		'UPDATE contatos SET status = ? WHERE usuarios_id = ?', 
		[contato.status, contato.id], 
		callback
	)
}

contatoDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM contatos WHERE status != "DELETADO"', callback)
}

contatoDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM contatos WHERE id = ?', [id], callback)
}

contatoDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM contatos WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return contatoDAO
}