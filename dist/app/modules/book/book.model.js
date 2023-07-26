"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    },
    comments: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Book = (0, mongoose_1.model)('Book', exports.BookSchema);
