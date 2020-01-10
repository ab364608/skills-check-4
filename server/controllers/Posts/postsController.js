
search = (req, res) => {
    const db = req.app.get('db');
    const {search} = req.query;

    // db.get_user_posts(search)
    if(!search) {
        db.get_all_posts().then(response => {
            res.status(200).json(response)
        })
    } else {
        db.get_posts(search).then(response => {
            console.log(response)
            res.status(200).json(response)
        })
    }
}
get
module.exports = {
    search
}