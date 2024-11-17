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
var getEvents_1 = require("../search/getEvents");
var getLikes_1 = require("../search/getLikes");
var getComments_1 = require("../search/getComments");
var getProfiles_1 = require("../search/getProfiles");
var updateComments_1 = require("../update/updateComments");
var updateEvents_1 = require("../update/updateEvents");
var updateLikes_1 = require("../update/updateLikes");
var updateProfiles_1 = require("../update/updateProfiles");
function testInsertComment() {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, mix_id, comment_text, insertResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = 1;
                    mix_id = 101;
                    comment_text = "This is a test comment.";
                    return [4 /*yield*/, (0, updateComments_1.insertComment)(user_id, mix_id, comment_text)];
                case 1:
                    insertResult = _a.sent();
                    console.log("Insert Comment Test Result:", insertResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testUpdateComment() {
    return __awaiter(this, void 0, void 0, function () {
        var comment_id, user_id, mix_id, comment_text, updateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment_id = 1;
                    user_id = 1;
                    mix_id = 101;
                    comment_text = "Updated test comment.";
                    return [4 /*yield*/, (0, updateComments_1.updateComment)(comment_id, user_id, mix_id, comment_text)];
                case 1:
                    updateResult = _a.sent();
                    console.log("Update Comment Test Result:", updateResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testDeleteComment() {
    return __awaiter(this, void 0, void 0, function () {
        var comment_id, deleteResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment_id = 1;
                    return [4 /*yield*/, (0, updateComments_1.deleteComment)(comment_id)];
                case 1:
                    deleteResult = _a.sent();
                    console.log("Delete Comment Test Result:", deleteResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testInsertEvent() {
    return __awaiter(this, void 0, void 0, function () {
        var title, date, artist_id, user_id, description, insertResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    title = "Music Festival";
                    date = new Date("2024-12-01");
                    artist_id = 42;
                    user_id = 7;
                    description = "A grand music festival featuring top artists.";
                    return [4 /*yield*/, (0, updateEvents_1.insertEvent)(title, date, artist_id, user_id, description)];
                case 1:
                    insertResult = _a.sent();
                    console.log("Insert Event Test Result:", insertResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testUpdateEvent() {
    return __awaiter(this, void 0, void 0, function () {
        var event_id, title, date, artist_id, user_id, description, updateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event_id = 1;
                    title = "Updated Music Festival";
                    date = new Date("2024-12-02");
                    artist_id = 42;
                    user_id = 7;
                    description = "An updated description for the music festival.";
                    return [4 /*yield*/, (0, updateEvents_1.updateEvent)(event_id, title, date, artist_id, user_id, description)];
                case 1:
                    updateResult = _a.sent();
                    console.log("Update Event Test Result:", updateResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testInsertLike() {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, mix_id, insertResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = 1;
                    mix_id = 101;
                    return [4 /*yield*/, (0, updateLikes_1.insertLike)(user_id, mix_id)];
                case 1:
                    insertResult = _a.sent();
                    console.log("Insert Like Test Result:", insertResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testDeleteLike() {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, mix_id, deleteResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = 1;
                    mix_id = 101;
                    return [4 /*yield*/, (0, updateLikes_1.deleteLike)(user_id, mix_id)];
                case 1:
                    deleteResult = _a.sent();
                    console.log("Delete Like Test Result:", deleteResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testInsertProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, bio, avatar_url, insertResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = 1;
                    bio = 'This is a test bio';
                    avatar_url = 'https://example.com/avatar.png';
                    return [4 /*yield*/, (0, updateProfiles_1.insertProfiles)(user_id, bio, avatar_url)];
                case 1:
                    insertResult = _a.sent();
                    console.log("Insert Profiles Test Result:", insertResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testUpdateProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        var profile_id, user_id, bio, avatar_url, updateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    profile_id = 1;
                    user_id = 1;
                    bio = 'Updated bio for testing';
                    avatar_url = 'https://example.com/updated-avatar.png';
                    return [4 /*yield*/, (0, updateProfiles_1.updateProfiles)(profile_id, user_id, bio, avatar_url)];
                case 1:
                    updateResult = _a.sent();
                    console.log("Update Profiles Test Result:", updateResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testDeleteProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, deleteResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_id = 1;
                    return [4 /*yield*/, (0, updateProfiles_1.deleteProfiles)(user_id)];
                case 1:
                    deleteResult = _a.sent();
                    console.log("Delete Profiles Test Result:", deleteResult);
                    return [2 /*return*/];
            }
        });
    });
}
//--------------------------------------------------------
function testGetComments() {
    return __awaiter(this, void 0, void 0, function () {
        var testMixId, commentsResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testMixId = 1;
                    return [4 /*yield*/, (0, getComments_1.getComments)(testMixId)];
                case 1:
                    commentsResult = _a.sent();
                    console.log("Comments for mix_id ".concat(testMixId, ":"), commentsResult);
                    return [2 /*return*/];
            }
        });
    });
}
function testGetLikes() {
    return __awaiter(this, void 0, void 0, function () {
        var testMixId, likeCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testMixId = 1;
                    return [4 /*yield*/, (0, getLikes_1.getLikes)(testMixId)];
                case 1:
                    likeCount = _a.sent();
                    console.log("Number of likes for mix_id ".concat(testMixId, ": ").concat(likeCount));
                    return [2 /*return*/];
            }
        });
    });
}
function testGetEventsBasedOnDj() {
    return __awaiter(this, void 0, void 0, function () {
        var testArtistId, events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testArtistId = 1;
                    return [4 /*yield*/, (0, getEvents_1.getEventsBasedOnDj)(testArtistId)];
                case 1:
                    events = _a.sent();
                    if (events) {
                        console.log("Found ".concat(events.length, " events for artist_id ").concat(testArtistId, ":"));
                        events.forEach(function (event, index) {
                            console.log("Event ".concat(index + 1, ": ").concat(event.title, " on ").concat(event.date));
                        });
                    }
                    else {
                        console.log("No events found for artist_id ".concat(testArtistId));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function testGetEvent() {
    return __awaiter(this, void 0, void 0, function () {
        var testEventId, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testEventId = 1;
                    return [4 /*yield*/, (0, getEvents_1.getEvent)(testEventId)];
                case 1:
                    event = _a.sent();
                    if (event) {
                        console.log("Found event: ".concat(event.title, " on ").concat(event.date));
                    }
                    else {
                        console.log("No event found with event_id ".concat(testEventId));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function testGetProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        var testUserId, profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testUserId = 1;
                    return [4 /*yield*/, (0, getProfiles_1.getProfiles)(testUserId)];
                case 1:
                    profile = _a.sent();
                    if (profile) {
                        console.log("Found profile for user_id ".concat(testUserId, ":"));
                        console.log("Bio: ".concat(profile.bio));
                        console.log("Avatar URL: ".concat(profile.avatar_url));
                    }
                    else {
                        console.log("No profile found for user_id ".concat(testUserId));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, connection_1.default)()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, (0, table_1.default)()];
                case 2:
                    _a.sent();
                    // test insert
                    console.log("Starting test for InsertComment...");
                    return [4 /*yield*/, testInsertComment()];
                case 3:
                    _a.sent();
                    console.log("Starting test for InsertEvent...");
                    return [4 /*yield*/, testInsertEvent()];
                case 4:
                    _a.sent();
                    console.log("Starting test for InsertLike...");
                    return [4 /*yield*/, testInsertLike()];
                case 5:
                    _a.sent();
                    console.log("Starting test for InsertProfiles...");
                    return [4 /*yield*/, testInsertProfiles()];
                case 6:
                    _a.sent();
                    // test update
                    console.log("Starting test for UpdateProfiles...");
                    return [4 /*yield*/, testUpdateProfiles()];
                case 7:
                    _a.sent();
                    console.log("Starting test for UpdateComment...");
                    return [4 /*yield*/, testUpdateComment()];
                case 8:
                    _a.sent();
                    console.log("Starting test for UpdateEvent...");
                    return [4 /*yield*/, testUpdateEvent()];
                case 9:
                    _a.sent();
                    // test get
                    console.log('Starting test for getComments...');
                    return [4 /*yield*/, testGetComments()];
                case 10:
                    _a.sent();
                    console.log('Starting test for getProfiles...');
                    return [4 /*yield*/, testGetProfiles()];
                case 11:
                    _a.sent();
                    console.log('Starting tests for getEventsBasedOnDj and getEvent...');
                    return [4 /*yield*/, testGetEventsBasedOnDj()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, testGetEvent()];
                case 13:
                    _a.sent();
                    console.log('Starting test for getLikes...');
                    return [4 /*yield*/, testGetLikes()];
                case 14:
                    _a.sent();
                    // test delete
                    console.log("Starting test for DeleteComment...");
                    return [4 /*yield*/, testDeleteComment()];
                case 15:
                    _a.sent();
                    console.log("Starting test for DeleteLike...");
                    return [4 /*yield*/, testDeleteLike()];
                case 16:
                    _a.sent();
                    console.log("Starting test for DeleteProfiles...");
                    return [4 /*yield*/, testDeleteProfiles()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, connection.execute("DROP TABLE IF EXISTS events")];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, connection.execute("DROP TABLE IF EXISTS comments")];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, connection.execute("DROP TABLE IF EXISTS likes")];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, connection.execute("DROP TABLE IF EXISTS user_profiles")];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, connection.end()];
                case 22:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
runTests().catch(function (error) {
    console.error('Error running tests:', error);
});
