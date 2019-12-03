SELECT p.post, p.post_img FROM posts AS p
INNER JOIN users AS u ON u.user_id = p.user_id
WHERE p.post = $1;