import keyTokenModel from "../models/keyToken.model.js";
import crypto from "crypto";
import { Types } from "mongoose";

export const createKeyToken = async ({ userId, publicKey, refreshToken, refreshTokensUsed = [] }) => {
  try {
    const publicKeyString = publicKey.toString("base64");

    // const keyToken = keyTokenModel.create({
    //     user: userId,
    //     publicKey: publicKeyString,
    //     refreshToken: refreshToken,
    // })

    const filter = { user: userId };
    const update = {
      publicKey: publicKeyString,
      refreshToken: refreshToken,
      refreshTokensUsed: refreshTokensUsed,
    };
    const options = {
      upsert: true, // create if not exist
      new: true, // return new document if one is upserted
      // setDefaultsOnInsert: true  // set default value if upserted
    };

    const keyToken = await keyTokenModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!keyToken) {
      console.log("Cannot create keyToken in try");
      return null;
    }

    return publicKeyString;
  } catch (error) {
    console.log("Cannot create keyToken in catch");
    return error;
  }
};

export const generateKeyPair = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki", // spki = SubjectPublicKeyInfo
      format: "pem", // pem = Privacy Enhanced Mail
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  return { privateKey, publicKey };
};

export const findByUserId = async (userId) => {
  try {
    const keyStore = await keyTokenModel.findOne({ user: userId }).lean();
    // console.log("keyStore", keyStore);

    if (!keyStore) {
      console.log("Cannot find KeyStore");
      return null;
    }

    return keyStore;
  } catch (error) {
    return error;
  }
};

export const removeById = async (id) => {
  return await keyTokenModel.findByIdAndDelete(id);
};

export const findByRefreshTokenUsed = async (refreshToken) => {
  return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
};
export const findRefreshToken = async (refreshToken) => {
  return await keyTokenModel.findOne({ refreshToken: refreshToken }).lean();
};
