module.exports = function(app) {
	
	app.get('/api/clientes', function(req, res) {

		var connection = app.persistencia.connectionFactory()
		var clienteDAO = new app.persistencia.clienteDAO(connection)

		clienteDAO.lista(function(erro, resultado) {
			if (erro) {
				console.log('Erro ao consultar no banco: ' + erro)
				res.status(500).send(erro)
				return
			}

 			if (resultado.length == 0) {
				console.log('Nenhum cliente')
				res.status(204).json()
			} else {			
				res.status(200).json(resultado)
			}
		})
	})

	app.get('/api/clientes/:id', function(req, res) {

		var id = req.params.id

		console.log('Consultando cliente: ' + id)

		var memcachedClient = app.servicos.memcachedClient()

		memcachedClient.get('usuario-' + id, function(erro, retorno) {
			if (erro || !retorno) {
				console.log('MISS - chave não encontrada')

				var connection = app.persistencia.connectionFactory()
				var clienteDAO = new app.persistencia.clienteDAO(connection)	

				clienteDAO.buscaPorIdDoUsuario(id, function(erro, resultado) {
					if (erro) {
						console.log('Erro ao consultar no banco: ' + erro)
						res.status(500).send(erro)
						return
					}

					if (resultado.length == 0) {
						console.log('Nenhum cliente encontrado com o id: ' + id)
						res.status(204).json()
					} else {
						console.log('Cliente encontrado: ' + JSON.stringify(resultado[0]))
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

	app.delete('/api/status/clientes/:id', function(req, res) {

		var id = req.params.id
		var cliente = {}

		cliente.id = id
		cliente.status = 'DELETADO'

		var connection = app.persistencia.connectionFactory()
		var clienteDAO = new app.persistencia.clienteDAO(connection)

		clienteDAO.atualizaStatus(cliente, function(erro) {
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Cliente Deletado!')
			res.status(204).send(cliente)
		})
	})

	app.put('/api/status/clientes/:id', function(req, res) {

		var id = req.params.id
		var cliente = {}

		cliente.id = id
		cliente.status = 'ATIVO'

		var connection = app.persistencia.connectionFactory()
		var clienteDAO = new app.persistencia.clienteDAO(connection)

		clienteDAO.atualizaStatus(cliente, function(erro) {
			if (erro) {
				res.status(500).send(erro)
				return
			} 
			
			console.log('Cliente Atualizado!')
			res.send(cliente)
		})
	})

	app.put('/api/usuario/clientes/:id', function(req, res) {

		var id = req.params.id
		var connection = app.persistencia.connectionFactory()
		var usuarioDAO = new app.persistencia.usuarioDAO(connection)
		var usuario = req.body['usuario']

		usuarioDAO.atualiza(usuario, id, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			}

			return res.status(200).json({mensagem: 'Atualizado com sucesso'})
		})
	})

	app.put('/api/endereco/clientes/:id', function(req, res) {

		var id = req.params.id
		var connection = app.persistencia.connectionFactory()
		var enderecoDAO = new app.persistencia.enderecoDAO(connection)
		var endereco = req.body['endereco']

		enderecoDAO.atualiza(endereco, id, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			}

			return res.status(200).json({mensagem: 'Atualizado com sucesso'})
		})
	})

	app.put('/api/documento/clientes/:id', function(req, res) {
		
		var id = req.params.id
		var connection = app.persistencia.connectionFactory()
		var documentoDAO = new app.persistencia.documentoDAO(connection)
		var documento = req.body['documento']

		documentoDAO.atualiza(documento, id, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			}

			return res.status(200).json({mensagem: 'Atualizado com sucesso'})
		})
	})

	app.put('/api/contabancaria/clientes/:id', function(req, res) {
		
		var id = req.params.id
		var connection = app.persistencia.connectionFactory()
		var contaBancariaDAO = new app.persistencia.contaBancariaDAO(connection)
		var contas_bancarias = req.body['conta_bancaria']

		contaBancariaDAO.atualiza(contas_bancarias, id, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			}

			return res.status(200).json({mensagem: 'Atualizado com sucesso'})
		})
	})

	app.put('/api/contato/clientes/:id', function(req, res) {

		var id = req.params.id
		var connection = app.persistencia.connectionFactory()
		var contatoDAO = new app.persistencia.contatoDAO(connection)
		var contato = req.body['contato']

		contatoDAO.atualiza(contato, id, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			}

			return res.status(200).json({mensagem: 'Atualizado com sucesso'})
		})
	})

	app.put('/api/dependente/clientes/:id', function(req, res) {

		var id = req.params.id
		var connection = app.persistencia.connectionFactory()
		var dependenteDAO = new app.persistencia.dependenteDAO(connection)
		var dependente = req.body['dependente']

		dependenteDAO.atualiza(dependente, id, function(erro){
			if (erro) {
				res.status(500).send(erro)
				return
			}

			return res.status(200).json({mensagem: 'Atualizado com sucesso'})
		})
	})

	app.post('/api/clientes', function(req, res) {

		// campos do usuário
		req.assert("usuario.nome", "Nome do cliente eh obrigatorio").notEmpty()
		req.assert("usuario.email", "Email eh obrigatorio").notEmpty()
		req.assert("usuario.senha", "Senha eh obrigatorio").notEmpty()
		req.assert("usuario.data_nascimento", "Data de Nascimento eh obrigatorio").notEmpty()
		req.assert("usuario.sexo", "Sexo eh obrigatorio").notEmpty()

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

		usuarioDAO.salva(usuario, function(erro, resultadoUsuario) {
			if (erro) {
				console.log('erro ao inserir o usuário no banco: '+ erro)
				res.status(500).send(erro)
				return
			} else {
				console.log('Usuário criado!')

				usuario.id = resultadoUsuario.insertId

				var cliente = req.body['cliente']
				cliente.usuarios_id = usuario.id

				console.log('Processando uma requisicao de um novo cliente')

				var memcachedClient = app.servicos.memcachedClient()

				memcachedClient.set('usuario-' + usuario.id, usuario, 60000, function(erro) {
					if (erro) {
						console.log('Erro ao adicionar na cache')
						res.status(500).send(erro)
						return
					}

					console.log('Nova chave adicionado ao cache: usuario-' + usuario.id)
				})

				var connection = app.persistencia.connectionFactory()
				var clienteDAO = new app.persistencia.clienteDAO(connection)

				clienteDAO.salva(cliente, function(erro, resultadoCliente) {
					if (erro) {
						console.log('erro ao inserir o cliente no banco: '+ erro)
						res.status(500).send(erro)
						return
					} else {
						console.log('cliente criado!')

						cliente.id = resultadoCliente.insertId

						var dependentes = req.body['dependentes']

						for(var i=0; i< dependentes.length; i++){
							dependentes[i].clientes_id = cliente.id
							dependentes[i].status = 'ATIVO'
						}

						var connection = app.persistencia.connectionFactory()
						var dependenteDAO = new app.persistencia.dependenteDAO(connection)

						dependenteDAO.salva(dependentes, function(erro, resultadoDependente) {
							if (erro) {
								console.log('erro ao inserir o(s) dependente(s) no banco: '+ erro)
								res.status(500).send(erro)
								return
							} else {
								console.log('Dependente(s) criado(s)!')						
							}
						})
					}
				})

				var documento = req.body['documento']
				documento.usuarios_id = usuario.id
				documento.status = 'ATIVO'
				
				var documentoDAO = new app.persistencia.documentoDAO(connection)

				documentoDAO.salva(documento, function(erro, resultadoDocumento) {
					if (erro) {
						console.log('erro ao inserir o documento no banco: '+ erro)
						res.status(500).send(erro)
						return
					} else {
						console.log('Documento criado!')
					}
				})
				
				var enderecos = req.body['enderecos']

				for(var i=0; i< enderecos.length; i++){
					enderecos[i].usuarios_id = usuario.id
					enderecos[i].status = 'ATIVO'
				}

				var enderecoDAO = new app.persistencia.enderecoDAO(connection)

				enderecoDAO.salva(enderecos, function(erro, resultadoEndereco) {
					if (erro) {
						console.log('erro ao inserir o endereço no banco: '+ erro)
						res.status(500).send(erro)
						return
					} else {
						console.log('Endereço criado!')
					}
				})
				
				var contas_bancarias = req.body['contas_bancarias']

				for(var i=0; i< contas_bancarias.length; i++){
					contas_bancarias[i].usuarios_id = usuario.id
					contas_bancarias[i].status = 'ATIVO'
				}

				var contaBancariaDAO = new app.persistencia.contaBancariaDAO(connection)

				contaBancariaDAO.salva(contas_bancarias, function(erro, resultadoContabancaria) {
					if (erro) {
						console.log('erro ao inserir a conta bancária no banco: '+ erro)
						res.status(500).send(erro)
						return
					} else {
						console.log('Conta bancária criada!')
					}
				})

				var contato = req.body['contato']
				contato.usuarios_id = usuario.id
				contato.status = 'ATIVO'

				var contatoDAO = new app.persistencia.contatoDAO(connection)

				contatoDAO.salva(contato, function(erro, resultadoContato) {
					if (erro) {
						console.log('erro ao inserir o contato no banco: '+ erro)
						res.status(500).send(erro)
						return
					} else {
						console.log('Contato criado!')
					}
				})
				
				res.location('/clientes/cliente/' + usuario.id)

				var response = {
					dados_do_cliente: cliente,
					links: [
						{
							href:"http://localhost:3000/clientes/cliente/" + usuario.id,
							rel:"ativar",
							method:"PUT"
						},
						{
							href:"http://localhost:3000/clientes/cliente/" + usuario.id,
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