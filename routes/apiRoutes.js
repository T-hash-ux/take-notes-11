const router = require('express').Router();
const { append } = require("express/lib/response");
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const { readFromFile, writeToFIle, readAndAppend } = require('../helpers/fsUtils');

//  GET Route for retrieving all of the data.
router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if(data) {
            console.log(data);
            res.json(JSON.parse(data));

        }
        else {
            console.log(err)

        }
        
    });
});

// POST Route for submitting the notes.
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    const newNotes = { title, text, id: uuidv4() }

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataParsed = JSON.parse(data);

            dataParsed.push(newNotes);

            fs.writeFile("./db/db.json", JSON.stringify(dataParsed), (err) => (err ? console.error(err) : console.log("Successfully added a note!")));
            res.json(dataParsed);
        }
    });
});

// set up this delete router to delete notes.
router.delete("/notes/:id", (req, res) => {

    if (req.params.id) {
        const deletedNoteId = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const dataParsed = JSON.parse(data);

                const filteredArray = dataParsed.filter(note => note.id !== deletedNoteId);

                fs.writeFile("./db/db.json", JSON.stringify(filteredArray), (err) => (err ? console.error(err) : console.log("Successfully deleted a note!")));
                res.json(dataParsed);
            }
        });
    }
});

module.exports = router;