const user = require('../controllers/users-controller');

module.exports = async function (fastify) {
    const routes = [
        {
            method: 'POST',
            url: '/',
            schema: {
                tags: ['User'],
                summary: 'Creates a users of Stack Exchange API.',
                description: 'Creation of User for Authorization, only the email and password are need for the example',
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        createdAt: {
                            type: 'string',
                            format: 'date',
                            description: 'User database Registration Date'
                        },
                        firstname: {
                            type: 'string',
                            description: 'User First Name.'
                        },
                        lastname: {
                            type: 'string',
                            description: 'User Last Name.'
                        },
                        email: {
                            type: 'string',
                            description: 'User email account.',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            description: 'User password account.',
                            minLength: 6
                        }
                    }
                }
            },
            description: 'Returns the new User',
            handler: user.register
        },
        {
            method: 'POST',
            url: '/login',
            schema: {
                tags: ['Authorization'],
                summary: 'Login the user on Stack Exchange API.',
                description: 'Validates the user and creates an Authorization token.',
                body: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email.',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            description: 'User Password.',
                            minLength: 6
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        properties: {
                            authorization: {
                                type: 'string',
                                description: 'Bearer authentication token'
                            }
                        },
                        example: {
                            authorization: 'Beared eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkyMTE2MDcsInVzZXJfaWQiOiJlZSIsImlhdCI6MTU4OTIxMTQ4N30.UZ6x1fF72bH948PG2PfesM6oPhDtsJoRa3aWNmFs8yk'
                        }
                    },
                    400: {
                        description: 'Bad Request',
                        type: 'object',
                        properties: {
                            statusCode: { type: 'number', description: "http status code" },
                            error: { type: "string", description: 'Error name' },
                            message: { type: 'string', description: "<error message>" }
                        },
                        example: {

                            statusCode: 400,
                            error: "Bad Request",
                            message: "Error Message"

                        }
                    }
                }
            },
            handler: user.login
        }
    ];

    routes.forEach(route => {
        fastify.route(route);
    });
};
