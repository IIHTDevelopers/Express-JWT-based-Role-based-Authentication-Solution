const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Default role is 'user'
});

// Method to match password with stored hash
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
