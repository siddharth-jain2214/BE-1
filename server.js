const http = require('http');

function parseFormData(request, callback) {
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    });
    request.on('end', () => {
        const formData = new URLSearchParams(body);
        const parsedData = {};
        for (const [key, value] of formData.entries()) {
            parsedData[key] = value || '';
        }
        callback(parsedData);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        parseFormData(req, (formData) => {
            console.log('Parsed Form Data:', formData);

            // Respond with a success message
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Form data received successfully' }));
        });
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is running.');
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
