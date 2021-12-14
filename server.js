const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();
const items = require('./data/items');

app.locals = {
  title: 'Packing List API',
  items
}

app.use(cors());
app.use(express.json());

app.get('/items', (req, res) => {
  res.status(200).json(app.locals.items);
});

app.post('/items', (req, res) => {
  let requiredParams = ['id', 'item', 'quantity', 'category'];
  const newItem = req.body;
  checkHasAllParams(requiredParams, newItem, res);
  checkCorrectDataType(requiredParams, newItem, res);

  app.locals.items.push(newItem);
  res.status(201).json({
    message: `Item #${newItem.id} has been added!`
  });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const { items } = app.locals;

  const itemToDelete = items.find(item => item.id == id);

  if (!itemToDelete) {
    return res.status(404).json({
      message: `No found item with id of #${id}.`
    })
  }

  app.locals.items = items.filter(item => item.id != id);

  res.status(200).json({
    message: `Item #${id} has been deleted`
  })
});

function checkHasAllParams(requiredParams, newData, response) {
  for (let i = 0; i < requiredParams.length; i++) {
    if (newData[requiredParams[i]] === undefined) {
      return response.status(422).json({
        message: `You are missing a required parameter of ${requiredParams[i]}`
      });
    }
  }
}

function checkCorrectDataType(requiredParams, newData, response) {
  if (typeof newData[requiredParams[0]] !== 'number') {
    return response.status(422).json({
      message: `Invalid format: id must be a number`
    });
  }

  if (typeof newData[requiredParams[1]] !== 'string') {
    return response.status(422).json({
      message: `Invalid format: item must be a string`
    });
  }

  if (typeof newData[requiredParams[2]] !== 'number') {
    return response.status(422).json({
      message: `Invalid format: quantity must be a number`
    });
  }

  if (typeof newData[requiredParams[3]] !== 'string') {
    return response.status(422).json({
      message: `Invalid format: category must be a string`
    });
  }
}

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});