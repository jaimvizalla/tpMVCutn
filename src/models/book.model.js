import {Schema, model } from 'mongoose';

const bookSchema = new Schema(
    {
        title: {
            type:String,
            required:[true, 'El titulo es obligatorio'],
            unique:true,
            trim: true
        },
        author:{
            type: String,
            requered: [true, 'El autor es obligatorio'],
            trim: true
        },
        publishedYear: {
            type: Number
        },
        genre: {
            type: String,
            trim: true
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Book = model('Book',bookSchema);