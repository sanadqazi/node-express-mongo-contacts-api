const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');
//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Name, Email and Phone are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});


//@desc Get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = (req, res) => {
    Contact.findById(req.params.id).then(function (contact) {
        return res.status(200).json(contact);
    })
        .catch(function (err) {
            res.status(404);
            throw new Error("Name Email and Phone are mandatory!");
        });
}

//@desc Update Contact 
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    Contact.findById(req.params.id).then(function (contact) {
        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User don't have permission to update other user contacts");
        }

    })
        .catch(function (err) {
            res.status(404);
            throw new Error("Contact not found!");
        });

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(201).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };