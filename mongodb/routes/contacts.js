var express = require("express");
var router = express.Router();

var Contact = require("../models/contact");

// READ
router.get("/", (req, res) => {
  Contact.find((err, contacts) => {
    console.log(contacts);
    res.render("home.twig", { title: "Contact list", contacts: contacts });
  });
});

// CREATE
router.post("/", (req, res) => {
  new Contact({
    FullName: req.body.FullName,
    Phone: req.body.Phone,
  }).save((err, newcontact) => {
    if (err) {
      console.log("error message :" + err);
    } else {
      res.redirect("/contacts");
    }
  });
});

// UPDATE
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const ContactToUpdate = {
    FullName: req.body.FullName,
    Phone: req.body.Phone,
  };

  Contact.findByIdAndUpdate(id, ContactToUpdate, { new: true })
    .then((contact) => {
      console.log("new contact : ", contact);
      res.redirect("/contacts");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// DELETE
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Contact.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting contact" });
    } else {
      console.log("Deleted contact:", result);
      res.redirect("/contacts");
    }
  });
});

//Search contact by id
router.post("/search/id", (req, res) => {
    console.log(req.body.idContact);
    // const { id } = req.body.idContact;

    // console.log("this is the contact id object: ", id);
    Contact.findOne({ _id: req.body.idContact }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error contact not found" });
      } else {
        console.log("contact:", result);
        Contact.find((err, contacts) => {
            res.render("home.twig", { title: "Contact list", contacts: contacts, foundContact:result });
          });
      }
    });
  });

// EDIT form
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Contact.findOne({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error contact not found" });
    } else {
      const contact = result;
      res.render("form", { contact, isUpdate: true });
    }
  });
});

// ADD form
router.get("/new", (req, res) => {
  res.render("form");
});

module.exports = router;
