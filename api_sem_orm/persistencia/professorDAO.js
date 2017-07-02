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
	this._connection.query(
		'SELECT * FROM usuarios AS u INNER JOIN professores AS p ON u.id = p.usuarios_id',
		callback
	)
}

professorDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query(
		'SELECT * FROM usuarios AS u INNER JOIN professores AS p ON u.id = p.usuarios_id WHERE p.usuarios_id = ?', [id],
		callback
	)
}

professorDAO.prototype.buscaPorIdDoUsuario = function(id, callback){
	this._connection.query('SELECT * FROM professores WHERE usuarios_id = ?', [id], callback)
}

module.exports = function(){
	return professorDAO
}