/* eslint-disable no-sync */
/* eslint-disable no-undef */

const faker = require('faker');
const { UserService } = require('../src/services/user.service');


describe('USERS', function () {
    test('Should Register a User with no error', async function () {
        // Arrange
        const timestamp = Date.now();
        const email = faker.internet.email();
        const payload = { email, password: 'pass' };
        const toArray = jest.fn().mockImplementation(() => Promise.resolve([]));
        const find = jest.fn(() => ({ toArray }));
        const insertOne = jest.fn().mockResolvedValue({ ops: [{ ...payload, createdAt: timestamp, updatedAt: timestamp }] });
        const db = {
            collection: jest.fn(() => ({ insertOne, find }))
        };
        const salt = faker.random.uuid();
        const hashedPassword = faker.random.uuid();
        const bcrypt = {
            genSaltSync: jest.fn(() => salt),
            hashSync: jest.fn(() => hashedPassword)
        };
        const userService = UserService({ db, bcrypt });
        // Act
        const user = await userService.register(payload);
        // Assert
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('users');
        expect(find).toBeCalledTimes(1);
        expect(find).toHaveBeenCalledWith({ email });
        expect(await toArray()).toMatchObject([]);
        expect(bcrypt.genSaltSync).toBeCalledTimes(1);
        expect(bcrypt.genSaltSync).toHaveBeenCalledWith(10);
        expect(bcrypt.genSaltSync).toHaveReturnedWith(salt);
        expect(bcrypt.hashSync).toHaveBeenCalledWith(payload.password, salt);
        expect(bcrypt.hashSync).toHaveReturnedWith(hashedPassword);
    });

    test('Should Not Register a User because user exists', async function () {
        // Arrange
        const email = faker.internet.email();
        const payload = { email, password: 'pass' };
        const toArray = jest.fn().mockImplementation(() => Promise.resolve([{ email }]));
        const find = jest.fn(() => ({ toArray }));
        const db = {
            collection: jest.fn(() => ({ find }))
        };
        const userService = UserService({ db });

        // Act & Assert
        await expect(userService.register(payload)).rejects.toThrow('User already exists');
        expect(db.collection).toBeCalledTimes(1);
        expect(db.collection).toBeCalledWith('users');
        expect(find).toBeCalledTimes(1);
        expect(find).toHaveBeenCalledWith({ email });
        expect(await toArray()).toMatchObject([{email}]);
    });
});

