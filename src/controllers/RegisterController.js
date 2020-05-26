const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        try {

            const { firstName, lastName, password, email } = req.body;

            const existentUser = await User.findOne({ email });

            if (!existentUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                    firstName,
                    lastName,
                    password: hashedPassword,
                    email
                });
                return res.json(user);
            }

            return res.status(400).json({
                message: 'email/user already exist! do you want to ligin instead?'
            })

        } catch (error) {


            throw Error(`Error while registering a new user : ${error}`);

        }
    }
}