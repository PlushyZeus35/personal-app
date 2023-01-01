var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
const UserListener = require('../helpers/UserListener');
const WeightListener = require('../helpers/WeightListener');
const Crypto = require('../helpers/Crypto');
const Binance = require('../helpers/BinanceHelper');
const BinanceListener = require('../helpers/BinanceListener');
const BirthdayListener = require('../helpers/BirthdayListener');
const BookListener = require('../helpers/BookListener');
var router = express.Router();

/* GET Index page. */
router.get('/', isLoggedIn,async (req, res) => {
    const nextBirthdays = await BirthdayListener.getNextBirthdays(3, req.user.id);
    console.log(nextBirthdays);
    const thisMonthBirthdaysCount = await BirthdayListener.getCountBirthdaysMonth(new Date(Date.now()).getMonth()+1, req.user.id);
    const activeBooks = await BookListener.getActiveBook(req.user.id);
    let activeBook = [];
    for(let i=0; i<activeBooks.length; i++){
        if(new Date(activeBooks[i].initDate) < new Date(Date.now())){
            activeBook.push(activeBooks[i])
        } 
    }
    const today = Date.now();
    console.log(today)
    let percentage = 0;
    if(activeBook.length>0){
        let diffInitToday = (today - new Date(activeBook[0].initDate).getTime()) / (1000 * 3600 * 24);
        let diffInitEnd = (new Date(activeBook[0].predictedFinished).getTime() - new Date(activeBook[0].initDate).getTime()) / (1000 * 3600 * 24);
        //const bookInitDate = new Date(activeBook[0].initDate).getTime();
        //const bookFinishDate = new Date(activeBook[0].predictedFinished).getTime() - bookInitDate;
        percentage = Math.round((diffInitToday/diffInitEnd) * 100);
    }
    console.log(percentage)
    const userWeights = await WeightListener.getUsersWeights(req.user.id);
    res.render('home', {nextBirthdays: nextBirthdays, thisMonthBirthdaysCount: thisMonthBirthdaysCount, activeBook: activeBook, bookPercentage: percentage, userWeights: userWeights});
})

/* GET Login page. */
router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
})

router.get('/birthday', isLoggedIn,async (req, res) => {
    const birthdays = await BirthdayListener.getBirthdays(req.user.id);
    res.render('birthday', {birthdays: birthdays});
})

router.post('/birthday', isLoggedIn, async (req, res) => {
    const birthname = req.body.birthname;
    const birthday = req.body.birthday;
    const birthmonth = req.body.birthmonth;
    const newBirth = await BirthdayListener.setBirthday(birthname,birthday,birthmonth,req.user.id);
    if(newBirth){
        req.flash('Success', ['Actualización correcta', 'El cumpleaños ha sido añadido con éxito.']);
    }
    res.redirect('/birthday');
})

router.post('/editbirthday', isLoggedIn, async (req, res) => {
    const birthId = req.body.birthid;
    const birthname = req.body.birthname;
    const birthday = req.body.birthday;
    const birthmonth = req.body.birthmonth;
    const newBirth = await BirthdayListener.updateBirthday(birthname,birthday,birthmonth,birthId);
    res.redirect('/birthday');
})

router.get('/birthday/delete/:id', isLoggedIn, async(req, res) => {
    const birthId = req.params.id;
    const birth  = await BirthdayListener.getBirthday(birthId);
    if(birth.userId == req.user.id){
        if(await BirthdayListener.deleteBirthday(birthId)>0){
            req.flash('Success', ['Actualización correcta', 'El cumpleaños ha sido eliminado con éxito.']);
        }
    }
    res.redirect('/birthday');
})

router.post('/profile', isLoggedIn, async (req, res) => {
    const email = req.body.editedEmail;
    await UserListener.updateUser(req.user.id,email);
    req.user.email = email;
    res.redirect('/profile');
})

router.get('/registro', (req, res) => {
    res.render('register');
})

router.get('/weights', isLoggedIn, async (req, res) => {
    const actualUser = req.user;
    const userWeightData = await WeightListener.getUsersWeights(req.user.id);
    res.render('weight',{userWeightData, actualUser});
})

router.post('/weights', isLoggedIn, async (req, res) => {
    const weightValue = req.body.weightValue;
    const dateValue = req.body.dateValue;
    const newWeight = await WeightListener.setNewWeight(dateValue, weightValue, req.user.id);
    res.redirect('/');
})

router.get('/libros', isLoggedIn,async (req, res) => {
    const userBooks = await BookListener.getBooks(req.user.id);
    console.log(userBooks);
    res.render('books', {books: userBooks});
})

router.post('/libros', isLoggedIn,async (req, res) => {
    const bookTitle = req.body.bookTitle;
    const bookAuthor = req.body.bookAuthor;
    const bookPages = req.body.bookPages;
    const userId = req.user.id;
    const rest = await BookListener.setBook(bookTitle, bookAuthor, bookPages, userId);
    console.log({bookAuthor, bookTitle, bookPages})
    console.log(rest);
    res.redirect('/libros');
})

router.post('/readBook', isLoggedIn, async (req, res) => {
    const bookId = req.body.bookId;
    const initDate = new Date(req.body.initDate);
    const finishDate = new Date(req.body.finishDate);
    const predictedPPD = parseFloat(req.body.predictedPPD);
    console.log(req.body)
    console.log({initDate, finishDate, predictedPPD});
    await BookListener.updateBookDates(initDate,null,finishDate,bookId);
    await BookListener.updateBookPPD(predictedPPD, null, bookId);
    await BookListener.updateBookStatus(true, true, false, bookId);

    res.redirect('/libros');
})

router.post('/finishBook', isLoggedIn, async (req, res) => {
    const bookId = req.body.bookId;
    const endPPD = req.body.ppdFinal;
    const endDate = req.body.endDate;
    const selectedBook = await BookListener.getBook(bookId);
    console.log({bookId, endPPD, endDate});
    await BookListener.updateBookDates(selectedBook.initDate, endDate, selectedBook.predictedFinished, bookId);
    await BookListener.updateBookPPD(selectedBook.predictedPPD, endPPD, bookId);
    await BookListener.updateBookStatus(true,true,true,bookId);
    res.redirect('/libros');
})

router.get('/deleteBook/:bookId', isLoggedIn, async (req, res) => {
    const bookId = req.params.bookId;
    console.log(bookId);
    await BookListener.deleteBook(bookId);
    res.redirect('/libros');
})

module.exports = router;