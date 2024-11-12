"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const usersTable_1 = __importDefault(require("./tables/usersTable"));
const mixsTable_1 = __importDefault(require("./tables/mixsTable"));
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        const tableQueries = [
            { name: 'users', query: usersTable_1.default.createTableQuery },
            { name: 'mixs', query: mixsTable_1.default.createTableQuery }
        ];
        try {
            const dbName = 'test';
            const [databases] = yield connection.query('SHOW DATABASES LIKE ?', [dbName]);
            if (databases.length === 0) {
                yield connection.execute(`CREATE DATABASE \`${dbName}\``);
                console.log(`Database "${dbName}" created.`);
            }
            else {
                console.log(`Database "${dbName}" already exists.`);
            }
            yield connection.changeUser({ database: dbName });
        }
        catch (error) {
            console.error('Database Creation Error:', error);
        }
        try {
            const dbName = 'test'; // TOCHECK: if we need another dbname here
            for (const table of tableQueries) {
                yield connection.execute(table.query);
                console.log(`Table '${table.name}' created or already exists.`);
            }
        }
        catch (error) {
            console.error('Tables Creation Error:', error);
        }
    });
}
exports.default = createTables;
