function professorDAO(connection){
	this._connection = connection
}

professorDAO.prototype.salva = function(professor, callback){
	this._connection.query('INSERT INTO professores SET ?', professor, callback)
}

professorDAO.prototype.atualiza = function(pagamento, callback){
	this._connection.query('UPDATE professores SET status = ? WHERE id = ?', [pagamento.status, pagamento.id], callback)
}

professorDAO.prototype.lista = function(callback){
	this._connection.query('SELECT * FROM professores', callback)
}

professorDAO.prototype.buscaPorId = function(id, callback){
	this._connection.query('SELECT * FROM professores WHERE id = ?', [id], callback)
}

module.exports = function(){
	return professorDAO
}