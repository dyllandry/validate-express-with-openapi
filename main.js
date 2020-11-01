// Create express app
const express = require('express');
const app = express();

// Grab placeholder models
const model = require('./model');

// Initalized request validator generated from openapi spec
const openapiValidator = require('openapi-validator-middleware');
openapiValidator.init('openapi.yaml');

app.get('/user/:id', openapiValidator.validate, (req, res) => {
  const id = req.params.id;
  const user = model.getUser(id);
  res.json(user);
});

// Openapi generated validator error handler
app.use((err, req, res, next) => {
  if (err instanceof openapiValidator.InputValidationError) {
    return res.status(400).json({ inputValidationErrors: err.errors });
  }
  next(err);
});

app.listen('3000', () => console.log('listening on localhost:3000'));