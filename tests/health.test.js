const request = require('supertest');
const express = require('express');

const app = express();
app.get('/health', (req, res) => res.send('Still working... on *my* machine 🧃'));

describe('Health endpoint', () => {
  it('should return 200 and message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Still working');
  });
});
