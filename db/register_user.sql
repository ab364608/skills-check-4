INSERT INTO users (username, password, img)
VALUES ($1, $2, $3)
RETURNING *;