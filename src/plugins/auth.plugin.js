module.exports = ({ fp, jwt }) => {

    const auth = fp((fastify, opts, next) => {
        fastify.register(jwt, {
            secret: 'change to secret phrase'
        });
        fastify.decorate('authenticate', async (req, res) => {
            try {
                await req.jwtVerify();
            } catch (err) {
                res.send(err);
            }
        });

        next();
    });
    return auth;
};
