function materiaDAO(connection){
	this._connection = connection
}

materiaDAO.prototype.salva = function(professor, callback){
	this._connection.query('INSERT INTO materias SET ?', professor, callback)
}

materiaDAO.prototype.atualiza = function(professor, callback){
	this._connection.query('UPDATE materias SET status = ? WHERE id = ?', [professor.status, professor.id], callback)
}

materiaDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM materias', callback)
}

materiaDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM materias WHERE id = ?', [id], callback)
}

module.exports = function(){
	return materiaDAO
}