module.exports = ({ envSchema, path }) => {
    const root = path.join(__dirname, '..', '..');
    const schema = {
        required: ['PORT', 'MONGO_URL']
    };
    envSchema({
        schema: schema,
        dotenv: { path: `${root}/${process.env.NODE_ENV === 'production' ? '.env' : '.env.development'}` }
    });
};
