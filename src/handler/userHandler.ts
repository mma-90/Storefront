import { Request, Response } from 'express';
import UserStore from '../model/user';
import user from '../interface/user';
import jwt from 'jsonwebtoken';
import normalizeString from '../utilites/normalizeString';
import customErrorRes from '../utilites/customError';

// TODO: Implement expired token check
// TODO: Implement login and logout
// TODO: Implement update delete users

const index = async (_req: Request, res: Response) => {
  try {
    const users = await new UserStore().index();
    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

//register
const create = async (req: Request, res: Response) => {
  try {
    const username: string = normalizeString(req.body.username);
    const firstname: string = normalizeString(req.body.firstname);
    const lastname: string = normalizeString(req.body.lastname);
    const password: string = normalizeString(req.body.password);

    const newUser: user = await new UserStore().create({
      username,
      firstname,
      lastname,
      password,
    });

    const userSign = jwt.sign(newUser as user, process.env.TOKEN_ACCESS_SECRET as string);

    res.status(201).json({
      status: 'success',
      token: userSign,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    // TODO: check id and token exit firstor return 400
    // TODO: check token secret or return 500

    const authHeader = req.headers.authorization;
    const token: string = authHeader?.split(' ')[1] as string;

    const decodedUser = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;
    const user = await new UserStore().show(decodedUser.id as number);
    user.token = token;

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    // TODO: check id and token exit firstor return 400
    // TODO: check token secret or return 500

    const id = parseInt(req.params.id as string);
    const authHeader = req.headers.authorization;
    const token: string = authHeader?.split(' ')[1] as string;

    const decodedUser: user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;

    await new UserStore().delete(decodedUser.id as number);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

//login when token is exprired
// const login = (id: number, password: string): boolean => {};

// const deleteUser = (_req: Request, res: Response) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       data: {},
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "error",
//       error: err,
//     });
//   }
// };

// const updateUser = (_req: Request, res: Response) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       data: {},
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "error",
//       error: err,
//     });
//   }
// };

export default {
  index,
  create,
  show,
  destroy,
  // updateUser,
};