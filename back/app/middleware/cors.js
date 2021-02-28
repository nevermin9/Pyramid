module.exports = function(origin) {
    return function(req, res) {
        const { headers } = req;
        const corsHeaders = {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': headers['access-control-allow-methods'] || '*',
            'Access-Control-Request-Method': headers['access-control-request-method'] || '*',
            'Access-Control-Allow-Headers': headers['access-control-allow-headers'] || '*',
        };

        for (let header of Object.keys(corsHeaders)) {
            res.setHeader(header, corsHeaders[header]);
        }

        if (req.method === 'OPTIONS' && req.headers['access-control-request-method']) {
            res.statusCode = 204;
            res.end();
            return;
        }
    }
}