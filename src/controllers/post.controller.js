const mongodb = require('mongodb');
const { PostService } = require("../services/post.service");

module.exports.list = async function (req, res) {
    const postService = PostService({ db: this.mongo.db, process });
    res.status(200).send(await postService.list());
};

module.exports.create = async function (req, res) {
    const postService = PostService({ db: this.mongo.db, process });
    res.status(200).send(await postService.create(req.body));
};

module.exports.erase = async function (req, res) {
    const postService = PostService({ db: this.mongo.db, mongodb, process });
    res.status(200).send(await postService.erase(req.params.id));
};
