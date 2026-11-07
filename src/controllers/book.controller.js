import {Book} from '../models/book.model.js';
import {validateBook, validatePartialBook} from '../validators/book.validator.js';
import {successResponse, errorResponse} from '../utils/responses.js';

//GET /books listando libros
export const getBooks = async(req, res) => {
    try{
        const books = await Book.find();
        return successResponse(res, 200, books, 'Lista de libros obtenida con exito');
    }
    catch(error){
        return errorResponse(res, 500, error.message, 'Error al obtener la lista de libros');
    }
};

//GET /books/:id  obteniendo libro
export const getBookById = async (req, res) => {
    try{
        const { id } = req.params;
        const book = await Book.findById(id);

        if(!book){
            return errorResponse(res, 404, null, 'El libro solicitado no existe');            
        }
        return successResponse(res, 200, book, 'Libro obtenido con exito');
    }
    catch(error){
        return errorResponse(res, 500, error.message, 'error al buscar el libro')
    }
};

//POST /books crear un nuevo libro
export const createBook = async (req, res) => {
    try{
        const validation = validateBook(req.body);

        if(!validation.success){
            return errorResponse(
                res, 400, validation.error.issues, 'Datos de entrada invalidos para crear el libro'
            );
        }

        const newBook = await Book.create(validation.data);
        return successResponse(res, 201, newBook, 'Libro creado exitosamente');
    }
    catch(error){
        //duplicado
        if(error.code === 11000){
            return errorResponse(res, 400, error.keyValue, 'El titulo del libro ya existe'); 
        }
        return errorResponse(res, 500, error.message, 'Error interno al crear el libro');
    }
};

//PATCH /book/:id - actualizar libro
export const updateBook = async (req, res) => {
    try{
        const {id} = req.params;
        const validation = validatePartialBook(req.body);

        if(!validation.success){
            return errorResponse(res, 400, validation.error.issues, 'Datos de entrada invalidos para actualizar');
        }
        const updatedBook = await Book.findByIdAndUpdate(id, validation.data, {
            new:true,
            runValidators: true
        });

        if(!updatedBook){
            return errorResponse(res, 404, null, 'No se encontro el libro para actualizar');
        }

        return successResponse(res, 200, updatedBook, 'Libro actualizado exitosamente');
    }
    catch(error) {
        return errorResponse(res, 500,error.message, 'Error al actualizar el libro');
    }
};

//DELETE /books/:id  Eliminar libro
export const deleteBook = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook){
            return errorResponse(res, 404, null, 'No se encontro el libro para eliminar');
        }

        return successResponse(res, 200,deletedBook, 'Libro eliminado exitosamente');
    }
    catch(error){
        return errorResponse(res, 500, error.message, 'Error al eliminar el libro')
    }
};