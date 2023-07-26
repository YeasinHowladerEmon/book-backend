import  DeleteWriteOpResult  from 'mongodb';
import httpStatus from 'http-status';
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import { IBook } from "./book.interface";
import sendResponse from "../../../shared/sendResponse";
import { UpdateWriteOpResult } from 'mongoose';
import pick from '../../../shared/pick';
import { bookFilterableFields, paginationFields } from './book.constant';

const addNewBook = catchAsync(async (req:Request, res: Response) => {
    const result = await BookService.addNewBook(req.body, req.user);
    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Book create Successfully",
        data: result
    })

})
const books = catchAsync(async (req:Request, res: Response) => {
    const result = await BookService.books();
    sendResponse<IBook[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    })

})
const allBooks = catchAsync(async (req:Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    // const paginationOptions = pick(req.query, paginationFields);
    // console.log(filters,paginationOptions);
    const result = await BookService.allBooks(filters);
    //impliment filter and search
    sendResponse<IBook[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    })

})
const bookDetails = catchAsync(async (req:Request, res: Response) => {
    const result = await BookService.bookDetails(req.params.id);
    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    })

})
const bookReview = catchAsync(async (req:Request, res: Response) => {
    const id = req.params.id;
    const comment = req.body.comment;
    console.log(comment);
    const result = await BookService.bookReview(id, comment);
    sendResponse<UpdateWriteOpResult | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books Review Added Successfully",
        data: result
    })
})
const bookReviewGet = catchAsync(async (req:Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.bookReviewGet(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books Review Successfully",
        data: result
    })

})
const bookEdit = catchAsync(async (req:Request, res: Response) => {
    const id = req.params.id;
    const editData = req.body;
    const user = req.user;
    const result = await BookService.bookEdit(id, editData, user);
    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books retrived Successfully",
        data: result
    })

})
const bookDelete = catchAsync(async (req:Request, res: Response) => {
    const result = await BookService.bookDelete(req.params.id, req.user);
    sendResponse<IBook>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Books delete Successfully",
        data: result
    })

})


export const BookController ={
    allBooks,
    books,
    addNewBook,
    bookDetails,
    bookDelete,
    bookEdit,
    bookReview,
    bookReviewGet
}