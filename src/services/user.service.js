module.exports.UserService = injections => {
    // arrange
    const login = Login.bind(null, injections);
    const register = Register.bind(null, injections);

    // public functions
    return { login, register };

    // private functions
    async function Register({ db, bcrypt }, user) {
        try {
            const timestamp = new Date();
            const BCRYPT_SALT_ROUNDS = 10;
            const users = db.collection('users');

            const userExists = await users.
                find({ email: user.email }).
                toArray();
            if (userExists.length > 0) {
                throw new Error('User already exists');
            } else {
                // eslint-disable-next-line no-sync
                const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
                // eslint-disable-next-line no-sync
                const hashedPassword = bcrypt.hashSync(user.password, salt);
                const newUser = await users.
                    insertOne({ ...user, password: hashedPassword, createdAt: timestamp, updatedAt: timestamp });

                return newUser.ops && newUser.ops[0];
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function Login({ db, jwt, bcrypt }, email, password) {
        try {
            const users = db.collection('users');
            const user = await users.
                find({ email }).
                toArray();

            // eslint-disable-next-line no-sync
            if (user.length && bcrypt.compareSync(password, user[0].password)) {
                // 5 minutes expiration
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 300,
                    email
                });
                return { authorization: `Bearer ${token}` };
            } else {
                throw new Error(`Incorrect ${user.length ? 'Password' : 'User'} - Not Authorized`);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

};
