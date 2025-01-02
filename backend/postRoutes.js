const express = require('express');
const database = require("./connect");

// Function to get access to ObjectId method to access the ID
const ObjectId = require("mongodb").ObjectId;

// Router Object to create the Routes
let postRoutes = express.Router();

//! Access all posts
// https://localhost:3000/posts
postRoutes.route("/posts").get(async (req, res) => {
    try {
        // Access to database from export method from getDB in connect.js
        let db = database.getDb();
        // As we left empty object, it will return everything
        // We need to convert cursor that MongoDB gives us into an array
        let data = await db.collection("posts").find({}).toArray(); // Added parentheses to call toArray
        if (data.length > 0) {
            res.json(data); // Storing the data JSON object in res then given to frontend
        } else {
            throw new Error("Data was not found");
        }
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//! Access one post
// https://localhost:3000/posts/1234   now id=1234  we use /:id to access the id
postRoutes.route("/posts/:id").get(async (req, res) => {
    try {
        let db = database.getDb();
        // _{variable name} should be equal to /:{variable name}
        let data = await db.collection("posts").findOne({ _id: new ObjectId(req.params.id) });
        // Here we check for empty object instead of empty array Object.keys, as findOne gives us 1 object
        if (data) {
            res.json(data); // This will be an object
        } else {
            throw new Error("Data was not found");
        }
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//! Create New Post
// We are using different HTTP method so we can have the same routes
postRoutes.route("/posts").post(async (req, res) => {
    try {
        let db = database.getDb(); // Access the database
        // Variable that has the new entry object which then can be passed
        let mongoObject = {
            title: req.body.title,
            content: req.body.content,
            dateCreated: req.body.dateCreated,
            description: req.body.description,
            author: req.body.author
        };
        let data = await db.collection("posts").insertOne(mongoObject);
        res.json(data);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//! Update a post
// We are trying to put the data to some post with some ID
postRoutes.route("/posts/:id").put(async (req, res) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            // The primary purpose of $set is to allow partial updates to documents.
            // Instead of replacing the entire document, you can specify which fields to update.
            $set: {
                title: req.body.title,
                content: req.body.content,
                dateCreated: req.body.dateCreated,
                description: req.body.description,
                author: req.body.author
            }
        };

        // Use updateOne instead of insertOne, we need to pass the ID and the data need to update
        let data = await db.collection("posts").updateOne(
            { _id: new ObjectId(req.params.id) }, // Filter to find the document by its ID
            mongoObject
        );

        // Check if any document was modified
        if (data.modifiedCount > 0) {
            res.json({ message: "Post updated successfully" });
        } else {
            res.status(404).json({ message: "Post not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//! Delete a post
postRoutes.route("/posts/:id").delete(async (req, res) => {
    try {
        // Get the database connection
        let db = database.getDb();

        // Delete the post with the specified ID
        let result = await db.collection("posts").deleteOne({ _id: new ObjectId(req.params.id) });

        // Check if a document was deleted
        if (result.deletedCount > 0) {
            res.json({ message: "Post deleted successfully" });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Now I need to export this route in order to access this routes in frontend
// Now we need to mount this routes
module.exports = postRoutes; // It will be equal to the posts from server.js
