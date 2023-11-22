import mongoose from "mongoose";
import express from "express";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

import Shop from "../models/shop.model.js";
import {
  createKeyToken,
  generateKeyPair,
  removeById,
  findByRefreshTokenUsed,
  findRefreshToken,
} from "../services/keyToken.services.js";
import { createTokenPair, verifyToken } from "../utils/auth.util.js";
import { getInfoData } from "../utils/lodash.util.js";

// signup
export const signUp = async (req, res) => {
  try {
    // check email is already exist
    const isExisted = await Shop.findOne({
      email: req.body.email,
      role: req.query.role,
    }).lean();
    // lean() is used to convert mongoose object to plain javascript object
    if (isExisted) {
      return res.status(400).json({
        error: "email is already exist",
      });
    }

    // hash password

    const passwordHash = await bcryptjs.hash(req.body.password, 10);

    // create new shop

    const newShop = await Shop.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      role: req.query.role,
    });
    if (!newShop) {
      return res.status(400).json({
        error: "cannot create new shop",
      });
    }

    // create private and public key
    const { privateKey, publicKey } = generateKeyPair();
    // newShop.secret = secret;
    // save collection keyTokens ( userId, publicKey, refreshToken)

    const publicKeyString = await createKeyToken({
      userId: newShop._id,
      publicKey,
    });

    // create token pair
    const tokenPair = await createTokenPair(
      { userId: newShop._id },
      privateKey
    );

    // verify token
    const decoded = verifyToken(tokenPair.accessToken, publicKeyString);

    return res.status(200).json({
      message: "success signup",
      success: true,
      metadata: {
        shop: getInfoData({ data: newShop, fields: ["_id", "name", "email", "role"] }),
        tokenPair,
        decoded,
      },
      // publicKeyString,
    });
  } catch (error) {
    res.status(500).json({
      error: "error signup access in catch",
      message: error.message,
      success: false,
    });
  }
};

// login
export const logIn = async (req, res) => {
  try {
    // check email is exist
    const shop = await Shop.findOne({
      email: req.body.email,
      role: req.query.role,
    }).lean();

    if (!shop) {
      return res.status(400).json({
        error: "email is not exist",
      });
    }

    // check password is valid
    const passwordValid = await bcryptjs.compare(
      req.body.password,
      shop.password
    );

    if (!passwordValid) {
      return res.status(400).json({
        error: "password is not valid",
      });
    }

    // create private and public key
    const { privateKey, publicKey } = generateKeyPair();

    // create token pair
    const tokenPair = await createTokenPair({ userId: shop._id }, privateKey);

    // save collection keyTokens ( userId, publicKey, refreshToken)
    const publicKeyString = await createKeyToken({
      userId: shop._id,
      publicKey,
      refreshToken: tokenPair.refreshToken,
    });

    // const decoded = await verifyToken(tokenPair.accessToken, publicKeyString);

    return res.status(200).json({
      message: "success login",
      success: true,
      metadata: {
        shop: getInfoData({ data: shop, fields: ["_id", "name", "email"] }),
        tokenPair,
        publicKeyString,
        // decoded
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "error login access in catch",
      message: error.message,
      success: false,
    });
  }
};

// get info shop
export const getInfoShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.keyStore.user).lean();
    if (!shop) {
      return res.status(400).json({
        error: "shop is invalid",
      });
    }

    return res.status(200).json({
      message: "success get info shop",
      success: true,
      metadata: {
        shop: getInfoData({ data: shop, fields: ["_id", "name", "email", "phone", "address"] }),
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "error get info shop access in catch",
      message: error.message,
      success: false,
    });
  }
};

// logout

export const logOut = async (req, res) => {
  try {
    const delKeyStore = await removeById(req.keyStore._id);
    if (!delKeyStore) {
      return res.status(400).json({
        error: "cannot delete keyStore",
      });
    }

    return res.status(200).json({
      message: "success logout",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error logout access in catch",
      message: error.message,
      success: false,
    });
  }
};

// refresh token

export const refreshToken = async (req, res) => {
  try {
    const keyToken = await findRefreshToken(req.headers["refresh-token"]);
    if (!keyToken) {
      return res.status(400).json({
        error: "refresh token is invalid",
      });
    }

    const decoded = verifyToken(
      req.headers["refresh-token"],
      keyToken.publicKey
    );
    const shop = await Shop.findById(decoded.userId).lean();
    if (!shop) {
      return res.status(400).json({
        error: "shop is invalid",
      });
    }

    // create new keyToken pair
    const { privateKey, publicKey } = generateKeyPair();
    const tokenPair = await createTokenPair({ userId: shop._id }, privateKey);

    // update collection keyTokens ( userId, publicKey, refreshToken)
    await createKeyToken({
      userId: shop._id,
      publicKey,
      refreshToken: tokenPair.refreshToken,
      refreshTokensUsed: [req.headers["refresh-token"]],
    });

    return res.status(200).json({
      message: "success refresh token",
      metadata: {
        shop: getInfoData({ data: shop, fields: ["_id", "name", "email"] }),
        tokenPair,
        refreshTokensUsed: [req.headers["refresh-token"]],
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "error refresh token access in catch",
      message: error.message,
    });
  }
};
