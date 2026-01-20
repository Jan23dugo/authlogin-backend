import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { User } from "../models/user.model.js";

const setupTwoFactor = async (req, res) => {
  try {
    const user = req.user; // already exists

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.isTwoFactorEnabled) {
      return res.status(400).json({ message: "2FA already enabled" });
    }

    const secret = speakeasy.generateSecret({
      name: `AuthLogin (${user.email})`,
    });

    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      secret: secret.base32,
      qrcode: qrCode,
    });
  } catch (error) {
    console.error("2FA SETUP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const verifyTwoFactor = async (req, res) => {
  try {
    const { token } = req.body;
    const user = req.user;

    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: "2FA not initialized" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ message: "Invalid code" });
    }

    user.isTwoFactorEnabled = true;
    await user.save();

    res.json({ message: "2FA enabled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateTwoFactorCode = (userSecret, userToken) => {
  return speakeasy.totp.verify({
    secret: userSecret,
    encoding: "base32",
    token: userToken,
  });
};

const disableTwoFactor = async (req, res) => {
  try {
    const user = req.user;

    user.isTwoFactorEnabled = false;
    user.twoFactorSecret = undefined;
    await user.save();

    res.json({ message: "2FA disabled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  setupTwoFactor,
  verifyTwoFactor,
  validateTwoFactorCode,
  disableTwoFactor,
};
