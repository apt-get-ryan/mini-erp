import express from "express";
import ModuleService from "../../services/ModuleService.js";
import UserAuthService from "../../services/UserAuthService.js";
import {getTokenData} from "../../utils/jwt.js";

const router = express.Router();

router.get("/modules",
  async (req, res) => {
    try {
      const {userId} = getTokenData(req.cookies.token);
      let modules = [];
      modules = await ModuleService.getAcessibleModules(userId);
      
      res.send(modules);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
  }
);

router.get("/permissions",
  async (req, res) => {
    try {
      const { userPermissions } = getTokenData(req.cookies.token);
      res.send(userPermissions)
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
  }
)

router.get("/",
  async (req, res) => {
    try {
      const {userId} = getTokenData(req.cookies.token);
      const {user, accessibleModules, userPermissions} = await UserAuthService.getUserById(userId);
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
  }
)

export default router;