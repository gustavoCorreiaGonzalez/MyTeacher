module.exports = function(app){
	
	app.get('/professores', function(req, res){

		var connection = app.persistencia.connectionFactory()
		var professorDAO = new app.persistencia.professorDAO(connection)

		professorDAO.lista(function(erro, resultado){
			if (erro) {
				console.log('Erro ao consultar no banco: ' + erro)
				res.status(500).send(erro)
				return
			}

 			res.status(200).json(resultado)
		})
	})

	app.get('/professores/professor/:id', function(req, res){

		var id = req.params.id

		console.log('Consultando professor: ' + id)

		var connection = app.persistencia.connectionFactory()
		var professorDAO = new app.persistencia.professorDAO(connection)	

		professorDAO.buscaPorId(id, function(erro, resultado){
			if (erro) {
				console.log('Erro ao consultar no banco: ' + erro)
				res.status(500).send(erro)
				return
			}

			console.log('Professor encontrado: ' + JSON.stringify(resultado))
			res.status(200).json(resultado)
		})

	})

	app.delete('/professores/professor/:id', function(req, res){

		var id = req.params.id
		var professor = {}

		professor.id = id
		professor.status = 'DELETADO'

		var connection = app.persistencia.connectionFactory()
		var professorDAO = new app.persistencia.professorDAO(connection)

		professorDAO.atualiza(professor, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Professor Deletado!')
			res.status(204).send(professor)
		})
	})

	app.put('/professores/professor/:id', function(req, res){

		var id = req.params.id
		var professor = {}

		professor.id = id
		professor.status = 'ATIVO'

		var connection = app.persistencia.connectionFactory()
		var professorDAO = new app.persistencia.professorDAO(connection)

		professorDAO.atualiza(professor, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Professor Atualizado!')
			res.send(professor)
		})
	})

	app.post('/professores/professor', function(req, res){

		// campos do usuário
		req.assert("usuario.nome", "Nome do professor eh obrigatorio").notEmpty()
		req.assert("usuario.email", "Email eh obrigatorio").notEmpty()
		req.assert("usuario.senha", "Senha eh obrigatorio").notEmpty()
		req.assert("usuario.data_nascimento", "Data de Nascimento eh obrigatorio").notEmpty()
		req.assert("usuario.sexo", "Sexo eh obrigatorio").notEmpty()
			
		// campos do professor
		req.assert("professor.curso", "Curso eh obrigatorio").notEmpty()
		req.assert("professor.periodo", "Período eh obrigatorio").notEmpty()
		req.assert("professor.tempo_resposta", "Tempo de Resposta eh obrigatorio").notEmpty()

		var erros = req.validationErrors()

		if (erros) {
			console.log('Erros de validação encontrados')
			res.status(400).send(erros)
			return
		}

		var usuario = req.body['usuario']
		usuario.status = 'ATIVO'

		var connection = app.persistencia.connectionFactory()
		var usuarioDAO = new app.persistencia.usuarioDAO(connection)

		usuarioDAO.salva(usuario, function(erro, resultadoUsuario){
			if (erro) {
				console.log('erro ao inserir o usuário no banco: '+ erro)
				res.status(500).send(erro)
				return
			} else {
				console.log('Usuário criado!')

				usuario.id = resultadoUsuario.insertId

				var professor = req.body['professor']
				professor.usuarios_id = usuario.id

				console.log('Processando uma requisicao de um novo professor')

				var connection = app.persistencia.connectionFactory()
				var professorDAO = new app.persistencia.professorDAO(connection)

				professorDAO.salva(professor, function(erro, resultadoProfessor){
					if (erro) {
						console.log('erro ao inserir o professor no banco: '+ erro)
						res.status(500).send(erro)
						return
					} else {
						console.log('Professor criado!')

						professor.id = resultadoProfessor.insertId

						var materias = req.body['materias']

						for(var i=0; i< materias.length; i++)
							materias[i].professores_id = professor.id

						var connection = app.persistencia.connectionFactory()
						var materiaDAO = new app.persistencia.materiaDAO(connection)

						materiaDAO.salva(materias, function(erro, resultadoMateria){
							if (erro) {
								console.log('erro ao inserir a matéria no banco: '+ erro)
								res.status(500).send(erro)
								return
							} else {
								console.log('Matéria criada!')						
							}
						})
					}
				})

				

				// documentos
				
				// enderecos
				
				// contas bancarias
				
				res.location('/professores/professor/' + usuario.id)

				var response = {
					dados_do_professor: professor,
					links: [
						{
							href:"http://localhost:3000/professores/professor/" + usuario.id,
							rel:"ativar",
							method:"PUT"
						},
						{
							href:"http://localhost:3000/professores/professor/" + usuario.id,
							rel:"desativar",
							method:"DELETE"	
						}
					]
				}

				res.status(201).json(response)
			}
		})		
	})
}