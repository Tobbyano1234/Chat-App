import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { emailVerificationView } from '../mailer/EmailTemplate'
import mailer from '../mailer/sendmail';
const jwtSecret = process.env.JWT_SECRET as string
const fromUser = process.env.FROM as string

declare module 'express-session' {
  export interface SessionData {
    token: string
    user: {}
    userId: string
  }
}
interface jwtPayload {
  id: string
}

import {
  registerSchema,
  updateUserSchema,
  options,
  loginSchema,
  generateToken,
} from "../utils/utils";

import Database from 'better-sqlite3';

const db = new Database('./zen.sqlite', { verbose: console.log });

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const validationResult = registerSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    let stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const emailExists = stmt.get(req.body.email);

    stmt = db.prepare('SELECT * FROM users WHERE phonenumber = ?');
    const phoneNumberExists = stmt.get(req.body.phonenumber);

    if (emailExists) {

      res.status(409).json({
        msg: "This email already exists"
      });

    } else if (phoneNumberExists) {

      res.status(409).json({
        msg: "Phone number is taken, please change",
      });
    } else {

      const id = uuidv4();
      const stmt = db.prepare('INSERT INTO users (id, firstname, lastname, email, avatar, gender, phonenumber, password, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)');
      const isoDate = new Date().toISOString()
      const passwordHash = await bcrypt.hash(req.body.password, 10)
      const VERIFIED = 1;

      const created = stmt.run(id, req.body.firstname, req.body.lastname, req.body.email, req.body.avatar, req.body.gender, req.body.phonenumber, passwordHash, isoDate, isoDate);

      console.log(created);

      if (created.changes) {



        let stmt = db.prepare('SELECT * from users WHERE email = ?');
        const user = stmt.get(req.body.email);

        const { id } = user
        
        const token = jwt.sign({ id }, jwtSecret, { expiresIn: "30mins" })

        const html = emailVerificationView(token)

        await mailer.sendEmail(
          fromUser,
          req.body.email,
          "Please verify yout email",
          html
        )

        res.status(201).json({
          msg: "Successfully created new user",
          inserted: created.changes,
          data: user
        });

      } else {
        res.status(500).json({
          msg: "failed to create new user",
          inserted: created.changes,
          data: req.body
        });
      }

    }

  } catch (err) {
    res.status(500).json({
      msg: "failed to read user",
      route: "/read",
      error: err,
    });
  }
}

export async function LoginUser(req: Request, res: Response, next: NextFunction) {

  const id = uuidv4()
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message
      });
    }

    let stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(req.body.email);

    if (user) {
      const token = generateToken(user.id)
      const validUser = await bcrypt.compare(req.body.password, user.password)


      if (!validUser) {

        res.status(401).json({
          msg: 'incorrect password'
        })

      } else {

        req.session.token = token as string
        req.session.user = user;
        req.session.userId = user.id;

        if (user.isverified === 0 || user.isverified === null) {
          try {
            const isoDate = new Date().toISOString()
            const verified = 1;
            const stmt = db.prepare("UPDATE users SET isVerified=?, updatedAt=? WHERE id = ?");

            const updated = stmt.run(verified, isoDate, user.id);

          } catch (err) {
            res.status(500).json({
              msg: "failed to update verfification status",
              route: "/read",
              error: err,
            });
          }
        }

        res.status(200).json({
          message: "logged in successfully",
          token,
          user
        })
      }
    } else {

      res.status(404).json({
        msg: "No users found",

      });
    }

  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    let stmt = db.prepare('SELECT * from users');
    const users = stmt.all();

    if (users) {
      res.status(200).json({
        msg: "You have successfully fetched all users",
        count: users.length,
        record: users,
      });

    } else {

      res.status(404).json({
        msg: "No users found",

      });
    }



  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}


export async function getUserFromEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {



    let stmt = db.prepare('SELECT * from users WHERE email = ?');
    const user = stmt.get(req.body.email);

    if (user) {
      res.status(200).json({
        msg: "You have successfully fetched a single user by email",
        count: user.length,
        record: user,
      });

    } else {

      res.status(404).json({
        msg: "No users found by email",

      });
    }



  } catch (error) {
    res.status(500).json({
      msg: "failed to read by email",
      route: "/read",
    });
  }
}

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {



    let stmt = db.prepare('SELECT * from users WHERE id = ?');
    const user = stmt.get(req.body.id);

    if (user) {
      res.status(200).json({
        msg: "You have successfully fetched a single user",
        count: user.length,
        record: user,
      });

    } else {

      res.status(404).json({
        msg: "No users found",

      });
    }



  } catch (error) {
    res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function logOutUser(req: Request, res: Response, next: NextFunction) {

  req.session.destroy(function (err) {
    res.status(201).json({
      msg: 'logged out',
      status: 1,
      route: '/login'
    });
  });



}


export async function isVerifiedUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    let stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(req.body.email);

    if (user.isverified === 1) {
      res.status(200).json({
        msg: "User is verified",
        status: 1,
        user
      });
    } else {
      res.status(404).json({
        msg: "User is not verified",
        status: 0,
        user
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "failed to verify user",
      route: "/verify",
      error: err,
    });
  }
}

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const token = req.params.token
    const { id } = jwt.verify(token, jwtSecret) as jwtPayload;

    if (!id) {
      res.status(401).json({
        Error: 'Verification failed',
        token,
        status: 0
      })
    } else {
      const verifiedValue = 1;
      const stmt = db.prepare("UPDATE users SET isverified=? WHERE id = ?");
      const verified = stmt.run(verifiedValue, id);

      if (verified.changes === 1) {
        res.status(200).json({
          msg: "Successfully verified new user",
          status: 1,
          id
        });
      } else {
        res.status(500).json({
          msg: "failed to verify user - 1",
          status: 0,
          id
        });
      }
    }

  } catch (err) {
    res.status(500).json({
      msg: "failed to verify user - 2",
      route: "/verify",
      status: 0,
      error: err,
    });
  }
}


export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (req.body.update_route === "setup") {
    try {
      const validationResult = updateUserSchema.validate(req.body, options);
      if (validationResult.error) {
        return res.status(400).json({
          Error: validationResult.error.details[0].message,
        });
      }

      const isoDate = new Date().toISOString()

      const stmt = db.prepare("UPDATE users SET avatar=?, groups=?, type=?, id_doc_type=?, id_doc_number=?, id_doc_path=?, updatedAt=? WHERE id = ?");

      const updated = stmt.run(req.body.avatar, req.body.groups, req.body.type, req.body.id_doc_type, req.body.id_doc_number, req.body.id_doc_path, isoDate, req.body.id);

      if (updated.changes) {
        res.status(201).json({
          msg: "Successfully created new user",
          inserted: updated.changes,
        });
      } else {
        res.status(500).json({
          msg: "failed to update user - 1",
        });
      }

    } catch (err) {
      res.status(500).json({
        msg: "failed to run update - 2",
        route: "/read",
        error: err,
      });
    }
  } else if (req.body.update_route === "profile") {
    const stmt = db.prepare(
      "UPDATE users SET firstname=?,lastname=?,email=?,gender=?,phonenumber=?,type=?,groups=? WHERE id =?"
    );
    try {
      const updated = stmt.run(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.gender,
        req.body.phonenumber,
        req.body.type,
        req.body.groups,
        req.body.id
      );

      console.log(updated);

      if (updated.changes === 1) {
        res.status(200).json({
          message: "updated successfully",
          status: 1
        });
      }
      if (!updated.changes) {
        res.status(400).json({
          message: "not updated",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "an error occured",
        error
      });
    }
  }
}

export async function userCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {
    // SELECT COUNT(*) AS members FROM users WHERE FIND_IN_SET(?, groups)'
    let stmt = db.prepare(`SELECT COUNT(*) FROM users WHERE (',' || groups || ',') LIKE '%,${req.body.group},%'`);
    const users = stmt.all();

    if (users) {
      res.status(200).json({
        msg: "Users fetched by category",
        status: 1,
        users
      });
    } else {
      res.status(404).json({
        msg: "User not fetched by category",
        status: 0,
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "failed to fetch users by category",
      route: "/category",
      error: err,
    });
  }
}
