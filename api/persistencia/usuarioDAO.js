function usuarioDAO(connection){
	this._connection = connection
}

usuarioDAO.prototype.salva = function(professor, callback){
	this._connection.query('INSERT INTO usuarios SET ?', professor, callback)
}

usuarioDAO.prototype.atualiza = function(professor, callback){
	this._connection.query('UPDATE usuarios SET status = ? WHERE id = ?', [professor.status, professor.id], callback)
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