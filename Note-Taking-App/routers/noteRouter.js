"use strict"
const express = require('express');
const noteHandler = require('../handlers/noteHandler.js');
const noteRouter = express.Router();


noteRouter.get('/', noteHandler.getNotesWordsFunc);
noteRouter.get('/:id', noteHandler.getSpecificNotesWordsFunc);
noteRouter.post('/',noteHandler.postNotesWordsFunc);
noteRouter.put('/:id', noteHandler.putNoteWordsIdFunc);
noteRouter.delete('/:id', noteHandler.deleteNoteWordsIdFunc);


module.exports = noteRouter;