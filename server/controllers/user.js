const jwt = require("jsonwebtoken");
const { $where } = require("../models/user");

const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { email, password, phone, role, name, username, related_company } = req.body;

    if (!email || !password || !phone || !role || !name || !username || !related_company) {
      return res.status(400).send({
        status: "fail",
        msg: "Lütfen tüm alanları doldurun.",
      });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).send({
        status: "fail",
        msg: "Bu e-posta adresi zaten kullanımda.",
      });
    }

    const newUser = await User.create(email, password, phone, role, name, username, related_company);
    res.status(201).send({ status: "success", data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      msg: "Sunucu hatası.",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ status: "success", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "error", msg: "Server error." });
  }
};

  
// ------------------------------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {

      
      return res.status(400).send({
        status: "fail",
        msg: "Lütfen e-posta adresinizi ve şifrenizi giriniz."
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).send({
        status: "fail",
        msg: "E-mail adresi yanlış!"
      });
    }

    if (password !== user.password) {
      return res.status(400).send({
        status: "fail",
        msg: "Şifre yanlış!"
      });
    }

    const token = jwt.sign(
      { user_id: user.id },
      process.env.USER_TOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      status: 200,
      msg: "Giriş işlemi başarılı",
      token: token
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      msg: "Sunucu hatası."
    });
  }
};

function extractToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.USER_TOKEN_KEY);
        const userID = decodedToken.user_id;
        return userID ? userID : null;
    }
    return null;
}
