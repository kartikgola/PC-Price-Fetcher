const DB_URL = process.env.DB_URL;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const mongoose = require('mongoose');

class Connection {
    constructor() {
        this._connection = null;
    }
    get connection() {
        return this._connection;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this._connection = mongoose.createConnection(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/test?retryWrites=true`, {
                useNewUrlParser: true
            });

            this._connection.on('connected', resolve);
            this._connection.on('error', reject);
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this._connection.close();
            this._connection.on('close', resolve);
            this._connection.on('error', reject);
        });
    }
}

module.exports = {
    Connection: Connection
};
