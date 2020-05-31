const mongodb = require('mongodb');
const { PostService } = require("../services/post.service");

module.exports.list = async function (req, res) {
    const postService = PostService({ db: this.mongo.db, process, user: req.user });
    res.status(200).send(await postService.list());
};

module.exports.create = async function (req, res) {
    const postService = PostService({ db: this.mongo.db, process, user: req.user });
    res.status(200).send(await postService.create(req.body));
};

module.exports.erase = async function (req, res) {
    const postService = PostService({ db: this.mongo.db, mongodb, process, user: req.user });
    res.status(200).send(await postService.erase(req.params.id));
};
