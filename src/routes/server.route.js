const routes = [
    {
        method: 'GET',
        url: '/',
        schema: {
            summary: 'Endpoint to check availability of service',
            description: 'Test server',
            tags: ['Server'],
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        hi: { type: 'string' }
                    },
                    example: {
                        hi: 'there'
                    }
                }
            }
        },
        handler: async function () {
            return { hi: 'there' };
        }
    }
];

module.exports = async function (fastify) {
    routes.forEach(route => {
        fastify.route(route);
    });
};
