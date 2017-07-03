module.exports = function(app) {
	
	app.get('/api/aulas', function(req, res) {

		var connection = app.persistencia.connectionFactory()
		var aulaDAO = new app.persistencia.aulaDAO(connection)

		aulaDAO.lista(function(erro, resultado) {
			if (erro) {
				console.log('Erro ao consultar no banco: ' + erro)
				res.status(500).send(erro)
				return
			}

 			if (resultado.length == 0) {
				console.log('Nenhuma aula')
				res.status(204).json()
			} else {			
				res.status(200).json(resultado)
			}
		})
	})

	app.get('/api/aulas/:id', function(req, res) {

		var id = req.params.id

		console.log('Consultando aula: ' + id)

		var memcachedClient = app.servicos.memcachedClient()

		memcachedClient.get('aula-' + id, function(erro, retorno) {
			if (erro || !retorno) {
				console.log('MISS - chave não encontrada')

				var connection = app.persistencia.connectionFactory()
				var aulaDAO = new app.persistencia.aulaDAO(connection)	

				aulaDAO.buscaPorId(id, function(erro, resultado) {
					if (erro) {
						console.log('Erro ao consultar no banco: ' + erro)
						res.status(500).send(erro)
						return
					}

					if (resultado.length == 0) {
						console.log('Nenhuma aula encontrada com o id: ' + id)
						res.status(204).json()
					} else {
						console.log('Aula encontrada: ' + JSON.stringify(resultado[0]))
						res.status(200).json(resultado[0])
					}
				})
			} else {
				console.log('HIT - valor: ' + JSON.stringify(retorno))

				res.status(200).json(retorno)
				return
			}
		})
	})

	app.delete('/api/status/aulas/:id', function(req, res) {

		var id = req.params.id
		var aula = {}

		aula.id = id
		aula.status = 'CANCELADA'

		var connection = app.persistencia.connectionFactory()
		var aulaDAO = new app.persistencia.aulaDAO(connection)

		aulaDAO.atualizaStatus(aula, function(erro) {
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Aula Cancelada!')
			res.status(204).send(aula)
		})
	})

	app.put('/api/status/aulas/:id', function(req, res) {

		var id = req.params.id
		var aula = {}

		aula.id = id
		aula.status = 'CONFIRMADA'

		var connection = app.persistencia.connectionFactory()
		var aulaDAO = new app.persistencia.aulaDAO(connection)

		aulaDAO.atualizaStatus(aula, function(erro) {
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Aula Atualizada!')
			res.send(aula)
		})
	})

	app.put('/api/finaliza/aulas/:id', function(req, res) {

		var id = req.params.id
		var aula = {}

		aula.id = id
		aula.status = 'FINALIZADA'

		var connection = app.persistencia.connectionFactory()
		var aulaDAO = new app.persistencia.aulaDAO(connection)

		aulaDAO.atualizaStatus(aula, function(erro) {
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Aula Atualizada!')
			res.send(aula)
		})
	})

	app.post('/api/aulas', function(req, res) {

		// campos da aula
		req.assert("assunto", "Nome do aula eh obrigatorio").notEmpty()
		req.assert("tipo", "Tipo eh obrigatorio").notEmpty()
		req.assert("data_inicio", "Data de Inicio eh obrigatorio").notEmpty()
		req.assert("data_fim", "Data de Fim eh obrigatorio").notEmpty()
		req.assert("status", "Status eh obrigatorio").notEmpty()

		var erros = req.validationErrors()

		if (erros) {
			console.log('Erros de validação encontrados')
			res.status(400).send(erros)
			return
		}

		var aula = req.body

		aula.preco = app.servicos.calculoPreco(aula)
		aula.status = 'ESPERA'

		var connection = app.persistencia.connectionFactory()
		var aulaDAO = new app.persistencia.aulaDAO(connection)

		aulaDAO.salva(aula, function(erro, resultadoaula) {
			if (erro) {
				console.log('erro ao inserir o usuário no banco: '+ erro)
				res.status(500).send(erro)
				return
			} else {
				console.log('Usuário criado!')

				aula.id = resultadoaula.insertId

				console.log('Processando uma requisicao de uma nova aula')

				var memcachedClient = app.servicos.memcachedClient()

				memcachedClient.set('aula-' + aula.id, aula, 60000, function(erro) {
					if (erro) {
						console.log('Erro ao adicionar na cache')
						res.status(500).send(erro)
						return
					}

					console.log('Nova chave adicionado ao cache: aula-' + aula.id)
				})

				res.location('/aulas/aula/' + aula.id)

				var response = {
					dados_da_aula: aula,
					links: [
						{
							href:"http://localhost:3000/aulas/aula/" + aula.id,
							rel:"confirmada",
							method:"PUT"
						},
						{
							href:"http://localhost:3000/aulas/aula/" + aula.id,
							rel:"cancelar",
							method:"DELETE"	
						}
					]
				}

				res.status(201).json(response)
			}
		})
	})
}