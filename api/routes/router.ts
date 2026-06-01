import express from 'express';
import rbacRouter from './rbac/rbacRouter.js';
import crmRouter from './crm/crmRouter.js';
import { HttpError } from '@/utils/HttpError.ts';
import writeLog from '@/utils/Logger.js';

const router = express.Router();

router.use(rbacRouter);
router.use(crmRouter);


router.use((req, res) => {
  res.status(404).send({ error: { message: `A rota ${req.method} ${req.originalUrl} não foi encontrada`}})
})

router.use((err, req, res, next) => {
  const httpError = HttpError.from(err);

  console.error(httpError.stack);
  writeLog(JSON.stringify(httpError.getResponse()))
  return res.status(httpError.statusCode).send(httpError.getResponse());
});

export default router;
