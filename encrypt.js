const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on('errorLogger', (message) => {
    const errorMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile('errors.txt', errorMessage, (err) => {
        if (err){
            console.log('Failed to write to log file:', err)
        }
    });
});


const encryptString = async (myPlaintextPassword) => {
    try {
        const hash = await bcrypt.hash(myPlaintextPassword.word, saltRounds);
        return hash;
    } catch (error) {
        console.log(error);
        emitter.emit('errorLogger', `Error in encryptString: ${error.message}`);
    }
}

const compareString = async (originalString, hash) => {
    try {
        const result = await bcrypt.compare(originalString, hash);
        return result;
    } catch (error) {
        console.log(error);
        emitter.emit('errorLogger', `Error in compareString: ${error.message}`);
    }
}


module.exports = {
    encryptString,
    compareString
}