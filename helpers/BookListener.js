const BookListener = {};
const Book = require('../models/Book');

BookListener.getBook = async(bookId) => {
    return await Book.findByPk(bookId);
}

BookListener.deleteBook = async(bookId) => {
    return await Book.destroy({
        where: {
            id: bookId
        }
    })
}

BookListener.getBooks = async(userId) => {
    return await Book.findAll({
        where: {
            userId: userId
        }
    })
}

BookListener.setBook = async(title, author, pages, userId) => {
    return await Book.create({
        title: title,
        author: author,
        pages: pages,
        userId: userId
    })
}

BookListener.updateBookStatus = async(owned, reading, finished, bookId) => {
    return await Book.update({
        owned: owned,
        reading: reading,
        finished: finished
    },{
        where:{id: bookId}
    })
}

BookListener.updateBookDates = async(initDate, finishDate, predictedFinished, bookId) => {
    return await Book.update({
        initDate: initDate,
        finishDate: finishDate,
        predictedFinished: predictedFinished
    },{
        where:{id: bookId}
    })
}

BookListener.updateBookPPD = async(predictedPPD, PPD, bookId) => {
    return await Book.update({
        predictedPPD: predictedPPD,
        PPD: PPD
    },{
        where:{id: bookId}
    })
}

module.exports = BookListener;