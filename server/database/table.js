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
var connection_1 = require("./connection");
var usersTable_1 = require("./tables/usersTable");
var mixsTable_1 = require("./tables/mixsTable");
var commentsTable_1 = require("./tables/commentsTable");
var eventsTable_1 = require("./tables/eventsTable");
var likesTable_1 = require("./tables/likesTable");
var profilesTable_1 = require("./tables/profilesTable");
function createTables() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, tableQueries, dbName, databases, error_1, dbName, _i, tableQueries_1, table, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, connection_1.default)()];
                case 1:
                    connection = _a.sent();
                    tableQueries = [
                        { name: 'users', query: usersTable_1.default.createUsersTableQuery },
                        { name: 'mixs', query: mixsTable_1.default.createTableQuery },
                        { name: 'comments', query: commentsTable_1.default.createCommentTableQuery },
                        { name: 'events', query: eventsTable_1.default.createEventsTableQuery },
                        { name: 'likes', query: likesTable_1.default.createLikesTableQuery },
                        { name: 'user_profiles', query: profilesTable_1.default.createProfilesTableQuery }
                    ];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    dbName = 'test';
                    return [4 /*yield*/, connection.query('SHOW DATABASES LIKE ?', [dbName])];
                case 3:
                    databases = (_a.sent())[0];
                    if (!(databases.length === 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, connection.execute("CREATE DATABASE `".concat(dbName, "`"))];
                case 4:
                    _a.sent();
                    console.log("Database \"".concat(dbName, "\" created."));
                    return [3 /*break*/, 6];
                case 5:
                    console.log("Database \"".concat(dbName, "\" already exists."));
                    _a.label = 6;
                case 6: return [4 /*yield*/, connection.changeUser({ database: dbName })];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Database Creation Error:', error_1);
                    return [3 /*break*/, 9];
                case 9:
                    _a.trys.push([9, 14, , 15]);
                    dbName = 'test';
                    _i = 0, tableQueries_1 = tableQueries;
                    _a.label = 10;
                case 10:
                    if (!(_i < tableQueries_1.length)) return [3 /*break*/, 13];
                    table = tableQueries_1[_i];
                    return [4 /*yield*/, connection.execute(table.query)];
                case 11:
                    _a.sent();
                    console.log("Table '".concat(table.name, "' created or already exists."));
                    _a.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 10];
                case 13: return [3 /*break*/, 15];
                case 14:
                    error_2 = _a.sent();
                    console.error('Tables Creation Error:', error_2);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
exports.default = createTables;