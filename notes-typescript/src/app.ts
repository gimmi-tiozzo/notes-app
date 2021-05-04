import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import notes from "./notes.js";

const yargsWorkaround = yargs(hideBin(process.argv)); //questo è un workaround perchè yargs non funziona se importata tramite modulo

yargsWorkaround.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.addNote(argv as any);
    },
});

yargsWorkaround.command({
    command: "remove",
    describe: "Remove a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.removeNote(argv as any);
    },
});

yargsWorkaround.command({
    command: "read",
    describe: "Read a new note",
    builder: {
        title: {
            describe: "Read Note",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        const note = notes.readNote(argv as any);
        console.log(note);
    },
});

yargsWorkaround.command({
    command: "list",
    describe: "List a new note",
    handler() {
        notes.listNotes();
    },
});

yargsWorkaround.parse();
