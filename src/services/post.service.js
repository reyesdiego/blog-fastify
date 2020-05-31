
module.exports.PostService = injections => {

    const create = Create.bind(null, injections);
    const list = List.bind(null, injections);
    const erase = Erase.bind(null, injections);

    return { create, list, erase };

    // private functions
    async function Create({ db }, payload) {
        try {
            const timestamp = new Date();
            const post = db.collection('posts');
            const postInserted = await post.insertOne({ ...payload, createdAt: timestamp, updatedAt: timestamp });
            return postInserted.ops[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function List({ db }, payload) {
        try {
            const post = db.collection('posts');
            return await post.find(payload).toArray();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function Erase({ db, mongodb }, id) {
        try {
            const post = db.collection('posts');
            const deleted = await post.deleteOne({ _id: mongodb.ObjectID(id) });
            return { deleted: deleted.deletedCount};
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
