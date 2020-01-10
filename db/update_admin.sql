UPDATE users
SET isadmin = true
WHERE username = $1;