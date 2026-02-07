import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

export const hashAndEncrypt = async (req, res, next) => {
  try {
    const { password, phone } = req.body;

    // Hash Password
    if (password) {
      const salt = 10;
      req.body.password = bcrypt.hashSync(password, salt);
    }

    // Encrypt Phone
    if (phone) {
      req.body.phone = CryptoJS.AES.encrypt(phone, "secret_key_123").toString();
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Encryption Error", error: error.message });
  }
};
