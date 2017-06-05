function professorDAO(connection){
	this._connection = connection
}

professorDAO.prototype.salva = function(professor, callback){
	this._connection.query('INSERT INTO professores SET ?', professor, callback)
}

professorDAO.prototype.atualiza = function(professor, callback){
	this._connection.query(
		'UPDATE professores SET curso = ?, periodo = ?, tempo_resposta = ? WHERE id = ?',
		[professor.cruso, professor.periodo, professor.tempo_resposta, professor.id], 
		callback
	)
}

professorDAO.prototype.atualizaStatus = function(professor, callback){
	this._connection.query('UPDATE professores SET status = ? WHERE id = ?', [professor.status, professor.id], callback)
}

professorDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM professores', callback)
}

professorDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM professores WHERE id = ?', [id], callback)
}

professorDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM professores WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return professorDAO
}