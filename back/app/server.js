require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';


const http = require('http');
const { URL } = require('url');
const Pyramid = require('./models/Pyramid');
const cors = require('./middleware/cors');

const server = http.createServer();

server.on('request', cors(isDev ? `http://0.0.0.0:${process.env.FRONT_APP_PORT}` : process.env.CORS_LIST_ORIGINS))

server.on('request', (req, res) => {
    const { method, url, headers: { host } } = req;
    const { searchParams, pathname } = new URL(url, `http://${host}`);

    if (method === 'GET' && pathname === '/api/v1/pressure') {
        const row = parseInt(searchParams.get('row'), 10);
        const num = parseInt(searchParams.get('num'), 10);
        const pressure = Pyramid.getPressureByCoordinats(row, num);

        res.statusCode = 200;
        res.end(`${pressure}`);
        return;

    } else if (req.method !== 'OPTIONS' || !req.headers['access-control-request-method']) {
        res.statusCode = 404;
        res.end('Not Found!')
        return;
    }
})

server.listen(process.env.PORT);