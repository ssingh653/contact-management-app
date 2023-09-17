const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  // _id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  phone: { type: String, required: [true, "Phone is required"] },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const ContactModel = mongoose.model("Contacts", ContactSchema);

module.exports = ContactModel;
