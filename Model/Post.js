const mongoose = require('mongoose');

const UserPostSchema = new mongoose.Schema({
    ImageURL: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    LikeCount: {
        type: Number,
        default: 0
    },
    Comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        default: []
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserPost', UserPostSchema);
