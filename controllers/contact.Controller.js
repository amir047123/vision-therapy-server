const Item = require("../models/contact.Model"); // Adjust the path based on your directory structure

exports.getAllContacts = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const contacts = await Item.find({
      name: new RegExp(search, "i"), // Assuming you're searching by name in your contact model
    })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

exports.createContact = async (req, res) => {
  try {
    const contact = new Item(req.body);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to save contact" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

exports.patchContact = async (req, res) => {
  try {
    const patchedContact = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(patchedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to patch contact" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const result = await Item.findByIdAndRemove(req.params.id); // Changing Contact to Item
    if (result) {
      res.json({ message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
