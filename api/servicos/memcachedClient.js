var memcached = require('memcached')

module.exports = function() {
	return createMemcachedClient
}

function createMemcachedClient() {
	// cria um cliente do memcached apenas instânciando a variável, só passar o local aonde 
	// ele vai rodar

	var cliente = new memcached('localhost:11211', {
		retries: 10,
		retry: 10000,
		remove: true
	})

	return cliente
}