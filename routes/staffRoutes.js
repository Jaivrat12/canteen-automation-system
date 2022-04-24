const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.send(`
        <h1>Welcome Staff Member!</h1>
        <form action="/orders/2/update" method="post">
            <select name="status">
                <option value="pending" selected>pending</option>
                <option value="accepted">accepted</option>
                <option value="preparing">preparing</option>
                <option value="completed">completed</option>
                <option value="delivered">delivered</option>
            </select>
            <input type="submit" value="UPDATE STATUS" />
        </form>
    `);
});

module.exports = router;