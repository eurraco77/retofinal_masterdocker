const request = require('supertest');
const app = require('../src/index');

describe('API de Notas', () => {
  it('GET /notes - Debe retornar todas las notas.', async () => {
    const response = await request(app).get('/notes');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('POST /notes - Debe crear una nueva nota.', async () => {
    const newNote = { title: 'Test Nota', content: 'Test Contenido' };
    const response = await request(app)
      .post('/notes')
      .send(newNote);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newNote.title);
  });

  it('DELETE /notes/:id - Debe eliminar una nota existente.', async () => {
    const response = await request(app).delete('/notes/1');
    expect(response.statusCode).toBe(204);
  });

  it('DELETE /notes/:id - Debe fallar al eliminar nota inexistente.', async () => {
    const response = await request(app).delete('/notes/999');
    expect(response.statusCode).toBe(404);
  });
});
