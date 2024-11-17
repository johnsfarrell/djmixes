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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../connection");
var table_1 = require("../table");
var getUser_1 = require("../search/getUser");
var updateUser_1 = require("../update/updateUser");
var getMixes_1 = require("../search/getMixes");
var updateMixes_1 = require("../update/updateMixes");
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, createUserResult, user, insertMixesResult, updateResult, mixes, deleteMixesResult, checkMixes, deleteUserResult, deletedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, connection_1.default)()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, (0, table_1.default)()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, updateUser_1.createUser)('testuser', 'testuser@example.com', 'securepassword123', 0)];
                case 3:
                    createUserResult = _a.sent();
                    console.log('Create User Result:', createUserResult);
                    return [4 /*yield*/, (0, getUser_1.getUserByName)('testuser')];
                case 4:
                    user = _a.sent();
                    console.log('Get User Result:', user);
                    return [4 /*yield*/, (0, updateMixes_1.insertMixes)(1, 'Title', 'Artist', 'Album', '2024-11-01', 'file_url', 'cover_url', 'tag', 'public', true)];
                case 5:
                    insertMixesResult = _a.sent();
                    console.log('Insert mixes Result:', insertMixesResult);
                    return [4 /*yield*/, (0, updateMixes_1.updateMixes)(1, 1, 'Updated Title', 'Updated Artist', 'Updated Album', '2024-11-02', 'file_url2', 'cover_url2', 'tag1', 'private', false)];
                case 6:
                    updateResult = _a.sent();
                    console.log('Update mixes Result:', updateResult);
                    return [4 /*yield*/, (0, getMixes_1.getMixes)(1)];
                case 7:
                    mixes = _a.sent();
                    console.log('Get Mixes Result:', mixes);
                    return [4 /*yield*/, (0, updateMixes_1.deleteMixes)(1)];
                case 8:
                    deleteMixesResult = _a.sent();
                    console.log('Delete Mixes Result:', deleteMixesResult);
                    return [4 /*yield*/, (0, getMixes_1.getMixes)(1)];
                case 9:
                    checkMixes = _a.sent();
                    console.log('Deleted Mixes Result:', checkMixes ? checkMixes : 'Mixes successfully deleted.');
                    // Drop mixes table
                    return [4 /*yield*/, connection.execute("DROP TABLE IF EXISTS mix")];
                case 10:
                    // Drop mixes table
                    _a.sent();
                    return [4 /*yield*/, (0, updateUser_1.deleteUser)('testuser')];
                case 11:
                    deleteUserResult = _a.sent();
                    console.log('Delete User Result:', deleteUserResult);
                    return [4 /*yield*/, (0, getUser_1.getUserByName)('testuser')];
                case 12:
                    deletedUser = _a.sent();
                    console.log('Deleted User Result:', deletedUser ? deletedUser : 'User successfully deleted.');
                    // Drop users table
                    return [4 /*yield*/, connection.execute("DROP TABLE IF EXISTS users")];
                case 13:
                    // Drop users table
                    _a.sent();
                    return [4 /*yield*/, connection.end()];
                case 14:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
runTests().catch(function (error) {
    console.error('Error running tests:', error);
});
