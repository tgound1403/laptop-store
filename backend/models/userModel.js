const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: Number,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
    },
    { timestamp: true },
);

//* [GET]: get user
userSchema.statics.getUser = async function (_id) {
    const user = await this.findById({ _id });
    return user;
};

userSchema.statics.getAllUser = async function () {
    const user = await this.find({});
    return user;
};

//* [POST]: signup user
userSchema.statics.signup = async function (username, password, phoneNumber, email) {
    if (!username || !password || !phoneNumber || !email) {
        throw Error('All field must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email invalid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    //check if email is already exist or not
    const exist = await this.findOne({ email });
    if (exist) {
        throw Error('Email is already in used');
    }

    //encrypted password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //save user to database
    const user = await this.create({
        username,
        password: hash,
        phoneNumber,
        email,
    });
    console.log(user);
    return user;
};

//* [POST]: login user
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error('All field must be filled');
    }

    //check if username is correct or not
    const user = await this.findOne({ username });
    if (!user) {
        throw Error('Incorrect username');
    }

    //check if password is correct or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Incorrect password');
    }

    return user;
};

//* [PUT]: update user account according to user ID
userSchema.statics.updateUserAccount = async function (_id, username, password, phoneNumber, email) {
    if (!password) throw Error('Please enter your current password to confirm changes');
    if (!validator.isEmail(email)) throw Error('Email invalid');

    //check if password user input is correct or not
    const user = await this.findById({ _id });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Incorrect password!');

    //update user account
    await this.findByIdAndUpdate({ _id }, { username, phoneNumber, email });
    //* return user with new account
    const data = await this.findById({ _id });
    return data;
};

//* [DELETE]: remove a specific user
userSchema.statics.removeUser = async function (id) {
    if (!id) throw Error('Please enter account ID');
    const data = this.findByIdAndRemove(id);
    return data;
};

module.exports = mongoose.model('User', userSchema);
