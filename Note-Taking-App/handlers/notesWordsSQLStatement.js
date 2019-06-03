exports.getnoteWordsSQL = 
`SELECT id, user_id, content
FROM note
WHERE USER_ID = $1
ORDER BY id ASC`

exports.getUsername = 
`select username from note_users 
where id = $1`

exports.getSpecificNoteWordsSQL = 
`SELECT id, user_id, content FROM note
WHERE ID = $1
ORDER BY id ASC`

exports.postnoteWordsSQL =
`INSERT INTO NOTE (user_id, content)
VALUES($1,$2)`

exports.putnoteWordsSQL = 
`UPDATE NOTE
SET CONTENT = $1
WHERE ID = $2`

exports.deletenoteWordsSQL = 
`DELETE FROM note
WHERE id = $1
`
