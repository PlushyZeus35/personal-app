var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
const UserListener = require('../helpers/UserListener');
const WeightListener = require('../helpers/WeightListener');
const Crypto = require('../helpers/Crypto');
const TaskListener = require('../helpers/TaskListener');
const Binance = require('../helpers/BinanceHelper');
const BinanceListener = require('../helpers/BinanceListener');
const BirthdayListener = require('../helpers/BirthdayListener');
const BookListener = require('../helpers/BookListener');
const PdfReader = require('../helpers/Pdf2Json');
const Task = require('../models/Task');
const multer = require('multer');
const TicketAdapter = require('../helpers/TicketAdapter');
const ShopListener = require('../helpers/ShopListener');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        let userId = req.user ? req.user.id : 0;
        cb(null, userId + '-' + Date.now() + '-' + file.originalname);
    }
})
const upload = multer({storage:storage});
var fs = require('fs');
const { DateTime, DATE_SHORT } = require("luxon");
const ShopHelper = require('../helpers/ShopHelper');
var router = express.Router();
const TicketHandler = require('../helpers/TicketHandler');
const UserHandler = require('../helpers/UserHandler');

/* GET Index page. */
router.get('/', isLoggedIn,async (req, res) => {
    const userBirthdays = await BirthdayListener.getBirthdays(req.user.id);
    const nextBirthdays = [];
    for(let birth of userBirthdays){
        let birthDate = new Date(2023, birth.month-1, birth.day);
        if(birthDate>new Date() && nextBirthdays.length<3){
            nextBirthdays.push(birth)
        }
    }
    const thisMonthBirthdaysCount = await BirthdayListener.getCountBirthdaysMonth(new Date(Date.now()).getMonth()+1, req.user.id);
    const activeBooks = await BookListener.getActiveBook(req.user.id);
    let activeBook = [];
    for(let i=0; i<activeBooks.length; i++){
        if(new Date(activeBooks[i].initDate) < new Date(Date.now())){
            activeBook.push(activeBooks[i])
        } 
    }
    const today = Date.now();
    let percentage = 0;
    if(activeBook.length>0){
        let diffInitToday = (today - new Date(activeBook[0].initDate).getTime()) / (1000 * 3600 * 24);
        let diffInitEnd = (new Date(activeBook[0].predictedFinished).getTime() - new Date(activeBook[0].initDate).getTime()) / (1000 * 3600 * 24);
        //const bookInitDate = new Date(activeBook[0].initDate).getTime();
        //const bookFinishDate = new Date(activeBook[0].predictedFinished).getTime() - bookInitDate;
        percentage = Math.round((diffInitToday/diffInitEnd) * 100);
    }
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

router.get('/tasks', isLoggedIn, async (req, res) => {
    const userTasks = await TaskListener.getUserTask(req.user.id);
    res.render('todo', {userTasks: userTasks});
})

router.get('/tasks/do/:taskId', isLoggedIn, async (req, res) => {
    const taskId = req.params.taskId;
    await TaskListener.doTask(taskId);
    console.log(taskId);
    res.redirect('/tasks')
})

router.post('/tasks', isLoggedIn, async (req, res) => {
    const taskName = req.body.name;
    const taskType = req.body.type;
    console.log({taskName, taskType})
    if(taskName){
        const daily = taskType?true:false;
        let userId = req.user.id;
        const newTask = await TaskListener.createTask(taskName,daily,req.user.id);
    }
    res.redirect('/tasks')
})

router.post('/tasks/delete', isLoggedIn, async (req, res) => {
    const taskId = req.body.taskId;
    console.log(taskId);
    if(taskId){
        await TaskListener.deleteTask(taskId)
    }
    res.redirect('/tasks')
})

router.post('/tasks/edit', isLoggedIn, async (req, res) => {
    const taskId = req.body.taskId;
    const taskName = req.body.name;
    console.log({taskId, taskName});
    if(taskId && taskName)
        await TaskListener.updateTask(taskName,taskId)
    res.redirect('/tasks');
})

router.get('/shop',isLoggedIn ,async(req, res) => {
    let userHandler = new UserHandler(req.user.id);
    const userTickets = await userHandler.ticketsInfo;
    const ticketStats = await userHandler.ticketsStats;
    console.log(userTickets)
    res.render('shop', {tickets: userTickets, stats: ticketStats});
})

router.post('/shop', isLoggedIn, upload.single('myFile'), async (req, res) => {
    try{
        const ticketInfo = await PdfReader.getTicketInfo(req.file.path);
        const shops = await ShopListener.getShops();
        const availableShops = [];
        for(let shop of shops){
            availableShops.push({id: shop.id, name:shop.name});
        }
        const ticketObject = await TicketAdapter.parseTicket(ticketInfo,availableShops);
        console.log(ticketObject)
        const ticket = await ShopListener.createTicket(ticketObject.shop, ticketObject.date, ticketObject.total, req.user.id);
        fs.unlinkSync(req.file.path);
        const createdProducts = [];
        for(let product of ticketObject.products){
            console.log(product)
            const [dbProduct, created] = await ShopListener.getOrCreateProduct(product.name, product.price, ticketObject.shopId);
            if(created){
                createdProducts.push(dbProduct)
            }
            let userId = req.user ? req.user.id : 1;
            await ShopListener.createBuy(product.amount, userId, dbProduct.id, ticket.id);
        }
        const response = {
            ticketInfo: ticketObject,
            createdProducts: createdProducts
        }
        console.log(response);
        res.json(response)
    }catch(error){
        res.json({error: error.toString()})
    }
    
    
})
/*
router.post('/shop', upload.single('myFile'), async (req, res) => {
    try{
        const ticketInfo = await PdfReader.getTicketInfo(req.file.path);
        const shops = await ShopListener.getShops();
        const availableShops = [];
        for(let shop of shops){
            availableShops.push({id: shop.id, name:shop.name});
        }
        const ticketObject = await TicketAdapter.parseTicket(ticketInfo,availableShops);
        fs.unlinkSync(req.file.path);
        const response = {
            ticketInfo: ticketObject
        }
        res.json(response)
    }catch(error){
        res.json({error: error.toString()})
    }
    
    //ol.list-group.list-group-numbered
                each buy in buys
                    li.list-group-item.d-flex.justify-content-between.align-items-start
                        .ms-2.me-auto
                            .fw-bold #{buy.product}
                            | #{buy.date} #{buy.shop} 
                        span.badge.bg-primary.rounded-pill #{buy.amount}
})*/

router.get('/ticket/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;
    let ticketHandler = new TicketHandler(ticketId);
    const ticketInfo = await ticketHandler.productsInfo;
    console.log(ticketInfo)
    if(ticketInfo.error){
        res.render('error')
    }else{
        res.render('ticket', {ticket: ticketInfo});
    } 
})

router.get('/error', async (req, res) => {
    res.render('error')
})

router.get('/test', async (req, res) => {
    let uH = new UserHandler(1);
    /*let start = new Date();
    console.log(await tH.productsInfo)
    let end = new Date() - start;
    console.log(`Tiempo de ejecución ${end} ms`);*/

    console.log(await uH.ticketsStats)
    
    
    res.render('error')
})


module.exports = router;