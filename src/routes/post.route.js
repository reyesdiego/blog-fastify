const post = require('../controllers/post.controller');

module.exports = async function (fastify) {
    const routes = [
        {
            method: 'GET',
            url: '/',
            schema: {
                tags: ['Post'],
                summary: 'List of Posts.',
                description: 'This service returns the whole list of Posts. To access this endpoint the user must login first to get a token. <b>Use the Register and Login endpoints. With the token go to the Authorize button in this page and set the Authorization token</b>',
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string', description: 'The _id of the Post' },
                                post: { type: 'string', description: 'The body of the Post' },
                                author: { type: 'string', description: 'Author of the Post' },
                                createdAt: { type: 'string', format: 'date', description: 'Date time of the Post' }
                            }
                        },
                        example: [
                            {
                                _id: "5ed1ef8546b77c4cf6a585ed",
                                post: 'Loren Ipsun',
                                author: 'Diego Reyes',
                                createdAt: '2020-01-01'
                            }
                        ]
                    }
                }
            },
            // preValidation: [fastify.authenticate],
            handler: post.list
        },
        {
            method: 'POST',
            url: '/',
            schema: {
                tags: ['Post'],
                summary: 'Creates a new Post.',
                description: 'This service creates a new Post for an Author. . To access this endpoint the user must login first to get a token. <b>Use the Register and Login endpoints. With the token go to the Authorize button in this page and set the Authorization token</b>',
                body: {
                    type: 'object',
                    required: ['post', 'author'],
                    properties: {
                        post: {
                            type: 'string',
                            description: 'The body of the Post.'
                        },
                        author: {
                            type: 'string',
                            description: 'The Author of the Post.'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        properties: {
                            _id: { type: 'string', description: 'Id of the new Post' },
                            post: {
                                type: 'string',
                                description: 'The body of the Post.'
                            },
                            author: {
                                type: 'string',
                                description: 'The Author of the Post.'
                            },
                            createdAt: {
                                type: 'string',
                                description: 'Post Creation date',
                                format: 'timestamp'
                            },
                            updatedAt: {
                                type: 'string',
                                description: 'Post Update date',
                                format: 'timestamp'
                            }
                        },
                        example:
                        {
                            _id: "5ed1ef8546b77c4cf6a585ed",
                            post: "Loren Ipsun",
                            author: "Diego Reyes"
                        }
                    }
                }
            },
            handler: post.create
        },
        {
            method: 'DELETE',
            url: '/:id',
            schema: {
                tags: ['Post'],
                summary: 'Delete a new Post.',
                description: 'This service deletes a Post from an Author. To access this endpoint the user must login first to get a token. <b>Use the Register and Login endpoints. With the token go to the Authorize button in this page and set the Authorization token</b>',
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The ID of the Post.'
                        }
                    }
                },
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'object',
                        properties: {
                            deleted: { type: 'number', description: 'Count of Post deleted' }
                        },
                        example:
                        {
                            delete: 1
                        }
                    }
                }
            },
            handler: post.erase
        }

    ];

    routes.forEach((route) => {
        fastify.route(route);
    });
};
