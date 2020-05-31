
module.exports.PostService = injections => {

    const create = Create.bind(null, injections);
    const list = List.bind(null, injections);
    const erase = Erase.bind(null, injections);

    return { create, list, erase };

    // private functions
    async function Create({ db, user }, payload) {
        try {
            const timestamp = new Date();
            const post = db.collection('posts');
            const postInserted = await post.insertOne({ ...payload, createdAt: timestamp, updatedAt: timestamp, author: { email: user.email } });
            return postInserted.ops[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function List({ db, user }) {
        try {
            const post = db.collection('posts');
            return await post.find({ $or: [{ status: 'PU' }, { 'author.email': user.email, status: { $in: ['PR', 'DR'] } }] }).toArray();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function Erase({ db, mongodb, user }, id) {
        try {
            const post = db.collection('posts');
            const deleted = await post.deleteOne({ _id: mongodb.ObjectID(id), 'author.email': user.email });
            return { deleted: deleted.deletedCount };
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
