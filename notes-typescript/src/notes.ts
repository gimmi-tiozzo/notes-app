import { writeFileSync, readFileSync, existsSync } from "fs";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";

//se il file è caricato come modulo EcmaScript __dirname e __filename non sono disponibili. Sono variabili per i moduli CommonJs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * File in cui salvare le note in formato JSON
 */
const fileName = path.join(__dirname, "../notes/notes.json");

/**
 * Nota
 */
export type Note = {
    /**
     * Titolo della nota
     */
    title: string;
    /**
     * Corpo della nota
     */
    body: string;
};

/**
 * Interfaccia per la gestione delle note
 */
export interface INotes {
    /**
     * Visualizza la lista delle note salvate nel file delle note
     */
    listNotes(): void;

    /**
     * Cerca una nota per title
     * @param {string} title titolo della nota
     * @returns nota trovata per title
     */
    readNote({ title }: { title: string }): Note | undefined;

    /**
     * Aggiungi una nuova nota
     * @param {string} title titolo della nota
     * @param {string} body testo della nota
     */
    addNote({ title, body }: { title: string; body: string }): void;

    /**
     * Rimuovi una nota per title
     * @param {string} title
     */
    removeNote({ title }: { title: string }): void;
}

export class NoteImp implements INotes {
    /**
     * Visualizza la lista delle note salvate nel file delle note
     */
    public listNotes(): void {
        const notes = this.loadNotes()
            .map((note) => note.title)
            .join("\n");

        console.log(chalk.bgGreen.black.bold("Your Notes:"));
        console.log(notes);
    }

    /**
     * Cerca una nota per title
     * @param {string} title titolo della nota
     * @returns nota trovata per title
     */
    public readNote({ title }: { title: string }): Note | undefined {
        const note = this.loadNotes().find((note) => note.title === title);

        if (note) {
            console.log(chalk.bgGreen.black.bold("Note found"));
        } else {
            console.log(chalk.bgYellow.black.bold("Note not found"));
        }

        return note;
    }

    /**
     * Aggiungi una nuova nota
     * @param {string} title titolo della nota
     * @param {string} body testo della nota
     */
    public addNote({ title, body }: { title: string; body: string }): void {
        const notes = this.loadNotes();
        const duplicateNotes = notes.filter((note) => note.title === title);

        if (duplicateNotes.length === 0) {
            notes.push({ title, body });
            this.saveNotes(notes);

            console.log(chalk.bgGreen.black.bold("Note added"));
        } else {
            console.log(chalk.bgYellow.black.bold("Note already exist"));
        }
    }

    /**
     * Rimuovi una nota per title
     * @param {string} title
     */
    public removeNote({ title }: { title: string }): void {
        const notes = this.loadNotes();
        const indexToRemove = notes.findIndex((note) => note.title === title);

        if (indexToRemove >= 0) {
            notes.splice(indexToRemove, 1);
            this.saveNotes(notes);

            console.log(chalk.bgGreen.black.bold("Note removed"));
        } else {
            console.log(chalk.bgYellow.black.bold("Note not found"));
        }
    }

    /**
     * Carica le note dal file in cui sono salvate in formato Json
     * @returns note dal file in cui sono salvate in formato Json
     */
    private loadNotes(): Note[] {
        try {
            if (existsSync(fileName)) {
                const buffer = readFileSync(fileName);
                return <Note[]>JSON.parse(buffer.toString());
            } else {
                return [];
            }
        } catch (e) {
            console.log(chalk.bgRed.black.bold(e.message));
            return [];
        }
    }

    /**
     * Salve in un file le note in formato Json
     * @param {Note[]} notes array delle note da salvare come Json
     */
    private saveNotes(notes: Note[]): void {
        try {
            const dataJSON = JSON.stringify(notes);
            writeFileSync(fileName, dataJSON);
        } catch (e) {
            console.log(chalk.bgRed.black.bold(e.message));
        }
    }
}

export default new NoteImp();
