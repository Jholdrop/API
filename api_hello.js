const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

//Função para manipular requisições
const requesthandler = (req, res) => {
    res.statusCode = 200,
    res.setHeader('content-Type', 'application/json');

    if (req.url === '/hello' && req.method === 'GET'){
        res.end(JSON.stringify({
            message: 'ola mundo'
    }))
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            error:'Rota não encontrada'
    }))

    }
};
//criando servidor
const server = http.createServer(requesthandler);

//iniciando servidor
server.listen(port,hostname, () => {
    console.log (`servidor rodando em http>//${hostname}:${port}/`)
})