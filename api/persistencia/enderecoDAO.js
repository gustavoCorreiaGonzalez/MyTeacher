function enderecoDAO(connection){
	this._connection = connection
}

enderecoDAO.prototype.salva = function(enderecos, callback){
	for(var i=0; i< enderecos.length; i++)
		this._connection.query('INSERT INTO enderecos SET ?', enderecos[i], callback)
}

enderecoDAO.prototype.atualiza = function(endereco, id, callback){
	this._connection.query(
		'UPDATE enderecos SET rua = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, cep = ?, complemento = ? WHERE id = ?',
		[endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep, endereco.complemento, id], 
		callback
	)
}

enderecoDAO.prototype.atualizaStatus = function(endereco, callback){
	this._connection.query('UPDATE enderecos SET status = ? WHERE id = ?', [endereco.status, endereco.id], callback)
}

enderecoDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM enderecos WHERE status != "DELETADO"', callback)
}

enderecoDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM enderecos WHERE id = ?', [id], callback)
}

enderecoDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM enderecos WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return enderecoDAO
}