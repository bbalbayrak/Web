const jwt = require("jsonwebtoken");
const { $where } = require("../models/user");

const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      console.log("***********************", users);
      res.status(200).send({ status: "success", data: users });
    } catch (err) {
      console.log("**********************", err);
      res.status(500).send({ status: "error", msg: err });
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
      { expiresIn: "48h" }
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

// ------------------------------------------------------------------
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(password && email)) {
      res.status(400).send({
        status: "fail",
        msg: "Lütfen şifre ve e-posta adresinizi giriniz.",
      });
    }
    const isUserExists = await User.findByEmail(email);
    if (isUserExists) {
      res.status(409).send({
        status: "fail",
        msg: "Bu e-posta adresi zaten alınmış.",
      });
    }
    const savedUser = await User.create(email, password);
    const token = jwt.sign(
      {
        user_id: savedUser.id,
      },
      process.env.USER_TOKEN_KEY,
      {
        expiresIn: "48h",
      }
    );
    res.status(201).send({
      status: "success",
      message: "Kullanıcı başarıyla oluşturuldu.",
      token: token,
    });
  } catch (err) {
    console.log("error in register", err);
    res.status(500).send({ status: "error", msg: "hsadhsadhd" + err });
    throw err;
  }
};

  
// ------------------------------------------------------------------

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
