const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/posts/:slug', (req, res) => {
    return app.render(req, res, '/post', { slug: req.params.slug });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
