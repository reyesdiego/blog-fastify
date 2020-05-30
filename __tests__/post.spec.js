/* eslint-disable no-undef */

const faker = require('faker');
const { PostService } = require('../src/services/post.service');


describe('POSTS', function () {
    test('Should Create a Post and return it with no errors', function () {
        const insertOne = jest.fn(() => Promise.resolve(1));
        const db = {
            collection: jest.fn(() => {
                return {
                    insertOne
                };
            }),
        };

        const postService = PostService({ db });
        const payload = { post: faker.lorem.paragraph() };
        const post = postService.create(payload);
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('posts');
        expect(insertOne).toBeCalledTimes(1);
        expect(insertOne).toBeCalledWith(payload);
    });

    test('Should Get the List of Posts with no errors', async function () {
        const result = [{ post: faker.lorem.paragraph() }];
        const toArray = jest.fn(() => Promise.resolve(result));
        const find = jest.fn(() => ({ toArray }));
        const db = {
            collection: jest.fn(() => ({ find })),
        };

        const postService = PostService({ db });
        const payload = {};
        const posts = await postService.list(payload);
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('posts');
        expect(find).toBeCalledTimes(1);
        expect(find).toBeCalledWith(payload);
        expect(posts).toHaveLength(1);
    });

    test('Should Delete a Post with no errors', function () {
        const id = faker.random.uuid();
        const deleteOne = jest.fn(() => Promise.resolve(1));
        const db = {
            collection: jest.fn(() => {
                return {
                    deleteOne
                };
            }),
        };

        const postService = PostService({ db });
        const post = postService.erase(id);
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('posts');
        expect(deleteOne).toBeCalledTimes(1);
        expect(deleteOne).toBeCalledWith({ _id: id });
    });
});
