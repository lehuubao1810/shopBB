import jwt from "jsonwebtoken";
import crypto from "crypto";
import { findByUserId, findByRefreshTokenUsed, removeById } from "../services/keyToken.services.js";
// import nodemailler from "nodemailer";

export const createTokenPair = (payload, privateKey) => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1d",
    });
    if (!accessToken) {
      console.log("Cannot create accessToken");
      return null;
    }
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("Cannot create token pair");
    return error;
  }
};

export const verifyToken = (token, publicKeyString) => {
  const publicKey = crypto.createPublicKey(publicKeyString);
  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
  });
};

export const authentication = async (req, res, next) => {
  try {
    // check userId missing
    const userId = req.headers["user-id"];

    if (!userId) {
      return res.status(400).json({
        error: "userId is missing",
      });
    }

    // get accessToken
    const keyStore = await findByUserId(userId);
    // console.log("keyStore", keyStore);

    // if header has refresh-token => verify refreshToken

    if (req.headers["refresh-token"]) {
      const refreshToken = req.headers["refresh-token"];
      const foundKeyStore = await findByRefreshTokenUsed(
        req.headers["refresh-token"]
      );
      if (foundKeyStore) {
        await removeById(foundKeyStore._id);
        return res.status(500).json({
          error: "Pls login again",
        });
      }
      const decoded = jwt.verify(refreshToken, keyStore.publicKey, {
        algorithms: ["RS256"],
      });
      if (!decoded) {
        return res.status(400).json({
          error: "refresh token is invalid",
        });
      }
      if (decoded.userId !== userId) {
        return res.status(400).json({
          error: "userId is invalid",
        });
      }
      req.keyStore = keyStore;
      return next();
    }

    // verify accessToken
    const accessToken = req.headers["access-token"];

    const decodeUser = jwt.verify(accessToken, keyStore.publicKey, {
      algorithms: ["RS256"],
    });

    if (!decodeUser) {
      return res.status(400).json({
        error: "accessToken is invalid",
      });
    }
    if (decodeUser.userId !== userId) {
      return res.status(400).json({
        error: "userId is invalid",
      });
    }
    req.keyStore = keyStore;
    // OK => next()
    return next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "error verify token in catch 1",
    });
  }
};


// export const authenticateEmail = async (req, res, next) => {

// };