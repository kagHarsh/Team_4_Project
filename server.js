const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hritu@123',
    database: 'exldemo'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

app.get('/max-temperature', (req, res) => {
    const query = `
        SELECT City, MAX(tempmax) AS max_temperature
        FROM urban_air_quality_data
        GROUP BY City
        ORDER BY max_temperature DESC
        LIMIT 10;
    `;
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
