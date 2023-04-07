import { Request, Response } from "express";

import { deleteUserById, getUsers, updateUserById } from "../db/users";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUserById(id, req.body);

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
