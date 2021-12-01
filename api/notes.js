const express = require('express');
const { v4: uuidv4 } = require('uuid');
const notes = require('express').Router('');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers');
const app = express();
app.use('/notes', notes)
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    let { title, text, id } = req.body;

    if (req.body) {
        let newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = app;