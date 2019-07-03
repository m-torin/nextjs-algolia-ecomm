const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const url = require('url');

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const nextJS = require('next');
const hpp = require('hpp');
const morgan = require('morgan');
const nocache = require('nocache');

require('dotenv').config();

const apiRoutes = require('./api');
const routes = require('./routes');

const { NODE_ENV } = process.env;
const platformHost = process.env.PLATFORM_HOST;
const port = process.env.PORT || 3001;
const dev = NODE_ENV !== 'production';

// Handle multi-process to utilize all CPU cores
if (!dev && cluster.isMaster) {
  // eslint-disable-next-line no-console
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });

  // Run our Express server
} else {
  const nextApp = nextJS({ dir: '.', dev });
  const nextHandler = routes.getRequestHandler(
    nextApp,
    ({ req, res, route, query }) => {
      nextApp.render(req, res, route.page, query);
    }
  );

  nextApp.prepare().then(() => {
    const server = express();

    if (!dev) {
      // Middleware that sets security-related HTTP response headers
      server.use(helmet());

      /**
       * TO-DO - Refactor Referrer-Policy
       */
      // Sets "Referrer-Policy: same-origin".
      // server.use(helmet.referrerPolicy({ policy: 'same-origin' }));

      /**
       * TO-DO - Refactor CSP
       *
       * Content-Security-Policy: whitelist self & some others
       * https://helmetjs.github.io/docs/csp/
       * https://csp-evaluator.withgoogle.com/
       */
      // server.use(
      //   helmet.contentSecurityPolicy()
      // );

      // Feature-Policy: notifications 'none'
      server.use(
        helmet.featurePolicy({
          features: {
            notifications: ["'none'"],
            syncXhr: ["'none'"],
          },
        })
      );

      // TO-DO - Enforce SSL & HSTS in production except on Heroku & dev machines
      // if (platformHost !== 'heroku' || platformHost !== 'local') {
      //   server.use((req, res, next) => {
      //     const proto = req.headers['x-forwarded-proto'];
      //     if (proto === 'https') {
      //       res.set({
      //         'Strict-Transport-Security': 'max-age=31557600', // one-year
      //       });
      //       return next();
      //     }
      //     res.redirect(`https://${req.headers.host}${req.url}`);
      //   });
      // }
    } else {
      // Middleware to turn off caching
      server.use(nocache());
    }

    // Standard Express optimizations
    server
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(hpp()) // protects against HTTP Parameter Pollution attacks
      .use(compression());

    // Logging, errors only
    server.use(
      morgan('dev', {
        skip: function(req, res) {
          return res.statusCode < 400;
        },
      })
    );

    // Strip trailing slash
    server.use((req, res, next) => {
      if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
      } else {
        next();
      }
    });

    // Static files
    // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
    server
      .use('/algolia', express.static('node_modules/instantsearch.css/themes'))
      .use('/semantic', express.static('semantic-ui/dist'))
      .use('/static', express.static('static'));

    // Server routing
    server.use('/api', apiRoutes).use(nextHandler);

    // Default catch-all renders Next app
    server.get('*', (req, res) => {
      if (!dev) {
        res.set({
          'Cache-Control': 'public, max-age=3600',
        });
      }
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    server.listen(port, err => {
      if (err) {
        throw err;
      }

      // eslint-disable-next-line no-console
      console.log(`Listening on http://localhost:${port}`);
    });
  });
}
