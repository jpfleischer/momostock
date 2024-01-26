const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const pool = new Pool({
    user: 'momo',
    host: 'momodb',
    database: 'momostock',
    password: 'newpassword',
    port: 5432,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});

const upload = multer({ storage: storage });

app.get('/foods', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM food');
        res.send(result.rows);
    } finally {
        client.release();
    }
});

app.get('/claimableFoods', async (req, res) => {
    const loggedInUser = req.query.user;
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT * FROM food WHERE owner = 'Unknown' AND (not_owned_by IS NULL OR NOT ($1 = ANY (not_owned_by)))", [loggedInUser]);
        res.send(result.rows);
    } finally {
        client.release();
    }
});

app.get('/claimableFoodsCount', async (req, res) => {
    const loggedInUser = req.query.user;
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT COUNT(*) FROM food WHERE owner = 'Unknown' AND (not_owned_by IS NULL OR NOT ($1 = ANY (not_owned_by)))", [loggedInUser]);
        res.send(result.rows[0].count);
    } finally {
        client.release();
    }
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ...
app.put('/foodsClaim/:id', async (req, res) => {
    const { id } = req.params;
    const { sharing, owner, not_owned_by } = req.body;
    const client = await pool.connect();
    try {
        await client.query('UPDATE food SET sharing = $1, owner = $2, not_owned_by = $3 WHERE id = $4', [sharing, owner, not_owned_by, id]);
        res.status(200).send('Food updated');
    } finally {
        client.release();
    }
});

app.post('/foodAdd', upload.single('image'), async (req, res) => {
    const { title, location, owner, expiration_date, sharing } = req.body;
    const image = req.file ? req.file.filename : null;
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO food (title, location, owner, expiration_date, image_location, sharing) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [title, location, owner, expiration_date, image, sharing]);
        res.status(201).json({ id: result.rows[0].id });
    } finally {
        client.release();
    }
});

app.put('/foodAdd/:id', async (req, res) => {
    const { id } = req.params;
    const { sharing, owner, not_owned_by } = req.body;
    const client = await pool.connect();
    try {
        await client.query('UPDATE food SET sharing = $1, owner = $2, not_owned_by = $3 WHERE id = $4', [sharing, owner, not_owned_by, id]);
        res.status(200).send('Food updated');
    } finally {
        client.release();
    }
});

app.post('/foodAdd/:id/image', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const image = req.file ? req.file.filename : null;
    const client = await pool.connect();
    try {
        await client.query('UPDATE food SET image_location = $1 WHERE id = $2', [image, id]);
        res.status(200).send('Image updated');
    } finally {
        client.release();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});