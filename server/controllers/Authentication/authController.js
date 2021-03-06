const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const db = req.app.get('db');
    const { username, password, img, student_access_token, admin_access_token } = req.body;

    const checkedUser = await db.get_users([username]);
    if (checkedUser.length === 0 && student_access_token === process.env.STUDENT_ACCESS_TOKEN) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await db.register_user([username, hashedPassword, img]);
        req.session.user = {
            id: user[0].id,
            username,
            img
        }
        res.status(200).json(user);
    } else if(checkedUser.length === 0 && admin_access_token === process.env.ADMIN_ACCESS_TOKEN) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await db.register_user([username, hashedPassword, img]);
        req.session.user = {
            id: user[0].id,
            username,
            img
        }
        const admin = db.update_admin(username);
        res.status(200).json(user);
    } else {
        res.status(400).json({ error: "Username Already Taken or Wrong Access Token" })
    }
    
}

const login = async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;

    const checkedUser = await db.get_users([username]);
    if (checkedUser.length === 0) {
        res.status(401).json({ error: 'Wrong Username or Password' })
    };

    const existingUser = await bcrypt.compare(password, checkedUser[0].password);
    if (existingUser) {
        req.session.user = {
            id: checkedUser[0].user_id,
            username: checkedUser[0].username,
            img: checkedUser[0].img
        };
        return res.status(200).json(req.session.user);
    } else {
        return res.status(403).json({ error: "Wrong Username or Password" })
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

module.exports = {
    register,
    login,
    logout
}