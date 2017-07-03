function materiaDAO(connection){
	this._connection = connection
}

materiaDAO.prototype.salva = function(materias, callback){
	for(var i=0; i< materias.length; i++)
		this._connection.query('INSERT INTO materias SET ?', materias[i], callback)
}

materiaDAO.prototype.atualiza = function(materias, id, callback){
	this._connection.query(
		'UPDATE materias SET nome = ?, area = ? WHERE id = ?',
		[materia[i].nome, materia[i].area, id], 
		callback
	)
}

materiaDAO.prototype.atualizaStatus = function(materia, callback){
	this._connection.query('UPDATE materias SET status = ? WHERE professores_id = ?', [materia.status, materia.id], callback)
}

materiaDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM materias WHERE status != "DELETADO"', callback)
}

materiaDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM materias WHERE id = ?', [id], callback)
}

materiaDAO.prototype.buscaPorIdDoProfessor = function(id, callback){
	this._connection.query('SELECT * FROM materias WHERE professores_id = ?', [id], callback)
}

module.exports = function(){
	return materiaDAO
}