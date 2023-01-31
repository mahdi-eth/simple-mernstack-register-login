const bcrypt = require("bcrypt");
const { User } = require("../../model/user");

const userRegistritionController = async (req, res) => {
    const username = req.body.username;
    const unhashedPassword = req.body.password;
    const confirmation = req.body.confirmation;

    if (!username)
        return res.status(400).json({ message: "Username is required!" });
    if (!unhashedPassword)
        return res.status(400).json({ message: "Password is required!" });
    if (unhashedPassword != confirmation)
        return res.status(400).json({ message: "Confirmation is invalid!" });

    const isUserDuplicated = await User.findOne({ username });
    if (isUserDuplicated)
        return res.status(400).json({ message: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(unhashedPassword, salt);

    const user = new User({ username, password });
    user.save().then(() => console.log("Saved to db!"));

    res.status(201).json({ message: "User registered successfuly!" });
};

module.exports = {
    userRegistritionController
};
