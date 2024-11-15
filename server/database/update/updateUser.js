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
exports.createUser = createUser;
exports.deleteUser = deleteUser;
const connection_1 = __importDefault(require("../connection"));
function createUser(username, email, password, registration_method) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const [existingUsers] = yield connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [
                username,
                email
            ]);
            if (existingUsers.length > 0) {
                console.log('User already exists with the same username or email.');
                return null;
            }
            const [result] = yield connection.query('INSERT INTO users (username, email, password, registration_method) VALUES (?, ?, ?, ?)', [username, email, password, registration_method]);
            console.log(`User created with ID: ${result.insertId}`);
            return result.insertId;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    });
}
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const [result] = yield connection.query('DELETE FROM users WHERE username = ?', [username]);
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    });
}
