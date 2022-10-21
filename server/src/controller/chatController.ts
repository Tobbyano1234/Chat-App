import express, { Request, Response, NextFunction } from "express";



import {
    createChatSchema,
    options
} from "../utils/utils";

import Database from "better-sqlite3";

const db = new Database("./zen.sqlite", { verbose: console.log });

export async function createChat(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validationResult = createChatSchema.validate(req.body, options);

        if (validationResult.error) {

            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });

        } else {

            const stmt = db.prepare(
                "INSERT INTO chats (id, content, sender_id, recipient_id, createdAt) VALUES (?,?,?,?,?)"
            );
            const isoDate = new Date().toISOString();

            try {

                const created = stmt.run(
                    null,
                    req.body.content,
                    req.body.sender_id,
                    req.body.recipient_id,
                    isoDate
                );
                res.status(201).json({
                    msg: "Successfully created new chat",
                    inserted: created.changes,
                });
            } catch (err) {
                res.status(500).json({
                    msg: "failed to create new chat",
                    error: err,
                    route: "/create",
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            msg: "failed to execute",
            err,
            route: "/create",
        });
    }
}


export async function getAllChats(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        // const stmt = db.prepare(`SELECT * FROM chats WHERE ((sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?))`)//ORDER BY createdAt DESC`)
        const stmt = db.prepare(`SELECT * FROM chats FULL OUTER JOIN users ON chats.sender_id = users.id WHERE ((sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?))`)

        if (req.body.sender_id && req.body.recipient_id) {
            const allChats = stmt.all(
                req.body.sender_id,
                req.body.recipient_id,
                req.body.recipient_id,
                req.body.sender_id
            );
            if (allChats.length >= 0) {
                res.status(200).json({
                    msg: "Successfully read all chats",
                    chats: allChats,
                });
            } else {
                res.status(404).json({
                    msg: "No data found",
                });
            }
        } else {
            res.status(404).json({
                msg: "sender_id and recipient_id required",
            });
        }


    } catch (err) {
        res.status(500).json({
            msg: "failed to fetch",
            err,
            route: "/read",
        });
    }

}

export async function getAllChatsAndUsers(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        if (req.body.type === 1) {
            // const stmt = db.prepare(`SELECT * FROM chats FULL OUTER JOIN users ON chats.sender_id = users.id ORDER BY users.id ASC`)
            const stmt = db.prepare(`SELECT * FROM users FULL OUTER JOIN chats ON users.id = chats.sender_id ORDER BY users.createdAt DESC`)

            const allChats = stmt.all();

            if (allChats.length >= 0) {
                res.status(200).json({
                    msg: "Successfully read all ",
                    chats: allChats,
                });
            } else {
                res.status(404).json({
                    msg: "No data found",
                });
            }

        } else {

            // const stmt = db.prepare(`SELECT * FROM chats FULL OUTER JOIN users ON chats.sender_id = users.id ORDER BY users.id ASC`)
            const stmt = db.prepare(`SELECT * FROM chats FULL OUTER JOIN users ON chats.sender_id = users.id ORDER BY chats.createdAt DESC`)

            const allChats = stmt.all();

            if (allChats.length >= 0) {
                res.status(200).json({
                    msg: "Successfully read all ",
                    chats: allChats,
                });
            } else {
                res.status(404).json({
                    msg: "No data found",
                });
            }
        }


    } catch (err) {
        res.status(500).json({
            msg: "failed to fetch",
            err,
            route: "/read",
        });
    }

}


export async function getSomeChats(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {


        const stmt = db.prepare(`SELECT * FROM chats FULL OUTER JOIN users ON chats.sender_id = users.id WHERE sender_id = ?  OR  recipient_id = ? ORDER BY createdAt DESC`)

        const someChats = stmt.all(
            req.body.user_id,
            req.body.user_id
        );
        if (someChats.length >= 0) {
            res.status(200).json({
                msg: "Successfully read some chats",
                count: someChats.length,
                chats: someChats,
            });
        } else {
            res.status(404).json({
                msg: "No data found",
            });
        }

    } catch (err) {
        res.status(500).json({
            msg: "failed to fetch",
            err,
            route: "/read",
        });
    }

}