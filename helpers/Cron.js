const cron = require('node-cron');
const Backup = require('./Backup');
// Tasks running every minute
cron.schedule('* * * * *', () => {
  //console.log('running a task every minute');
});

// Tasks running every day

// Tasks running every Monday
cron.schedule('0 0 2 * * Monday', () => {
  Backup.databaseBackups();
});