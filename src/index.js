const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.json());

const notes = [
  { id: 1, title: 'Primera nota', content: 'Contenido de la primera nota' },
];

app.get('/', (req, res) => {
  res.send(`
    <div style="text-align: center;">
      ¡Bienvenido a la API de Notas!<br>
      Reto Práctico Final #3<br>
      MÁSTER EN ARQUITECTURA DIGITAL CON DOCKER
    </div>
  `);
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const lastId = notes.length + 1;
  const newNote = {
    id: lastId,
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Nota no encontrada' });
  }

  notes.splice(noteIndex, 1);
  return res.status(204).send();
});

module.exports = app;
