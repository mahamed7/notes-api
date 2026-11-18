const mongoose = require("mongoose");
const Note = require("../models/Note");

// A MongoDB _id must look like "6731a5f2c9e7...". A fake id like 123 answers 404, not a crash.
function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

async function listNotes(req, res) {
  const notes = await Note.find();
  res.json(notes);
}

async function getNote(req, res) {
  if (!isValidId(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
}

async function createNote(req, res) {
  const title = req.body?.title;
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }
  const note = await Note.create({ title: title });
  res.status(201).json(note);
}

async function updateNote(req, res) {
  const { title, done } = req.body || {};
  if (title === undefined && done === undefined) {
    return res.status(400).json({ message: "send a title or done" });
  }
  if (!isValidId(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title, done },
    { new: true, runValidators: true }
  );
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
}

async function deleteNote(req, res) {
  if (!isValidId(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }
  const removed = await Note.findByIdAndDelete(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.json({ message: "Note deleted" });
}

module.exports = { listNotes, getNote, createNote, updateNote, deleteNote };
