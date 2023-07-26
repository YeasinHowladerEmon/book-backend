import { Model } from "mongoose";

export type IBook = {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    userId?: string;
    comments?: string[];
}

export type BookModel = Model<IBook, Record<string, unknown>>


export type IBookFilters = {
    searchTerm?: string;
    genre?: string,
    publicationYear?: string,
    author?: string,
    title?: string,
}


// export type IPaginationOptions = {
//     sortBy?: string;
//     sortOrder?: string;
// }


