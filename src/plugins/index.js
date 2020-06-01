const fp = require('fastify-plugin');
const jwt = require('fastify-jwt');
const mongodb = require('mongodb');

const authPlugin = require('./auth.plugin');
const mongoPlugin = require('./mongo.plugin');

const auth = authPlugin({ fp, jwt });
const mongo = mongoPlugin({ fp, mongodb });

module.exports = { auth, mongo };
