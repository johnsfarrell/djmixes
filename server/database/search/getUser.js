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
exports.getUserByName = getUserByName;
const connection_1 = __importDefault(require("../connection"));
function getUserByName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const [rows] = yield connection.execute('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                // Cast the rows to User type before returning
                return rows[0]; // Return the first user
            }
            else {
                console.log(`User with name ${username} not found or has been deleted.`);
                return null; // Return null if no user is found
            }
        }
        catch (error) {
            console.error('Get User By Name Error:', error);
            throw error; // Re-throw the error if it occurs
        }
    });
}
