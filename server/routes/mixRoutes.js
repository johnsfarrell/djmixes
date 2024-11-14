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
const express_1 = __importDefault(require("express"));
const getMixes_1 = require("../database/search/getMixes");
const getUser_1 = require("../database/search/getUser"); // assuming a function that fetches by user_id
const downloadMixController_1 = require("../controllers/downloadMixController");
const uploadMixController_1 = require("../controllers/uploadMixController");
const router = express_1.default.Router();
// Route for fetching a mix by its ID
router.get('/:mixId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mixId = req.params.mixId;
    try {
        // Fetch mix data from the database
        const mixData = yield (0, getMixes_1.getMixes)(parseInt(mixId, 10));
        if (!mixData) {
            res.status(404).send('Mix not found');
            return;
        }
        // Fetch the user who uploaded the mix by user_id
        const user = yield (0, getUser_1.getUserByName)(`${mixData.user_id}`); // Using user_id instead of username
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        // Return the mix and user data in the response
        res.json({
            title: mixData.title,
            fileUrl: mixData.file_url,
            coverUrl: mixData.cover_url,
            visibility: mixData.visibility,
            allowDownload: mixData.allow_download,
            tags: mixData.tags,
            updatedAt: mixData.updated_at,
            createdAt: mixData.created_at,
            artist: mixData.artist,
            upload_user: {
                user_id: mixData.user_id,
                username: user.username,
            },
            comments: [], // Placeholder for comments
            album: mixData.album,
        });
    }
    catch (error) {
        console.error('Error retrieving mix:', error);
        res.status(500).send('Error retrieving mix');
    }
}));
// Route for download a mix by its ID
router.get('/:mix_id/download', downloadMixController_1.downloadMix);
// Route for fetching a mix by its ID
router.post('/upload', uploadMixController_1.uploadMix);
exports.default = router;
