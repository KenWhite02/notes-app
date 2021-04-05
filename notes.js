const { writeFileSync, readFileSync } = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green('New Note Added!'));
  } else {
    console.log(chalk.yellow('Note Title Taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green('Note Removed!'));
  } else {
    console.log(chalk.red('Note Not Found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green('Listing Out All Notes!'));
  const noteTitles = notes.forEach((note) => {
    console.log(note.title);
  });
  return noteTitles;
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.blue(note.title + ':'), note.body);
  } else {
    console.log(chalk.red('No Note Found!'));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  writeFileSync('notes.json', dataJSON);
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
