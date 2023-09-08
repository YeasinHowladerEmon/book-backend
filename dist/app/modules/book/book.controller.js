"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const book_service_1 = require("./book.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const addNewBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.addNewBook(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Book create Successfully",
        data: result
    });
}));
const books = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.books();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    });
}));
const allBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    // const paginationOptions = pick(req.query, paginationFields);
    console.log(filters);
    const result = yield book_service_1.BookService.allBooks(filters);
    //impliment filter and search
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    });
}));
const bookDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.bookDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    });
}));
const bookReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const comment = req.body.comment;
    console.log(comment);
    const result = yield book_service_1.BookService.bookReview(id, comment);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books Review Added Successfully",
        data: result
    });
}));
const bookReviewGet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.bookReviewGet(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books Review Successfully",
        data: result
    });
}));
const bookEdit = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const editData = req.body;
    const user = req.user;
    const result = yield book_service_1.BookService.bookEdit(id, editData, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    });
}));
const bookDelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.bookDelete(req.params.id, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        messages: "Books delete Successfully",
        data: result
    });
}));
exports.BookController = {
    allBooks,
    books,
    addNewBook,
    bookDetails,
    bookDelete,
    bookEdit,
    bookReview,
    bookReviewGet
};
