const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    completed: {
        type: Number,
        required: true,
    },
    rewardPoints: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
    },
    habits: [{
        tag: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        isCompleted: {
            type: Boolean,
            required: true,
        },
        streak: {
            type: Number,
            required: true,
        },
        reminder: {
            type: String,
            required: true,
        }
    }],
    posts: [{
        id: {
            type: String,
        }
    }]
});

userSchema.statics.findByCredentials = async (email, password) => {
    console.log(password)
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Invalid email/password')
    }
    const check = await bcrypt.compare(password, user.password)

    if (!check) {
        throw new Error('Inavlid email/passowrd')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User;