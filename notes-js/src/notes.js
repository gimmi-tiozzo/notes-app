const fs = require("fs");
const chalk = require("chalk");
const fileName = "notes.json";

/**
 * Visualizza la lista delle note salvate nel file delle note
 */
const listNotes = function () {
    const notes = loadNotes()
        .map((note) => note.title)
        .join("\n");

    console.log(chalk.bgGreen.black.bold("Your Notes:"));
    console.log(notes);
};

/**
 * Cerca una nota per title
 * @param {string} title titolo della nota
 * @returns nota trovata per title
 */
const readNote = function ({ title }) {
    const note = loadNotes().find((note) => note.title === title);

    if (note) {
        console.log(chalk.bgGreen.black.bold("Note found"));
    } else {
        console.log(chalk.bgYellow.black.bold("Note not found"));
    }

    return note;
};

/**
 * Aggiungi una nuova nota
 * @param {string} title titolo della nota
 * @param {string} body testo della nota
 */
const addNote = function ({ title, body }) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push({ title, body });
        saveNotes(notes);

        console.log(chalk.bgGreen.black.bold("Note added"));
    } else {
        console.log(chalk.bgYellow.black.bold("Note already exist"));
    }
};

/**
 * Rimuovi una nota per title
 * @param {string} title
 */
const removeNote = function ({ title }) {
    const notes = loadNotes();
    const indexToRemove = notes.findIndex((note) => note.title === title);

    if (indexToRemove >= 0) {
        notes.splice(indexToRemove, 1);
        saveNotes(notes);

        console.log(chalk.bgGreen.black.bold("Note removed"));
    } else {
        console.log(chalk.bgYellow.black.bold("Note not found"));
    }
};

/**
 * Salve in un file le note in formato Json
 * @param {string} notes array delle note da salvare come Json
 */
const saveNotes = function (notes) {
    try {
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync(fileName, dataJSON);
    } catch (e) {
        console.log(chalk.bgRed.black.bold(e.message));
    }
};

/**
 * Carica le note dal file in cui sono salvate in formato Json
 * @returns note dal file in cui sono salvate in formato Json
 */
const loadNotes = function () {
    try {
        if (fs.existsSync(fileName)) {
            const buffer = fs.readFileSync(fileName);
            return JSON.parse(buffer.toString());
        } else {
            return [];
        }
    } catch (e) {
        console.log(chalk.bgRed.black.bold(e.message));
    }
};

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote,
};
