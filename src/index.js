const swStats = require('swagger-stats');
const envSchema = require('env-schema');
const path = require('path');
const env = require('./config/environment');
// Environment variables.
env({ envSchema, path });

// Plugins
const plugins = require('./plugins');

const fastify = require('fastify')({
    logger: true
});

// Register Swagger
const swaggerConfig = require('./config/swagger');
fastify.register(require('fastify-swagger'), swaggerConfig);
fastify.register(swStats.getFastifyPlugin, { swaggerSpec: swaggerConfig });

async function start() {
    try {
        fastify.
            register(plugins.auth).
            register(require('fastify-helmet')).
            register(require('fastify-cors'), {}).
            register(require('fastify-compress'), { global: false }).
            register(plugins.mongo, {
                url: process.env.MONGO_URL,
                useUnifiedTopology: true
            }).
            register(require('./routes/server.route')).
            register(require('./routes/post.route'), { prefix: '/post' }).
            register(require('./routes/user.route'), { prefix: '/users' });

        await fastify.
            listen(process.env.PORT, '::').
            catch(err => {
                fastify.log.error('Error starting server:', err);
                process.exit(1);
            });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
    fastify.log.warn('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm() {
    fastify.log.warn('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown();
});

// shut down server
function shutdown() {
    fastify.close(function onServerClosed(err) {
        if (err) {
            fastify.log.error(err);
            process.exitCode = 1;
        }
        process.exit();
    });
}

start();
