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
exports.insertMixes = insertMixes;
exports.updateMixes = updateMixes;
exports.deleteMixes = deleteMixes;
const connection_1 = __importDefault(require("../connection"));
function insertMixes(mix_id, user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const query = `
      INSERT INTO mix (mix_id, user_id, title, artist, album, created_at, file_url, cover_url, tags, visibility, allow_download)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
            const [result] = yield connection.execute(query, [
                mix_id, user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download
            ]);
            console.log('Mix inserted successfully:', result);
            return result;
        }
        catch (error) {
            console.error('Error inserting mix:', error);
            return null;
        }
    });
}
function updateMixes(mix_id, user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const query = `
      UPDATE mix
      SET user_id = ?, title = ?, artist = ?, album = ?, created_at = ?, file_url = ?, cover_url = ?, tags = ?, visibility = ?, allow_download = ?
      WHERE mix_id = ? AND is_deleted = 0
    `;
            const [result] = yield connection.execute(query, [
                user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download, mix_id
            ]);
            console.log('Mix updated successfully:', result);
            return result;
        }
        catch (error) {
            console.error('Error updating mix:', error);
            return null;
        }
    });
}
function deleteMixes(mix_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const query = `UPDATE mix SET is_deleted = 1 WHERE mix_id = ?`;
            const [result] = yield connection.execute(query, [mix_id]);
            console.log('Mix marked as deleted:', result);
            return result;
        }
        catch (error) {
            console.error('Error deleting mix:', error);
            return null;
        }
    });
}
