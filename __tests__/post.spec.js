/* eslint-disable no-undef */

const faker = require('faker');
const { PostService } = require('../src/services/post.service');


describe('POSTS', function () {
    test('Should Create a Post and return it with no errors', async function () {
        // Arrange
        const timestamp = Date.now();
        const payload = { post: faker.lorem.paragraph() };
        const insertOne = jest.fn(() => Promise.resolve({ ops: [{ ...payload, createdAt: timestamp, updatedAt: timestamp }] }));
        const db = {
            collection: jest.fn(() => ({ insertOne }))
        };
        const postService = PostService({ db });
        // Act
        const post = await postService.create(payload);
        // Assert
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('posts');
        expect(insertOne).toBeCalledTimes(1);
        expect(insertOne).toHaveBeenCalled();
        expect(post).toHaveProperty('createdAt', timestamp);
        expect(post).toHaveProperty('updatedAt', timestamp);
    });

    test('Should Get the List of Posts with no errors', async function () {
        // Arrange
        const result = [{ post: faker.lorem.paragraph() }];
        const toArray = jest.fn(() => Promise.resolve(result));
        const find = jest.fn(() => ({ toArray }));
        const db = {
            collection: jest.fn(() => ({ find })),
        };
        const postService = PostService({ db });
        const payload = {};
        // Act
        const posts = await postService.list(payload);
        // Assert
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('posts');
        expect(find).toBeCalledTimes(1);
        expect(find).toBeCalledWith(payload);
        expect(posts).toHaveLength(1);
    });

    test('Should Delete a Post with no errors', async function () {
        // Arrange
        const id = faker.random.uuid();
        const mongodb = {
            ObjectID: jest.fn(id => id)
        };
        const deleteOne = jest.fn(() => Promise.resolve({ deletedCount: 1 }));
        const db = {
            collection: jest.fn(() => ({ deleteOne }))
        };
        // Act
        const postService = PostService({ db, mongodb });
        const post = await postService.erase(id);
        // Assert
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('posts');
        expect(deleteOne).toBeCalledTimes(1);
        expect(deleteOne).toBeCalledWith({ _id: id });
        expect(post).toHaveProperty('deleted', 1);
    });
});
