const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//  Routes

// Notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
  });

// Notes 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
  let saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(saveNote[Number(req.params.id)]);
});

// Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

// Save Note
app.post('/api/notes', (req, res) => {
  const saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
  const note = req.body;
  const noteId = (saveNote.length).toString();
  note.id = noteId;
  saveNote.push(note);

  fs.writeFileSync('./db/db.json', JSON.stringify(saveNote));
  res.json(saveNote);
})

app.delete('/api/notes/:id', (req, res) => {

    const saveNote = JSON.parse(fs.readFileSync('./db/db.json'));
    const noteID = req.params.id;
    const newID = 0;
  
    saveNote = saveNote.filter(chosenNote => {
        return chosenNote.id != noteID;
    })
    for (chosenNote of saveNote) {
        chosenNote.id = newID.toString();
        newID++;
    }
  
    fs.writeFileSync('./db/db.json', JSON.stringify(saveNote));
    res.json(saveNote);
  })
  
  // Listener
  app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
    });