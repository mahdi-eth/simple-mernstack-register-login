const bcrypt = require("bcrypt");
const { User } = require("../../model/user");

const userLoginController = async (req, res) => {
    const username = req.body.username;
    const unhashedPassword = req.body.password;

    if (!username)
        return res.status(400).json({ message: "Username is required!" });
    if (!unhashedPassword)
        return res.status(400).json({ message: "Password is required!" });

    const thisUser = await User.findOne({ username });
    if (!thisUser) return res.status(404).json({ message: "User not found!" });

    const doesPasswordsMatch = await bcrypt.compare(
        unhashedPassword,
        thisUser.password
    );

    if (!doesPasswordsMatch)
        return res.status(400).json({ message: "Something's wrong!" });

    res.status(200).json({ message: "User logged in successfuly!" });
};

module.exports = {
    userLoginController
};
