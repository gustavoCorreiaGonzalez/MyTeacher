function aulaDAO(connection){
	this._connection = connection
}

aulaDAO.prototype.salva = function(aula, callback){
	this._connection.query('INSERT INTO aulas SET ?', aula, callback)
}

aulaDAO.prototype.atualiza = function(aula, callback){
	this._connection.query(
		'UPDATE aulas SET assunto = ?, tipo = ?, data_inicio = ?, data_fim = ?, preco = ? WHERE id = ?',
		[aula.assunto, aula.tipo, aula.data_inicio, aula.data_fim, aula.preco, aula.id], 
		callback
	)
}

aulaDAO.prototype.atualizaStatus = function(aula, callback){
	this._connection.query('UPDATE aulas SET status = ? WHERE id = ?', [aula.status, aula.id], callback)
}

aulaDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM aulas WHERE status != "DELETADO"', callback)
}

aulaDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM aulas WHERE id = ?', [id], callback)
}

aulaDAO.prototype.buscaPorIdDoCliente = function(id, callback){
	this._connection.query('SELECT * FROM aulas WHERE clientes_id = ?', [id], callback)
}

aulaDAO.prototype.buscaPorIdDoProfessor = function(id, callback){
	this._connection.query('SELECT * FROM aulas WHERE professores_id = ?', [id], callback)
}

module.exports = function(){
	return aulaDAO
}