import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";

import { getUsersBySessionToken } from "../db/users";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies("JWT");

    if (!sessionToken) return res.sendStatus(403);

    const existingUser = await getUsersBySessionToken(sessionToken);

    if (!existingUser) return res.sendStatus(403);

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) return res.sendStatus(403);

    if (currentUserId.toString() !== id) return res.sendStatus(403);

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
