const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number, required: true },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    pass: { type: String, required: true },
    email: { type: String, required: true }
}, {
    timestamps: true,
});

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'id', startAt: 1 });
const User = mongoose.model('User', userSchema);

module.exports = User;
