const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection (mysql2/promise)
let db;
(async () => {
    try {
        db = await mysql.createConnection({
            host: "localhost", // not port
            port: 3306, // port number separately
            user: "W2_89574_Rushikesh",
            password: "manager",
            database: "sms_db"
        });
        console.log("MySQL connected");
    } catch (err) {
        console.error("MySQL connection failed:", err);
    }
})();

// Root route
app.get("/", (req, res) => {
    res.send("Hello World from Express!");
});

// Get all amenities for a society, with status for given user
app.get("/amenities/:societyId/:userId", async (req, res) => {
    const { societyId, userId } = req.params;
    try {
        const [results] = await db.query(
            `SELECT *, 
             CASE 
                WHEN userId IS NULL THEN 'available'
                WHEN userId = ? THEN 'booked'
                ELSE 'taken'
             END AS status
             FROM amenities
             WHERE societyId = ?`,
            [userId, societyId]
        );
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Book an amenity
app.put("/amenities/book/:id", async (req, res) => {
    const { userId } = req.body;
    const amenityId = req.params.id;

    try {
        const [rows] = await db.query(
            "SELECT userId FROM amenities WHERE id = ?",
            [amenityId]
        );

        if (!rows.length) {
            return res.status(404).json({ message: "Amenity not found" });
        }

        if (rows[0].userId && rows[0].userId !== userId) {
            return res.status(400).json({ message: "Already taken" });
        }

        await db.query(
            "UPDATE amenities SET userId = ? WHERE id = ?",
            [userId, amenityId]
        );

        res.json({ message: "Amenity booked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error booking amenity" });
    }
});

// Unbook an amenity
app.put("/amenities/unbook/:id", async (req, res) => {
    const { userId } = req.body;
    const amenityId = req.params.id;

    try {
        const [result] = await db.query(
            "UPDATE amenities SET userId = NULL WHERE id = ? AND userId = ?",
            [amenityId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "You can only unbook your own booking" });
        }

        res.json({ message: "Amenity unbooked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error unbooking amenity" });
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
