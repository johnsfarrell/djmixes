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
const connection_1 = __importDefault(require("../database/connection"));
class ProfileController {
    static showProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.user_id, 10);
                if (isNaN(userId)) {
                    res.status(400).json({ error: 'Invalid user ID' });
                    return;
                }
                const connection = yield (0, connection_1.default)();
                const [rows] = yield connection.execute('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);
                if (rows.length === 0) {
                    res.status(404).json({ message: 'Profile not found' });
                    return;
                }
                const profile = rows[0];
                res.status(200).json(profile);
            }
            catch (error) {
                console.error('Error fetching user profile:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = ProfileController;
