const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/Malguard_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------- USER SCHEMA ----------------
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// ---------------- FILE SCHEMA ----------------
const FileSchema = new mongoose.Schema({
  userId: String, // Links file to a specific user
  name: String,
  type: String,
  size: Number,
  uri: String,
  date: { type: Date, default: Date.now },
});

const File = mongoose.model("File", FileSchema);

// ---------------- USER SIGNUP ----------------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash Password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ---------------- USER LOGIN ----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "❌ User not found" });

  const isMatch = await bcrypt.compare(password, user.password); // Compare Hashed Password
  if (!isMatch) return res.status(400).json({ error: "❌ Invalid credentials" });

  const token = jwt.sign({ id: user._id, name: user.name }, "secretkey", { expiresIn: "1h" });
  res.json({ token, name: user.name, userId: user._id });
});

// ---------------- FILE UPLOAD ----------------
app.post("/upload", async (req, res) => {
  try {
    const { userId, files } = req.body;

    if (!userId || !files || files.length === 0) {
      return res.status(400).json({ error: "❌ Invalid data received" });
    }

    // Save file metadata in MongoDB
    await File.insertMany(
      files.map((file) => ({
        ...file,
        userId,
      }))
    );

    res.status(201).json({ message: "✅ Files uploaded successfully!" });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- FETCH FILES FOR A USER ----------------
app.get("/files/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const files = await File.find({ userId });

    res.status(200).json(files);
  } catch (error) {
    console.error("❌ Fetch files error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- DELETE A FILE ----------------
app.delete("/delete-file/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    await File.findByIdAndDelete(fileId);
    res.status(200).json({ message: "✅ File deleted successfully!" });
  } catch (error) {
    console.error("❌ Delete file error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------- START SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
