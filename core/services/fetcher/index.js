const connection = require('../connection').Connection();
const {PartSchema} = require('../schema');

class Fetcher {
    constructor() {
        this._db = null;
        this._partModel = null;
        this._COLLECTION_NAME = 'part';
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            if ( this._db ) {
                resolve(this._db);
            } else {
                connection.connect()
                    .then((db) => {
                        this._db = db;
                        resolve(db);
                    })
                    .catch(reject);
            }
        });
    }

    get partModel() {
        return this._partModel ? this._partModel : this._partModel = this._db.model(this._COLLECTION_NAME, PartSchema);
    }

    fromKeywords(keywords = '') {
        return new Promise((resolve, reject) => {
            this.getConnection()
                .then(() => {
                    this.partModel.find({}, (err, parts) => {
                        if ( err ) throw err;
                        resolve(parts);
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = {
    Fetcher: Fetcher
};
