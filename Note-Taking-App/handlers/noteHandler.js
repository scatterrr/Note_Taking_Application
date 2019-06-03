"use strict"
const SQLQuery = require('./notesWordsSQLQuery')
const SQLSTATEMENT = require('./notesWordsSQLStatement')


const getNotesWordsFunc = async function (req, res, next) {

    let user_id = [req.user.id]
    let result = await SQLQuery.sqlQueryWithArray(SQLSTATEMENT.getnoteWordsSQL, user_id)
    let username = await SQLQuery.sqlQueryWithArray(SQLSTATEMENT.getUsername, user_id)
    let renderObject = { renderArrayProperty: result, username: username[0]['username'] };

    res.render('content', renderObject)
}

const getSpecificNotesWordsFunc = async function (req, res, next) {

    let array = [req.params.id]
    let specificNoteContent = await SQLQuery.sqlQueryWithArray(SQLSTATEMENT.getSpecificNoteWordsSQL, array)
    let content = specificNoteContent[0].content

    res.send(content)
}

const postNotesWordsFunc = async function (req, res, next) {

    let array = await [req.user.id, req.body.data];
    SQLQuery.sqlQueryWithArray(SQLSTATEMENT.postnoteWordsSQL, array)

    res.redirect('/notesWords');
}

const putNoteWordsIdFunc = async function (req, res, next) {

    let array = [req.query.name, req.params.id]
    SQLQuery.sqlQueryWithArray(SQLSTATEMENT.putnoteWordsSQL, array)

    res.end();
}

const deleteNoteWordsIdFunc = async function (req, res) {

    let number = [Number(req.params.id)];
    await SQLQuery.sqlQueryWithArray(SQLSTATEMENT.deletenoteWordsSQL, number);

    res.end();
}




module.exports.getNotesWordsFunc = getNotesWordsFunc;
module.exports.getSpecificNotesWordsFunc = getSpecificNotesWordsFunc;
module.exports.postNotesWordsFunc = postNotesWordsFunc;
module.exports.putNoteWordsIdFunc = putNoteWordsIdFunc;
module.exports.deleteNoteWordsIdFunc = deleteNoteWordsIdFunc;
