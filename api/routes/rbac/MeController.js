import express from "express";
import ModuleService from "@/services/rbac/ModuleService.js";
import UserAuthService from "@/services/rbac/UserAuthService.js";
import {getTokenData} from "@/utils/jwt.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import { env } from "@/utils/env.ts";
import { SignJWT } from "jose";
import MeService from "@/services/rbac/MeService.js";
import { HttpError } from "@/utils/HttpError.ts";

const router = express.Router();

router.post("/refresh", 
  async (req, res) => {
    const currToken = req.cookies?.token;
    if(currToken) {
      const decoded = await getTokenData(currToken);
      const now = Math.floor(Date.now() / 1000)
      const remainTime = decoded.exp - now; // em segundos
      const newTokenContent = await UserAuthService.getUserById(decoded.userId);

      const secret = new TextEncoder().encode(env.JWT_KEY)
      const newToken = await new SignJWT(newTokenContent)
        .setProtectedHeader({ alg: env.JWT_ALG})
        .setIssuedAt()
        .setExpirationTime(`${remainTime}s`)
        .sign(secret);
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * remainTime, 
        sameSite: "lax"
      })
    }
    return new HttpSuccess({}).send(res);
  }
);

router.post(
  "/have/route",
  async (req, res) => {
    const token = req.cookies?.token;
    const id = (await getTokenData(token)).userId;
    const {route} = req.body;
    const haveAccess = await MeService.checkIfUserCanAccessRoute(id, route);
    return new HttpSuccess({
      data: haveAccess
    }).send(res);
  }
);

router.get(
  "/modules",
  async (req, res) => {
    const token = req.cookies?.token;
    const id = (await getTokenData(token)).userId;
    const modules = await MeService.getModulesByUserId(id);
    return new HttpSuccess({
      data: modules
    }).send(res);
  }
)

export default router;