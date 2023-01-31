const mongoose = require("mongoose");

const User = mongoose.model("User", {
    username: { type: String, require },
    password: { type: String, require },
    createdAt: { type: String, require, default: new Date() }
});

module.exports = { User };
