import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import sessions from "express-session";



import {
  createNoteSchema,
  options,
  updateNoteSchema,
  generateToken,
} from "../utils/utils";

import Database from "better-sqlite3";

const db = new Database("./zen.sqlite", { verbose: console.log });

export async function createNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = uuidv4();
    const validationResult = createNoteSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    } else {

      const stmt = db.prepare(
        "INSERT INTO notes (id, parent, content, avatar, author_id, author_name, category, flagged, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)"
      );
      const isoDate = new Date().toISOString();

      try {

        const created = stmt.run(
          null,
          req.body.parent,
          req.body.content,
          req.body.avatar,
          req.body.author_id,
          req.body.author_name,
          req.body.category,
          req.body.flagged,
          isoDate,
          isoDate
        );
        res.status(201).json({
          msg: "Successfully created new post",
          inserted: created.changes,
        });
      } catch (err) {
        res.status(500).json({
          msg: "failed to create new post",
          error: err,
          route: "/create",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      msg: "failed to create",
      err,
      route: "/create",
    });
  }
}

export async function readNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stmt = db.prepare("SELECT * FROM notes WHERE id = ?");

    const id = req.params.id;

    if (id) {
      const created = stmt.get(id);
      res.status(200).json({
        msg: "Successfully read",
        read: created.changes,
      });
    } else {
      res.status(404).json({
        msg: "No data found",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "failed to fetch",
      route: "/read",
    });
  }
}

export async function readAllNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const query = "SELECT * FROM notes ORDER BY id DESC"
    const stmt = db.prepare(query);
    const allNotes = stmt.all();

    if (allNotes.length >= 0) {
      res.status(200).json({
        msg: "Successfully read all notes",
        notes: allNotes,
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

export async function reportedNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {

    const query = "SELECT * FROM notes ORDER BY flagged DESC"
    const stmt = db.prepare(query);
    const allNotes = stmt.all();

    if (allNotes.length >= 0) {
      res.status(200).json({
        msg: "Successfully read all reported notes",
        notes: allNotes,
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
export async function readAllNotesByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (req.body.category) {
    try {
      const query = `SELECT * FROM notes WHERE category = ? ORDER BY id DESC`
      const stmt = db.prepare(query);
      const allNotes = stmt.all(req.body.category);

      if (allNotes.length >= 0) {
        res.status(200).json({
          msg: "Successfully read all notes",
          notes: allNotes,
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
}

export async function readSomeNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stmt = db.prepare("SELECT * FROM notes WHERE parent = ?");
    const someNotes = stmt.all(req.body.id);

    if (someNotes.length > 0) {
      res.status(200).json({
        msg: "Successfully read some notes",
        notes: someNotes,
      });
    } else {
      res.status(404).json({
        msg: "No data found",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "failed to fetch",
      route: "/read",
      err
    });
  }
}

export async function flagNote(
  req: Request,
  res: Response,
  next: NextFunction
) {

  let stmt = db.prepare(
    "UPDATE notes SET flagged=? WHERE id = ?"
  );
  try {
    const updated = stmt.run(
      "flagged",
      req.body.id
    );
    if (updated) {
      res.status(200).json({
        message: "updated successfully",
      });
    }
    if (!updated) {
      res.status(400).json({
        message: "not updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "an error occured",
    });
  }
}

export async function updateNote(
  req: Request,
  res: Response,
  next: NextFunction
) {

  let stmt = db.prepare(
    "UPDATE notes SET content=? WHERE id = ?"
  );
  try {
    const updated = stmt.run(
      req.body.content,
      req.body.id
    );
    if (updated) {
      res.status(200).json({
        message: "updated successfully",
      });
    }
    if (!updated) {
      res.status(400).json({
        message: "not updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "an error occured",
    });
  }
}

export async function deleteNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let stmt = db.prepare("DELETE FROM notes WHERE id = ?");
    const id = req.body.id;
    if (id) {
      const deleted = stmt.run(id);

      if (deleted.changes > 0) {
        res.status(200).json({
          msg: `You have successfully deleted post with id ${id}`,
          deleted: deleted.changes,
        });
      } else {
        res.status(400).json({
          message: "Not deleted",
        });

      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Note not deleted",
    });
  }
}
