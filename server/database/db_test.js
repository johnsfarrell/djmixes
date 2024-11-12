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
const table_1 = __importDefault(require("./table"));
const getUser_1 = require("./search/getUser");
const updateUser_1 = require("./update/updateUser");
const getMixes_1 = require("./search/getMixes");
const updateMixes_1 = require("./update/updateMixes");
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        yield (0, table_1.default)();
        const createUserResult = yield (0, updateUser_1.createUser)('testuser', 'testuser@example.com', 'securepassword123', 0);
        console.log('Create User Result:', createUserResult);
        const user = yield (0, getUser_1.getUserByName)('testuser');
        console.log('Get User Result:', user);
        const insertMixesResult = yield (0, updateMixes_1.insertMixes)(1, 1, 'Title', 'Artist', 'Album', '2024-11-01', 'file_url', 'cover_url', 'tag', 'public', true);
        console.log('Insert mixes Result:', insertMixesResult);
        const updateResult = yield (0, updateMixes_1.updateMixes)(1, 1, 'Updated Title', 'Updated Artist', 'Updated Album', '2024-11-02', 'file_url2', 'cover_url2', 'tag1', 'private', false);
        console.log('Update mixes Result:', updateResult);
        const mixes = yield (0, getMixes_1.getMixes)(1);
        console.log('Get Mixes Result:', mixes);
        const deleteMixesResult = yield (0, updateMixes_1.deleteMixes)(1);
        console.log('Delete Mixes Result:', deleteMixesResult);
        const checkMixes = yield (0, getMixes_1.getMixes)(1);
        console.log('Deleted Mixes Result:', checkMixes ? checkMixes : 'Mixes successfully deleted.');
        yield connection.execute(`DROP TABLE IF EXISTS mix`);
        const deleteUserResult = yield (0, updateUser_1.deleteUser)('testuser');
        console.log('Delete User Result:', deleteUserResult);
        const deletedUser = yield (0, getUser_1.getUserByName)('testuser');
        console.log('Deleted User Result:', deletedUser ? deletedUser : 'User successfully deleted.');
        yield connection.execute(`DROP TABLE IF EXISTS users`);
        yield connection.end();
    });
}
runTests().catch((error) => {
    console.error('Error running tests:', error);
});
