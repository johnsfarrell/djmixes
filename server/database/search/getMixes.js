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
exports.getMixes = getMixes;
const connection_1 = __importDefault(require("../connection"));
// The function signature for getMixes
function getMixes(mix_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, connection_1.default)();
        try {
            const [rows] = yield connection.execute(`SELECT * FROM mix WHERE mix_id = ? AND is_deleted = 0`, [mix_id]);
            if (rows.length > 0) {
                return rows[0]; // Cast to the Mix interface
            }
            else {
                console.log(`Mix with id ${mix_id} not found or has been deleted.`);
                return null;
            }
        }
        catch (error) {
            console.error('Retrieving mix Error:', error);
            throw error;
        }
    });
}
