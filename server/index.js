const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const Contacts = require("./model/Contacts");

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.get("/", (req, res) => {
  res.json("test ok");
});

app.post("/contacts", async (req, res) => {
  console.log("body", req.body);
  const { name, email, phone } = req.body;
  try {
    const contact = await Contacts.create({
      name,
      email,
      phone,
    });
    res.status(200).json(contact);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/contacts", async (req, res) => {
  const contact = await Contacts.find().select("-__v").lean();
  res.json(contact);
});

app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Contacts.findById(id));
});

app.put("/contacts/:id", async ({ body, params }, res) => {
  const { id } = params;
  console.log("body", body);
  try {
    console.log("update id:", id);

    await Contacts.findByIdAndUpdate(
      { _id: id },
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
      }
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(422);
  }
});

app.delete("/contacts/:id", async ({ params: { id } }, res) => {
  const contact = await Contacts.deleteOne({ _id: id });
  res.json(contact);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
