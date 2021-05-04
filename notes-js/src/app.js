const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
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
        notes.addNote(argv);
    },
});

yargs.command({
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
        notes.removeNote(argv);
    },
});

yargs.command({
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
        const note = notes.readNote(argv);
        console.log(note);
    },
});

yargs.command({
    command: "list",
    describe: "List a new note",
    handler() {
        notes.listNotes();
    },
});

yargs.parse();
