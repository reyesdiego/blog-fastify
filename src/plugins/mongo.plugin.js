module.exports = ({ fp, mongodb }) => {

    const dbConnector = fp(async (fastify, ops) => {

        const MongoClient = mongodb.MongoClient;
        const url = ops.url;
        // eslint-disable-next-line prefer-reflect
        delete ops.url;

        const connection = await MongoClient.connect(url, ops);
        const database = connection.db('blog-ms');
        database.ensureIndex("posts", {
            post: "text"
        });

        fastify.decorate('mongodb', database);

    });

    return dbConnector;
};

