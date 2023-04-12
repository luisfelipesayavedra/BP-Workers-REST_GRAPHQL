import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "./../generated/client";
import jwt from "jsonwebtoken";
import { _DecryptInternalData } from "./helpers";

export const AuthHello = (_req: Request, res: Response, next: NextFunction) => {
  try {
    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const ValidateAndDecryptToken = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prisma: PrismaClient = _req.app.get("prisma");
    const { url } = _req.body;
    const { authorization } = _req.headers;
    const virtualStore = await prisma.wordpress.findUnique({
      where: {
        url,
      },
      select: {
        token: true,
        organization_uuid: true,
        pos_uuid: true,
        pos: {
          select: {
            pos_manager: {
              select: {
                internal_user_uuid: true,
              },
            },
          },
        },
      },
    });
    if (authorization !== virtualStore?.token) {
      return res.status(401).send({ error: "No authorizado" });
    }
    ((_req.params as any).organizationUuid = virtualStore!.organization_uuid),
      ((_req.params as any).pos_uuid = virtualStore!.pos_uuid),
      ((_req.params as any).pos_manager_uuid =
        virtualStore!.pos?.pos_manager[0].internal_user_uuid);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

export const ValidateAndDecryptTokenBase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization)
    jwt.verify(String(authorization), "String(process.env.KEYPRIVATE)");
    const decoded = jwt.decode(String(authorization));
    const decodedInfo = _DecryptInternalData(decoded);
    req.body.payload = decodedInfo as Payload
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
};

export interface Payload {
    uuid: string,
    organizationUuid: string,
    Permissions: string[]
}
