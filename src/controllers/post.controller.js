const mongodb = require('mongodb');
const { PostService } = require("../services/post.service");

module.exports.list = async function (req, res) {
    const postService = PostService({ db: this.mongodb, process, user: req.user });
    res.status(200).send(await postService.list(req.query.post));
};

module.exports.create = async function (req, res) {
    const postService = PostService({ db: this.mongodb, process, user: req.user });
    res.status(200).send(await postService.create({ ...req.body, status: req.query.status }));
};

module.exports.erase = async function (req, res) {
    const postService = PostService({ db: this.mongodb, mongodb, process, user: req.user });
    res.status(200).send(await postService.erase(req.params.id));
};
