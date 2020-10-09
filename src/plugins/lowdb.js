import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('hxyl');

const db = low(adapter);

db.defaults({
    device: {
        id: "",
        secret: "",
    },
}).write();

export default db;
