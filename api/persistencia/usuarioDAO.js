function usuarioDAO(connection){
	this._connection = connection
}

usuarioDAO.prototype.salva = function(usuario, callback){
	this._connection.query('INSERT INTO usuarios SET ?', usuario, callback)
}

usuarioDAO.prototype.atualiza = function(usuario, id, callback){
	this._connection.query(
		'UPDATE usuarios SET nome = ?, email = ?, senha = ?, data_nascimento = ?, sexo = ? WHERE id = ?', 
		[usuario.nome, usuario.email, usuario.senha, usuario.data_nascimento, usuario.sexo, id], 
		callback
	)
}

usuarioDAO.prototype.atualizaStatus = function(usuario, callback){
	this._connection.query('UPDATE usuarios SET status = ? WHERE id = ?', [usuario.status, usuario.id], callback)
}

usuarioDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM usuarios', callback)
}

usuarioDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM usuarios WHERE id = ?', [id], callback)
}

module.exports = function(){
	return usuarioDAO
}