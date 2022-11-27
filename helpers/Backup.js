const Backups = {};
const UserListener = require('./UserListener');
const WeightListener = require('./WeightListener');
const { Parser } = require('json2csv');
const EmailCtrl = require('./EmailCtrl');

Backups.databaseBackups = async function(){
    const allUsers = await UserListener.getAllUsers();
    const allWeights = await WeightListener.getAllWeights();
    const json2csvParser = new Parser();
    const csvAllUsers = json2csvParser.parse(JSON.parse(JSON.stringify(allUsers, null, 2)));
    const csvAllWeights = json2csvParser.parse(JSON.parse(JSON.stringify(allWeights, null, 2)));
    EmailCtrl.sendEmail('plushyzeus35@gmail.com', 'Database Backup', 'Database Backup',[{filename: 'weights.csv', content: csvAllWeights}, {filename: 'users.csv', content: csvAllUsers}]);
}

module.exports = Backups;