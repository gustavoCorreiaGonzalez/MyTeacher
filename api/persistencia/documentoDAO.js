function documentoDAO(connection){
	this._connection = connection
}

documentoDAO.prototype.salva = function(documento, callback){
	this._connection.query('INSERT INTO documentos SET ?', documento, callback)
}

documentoDAO.prototype.atualiza = function(documento, callback){
	this._connection.query(
		'UPDATE documentos SET rg = ?, orgao_emissor = ?, cpf = ? WHERE id = ?',
		[documento.nome, documento.orgao_emissor, documento.cpf, documento.id],
		callback
	)
}

documentoDAO.prototype.atualizaStatus = function(materia, callback){
	this._connection.query('UPDATE documentos SET status = ? WHERE id = ?', documento.status, callback)
}

documentoDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM documentos', callback)
}

documentoDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM documentos WHERE id = ?', [id], callback)
}

documentoDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM documentos WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return documentoDAO
}