const {DB_URL, DB_PASS, DB_USER, DB_NAME} = process.env;
const mongoose = require('mongoose');
const {Status} = require('./status');

const CONNECTION_KEY = Symbol.for('PC_PARTS_CONNECTION');
const hasConnection = Object.getOwnPropertySymbols(global).indexOf(CONNECTION_KEY) >= 0;

class Connection {
    constructor() {
        this._connection = null;
        this._status = Status.Unintialized;
    }
    get connection() {
        return this._connection;
    }
    get status() {
        return this._status;
    }
    connect() {
        return new Promise((resolve, reject) => {
            if ( this.connection && this.status === Status.Connected ) {
                return resolve(this.connection);
            } else {
                this._connection = mongoose.createConnection(
                    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true`, {
                        useNewUrlParser: true
                    });

                this._connection.on('connected', () => {
                    this._status = Status.Connected;
                    resolve(this.connection);
                });
                this._connection.on('error', (args) => {
                    this._status = Status.Errored;
                    reject(args);
                });
            }
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this._connection.close();
            this._connection.on('close', (args) => {
                this._status = Status.Closed;
                resolve(args);
            });
            this._connection.on('error', reject);
        });
    }
}

if ( !hasConnection ) {
    global[CONNECTION_KEY] = new Connection();
}

const _singletonConnection = {};
Object.defineProperty(_singletonConnection, 'instance', {
    get: () => {
        return global[CONNECTION_KEY];
    }
});
Object.freeze(_singletonConnection);

module.exports = {
    Connection: () => {
        return _singletonConnection.instance;
    }
};
