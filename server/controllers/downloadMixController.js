"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMix = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv = __importStar(require("dotenv"));
const getMixes_1 = require("../database/search/getMixes");
const stream_1 = require("stream");
dotenv.config();
// AWS configuration
const s3Client = new client_s3_1.S3Client({
    endpoint: process.env.AWS_ENDPOINT,
    forcePathStyle: false,
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const bucketName = process.env.AWS_BUCKET_NAME;
// Controller for downloading a file
const downloadMix = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mixId = req.params.mix_id;
    try {
        // Retrieve mix details from the database
        const mix = yield (0, getMixes_1.getMixes)(parseInt(mixId, 10));
        if (!mix || !mix.file_url) {
            res.status(404).json({ error: 'Mix not found' });
            return;
        }
        if (!mix.allow_download) {
            res.status(403).json({ error: 'Download not allowed for this mix' });
            return;
        }
        // Download parameters
        const params = {
            Bucket: bucketName,
            Key: mix.file_url,
        };
        // Download file from S3
        const downloadStream = yield s3Client.send(new client_s3_1.GetObjectCommand(params));
        res.setHeader('Content-Disposition', `attachment; filename="${mix.file_url.substring(15)}"`);
        res.setHeader('Content-Type', downloadStream.ContentType || 'application/octet-stream');
        // Stream the file to the response
        (0, stream_1.pipeline)(downloadStream.Body, res, (err) => {
            if (err) {
                console.error('Error streaming file:', err);
                res.status(500).json({ error: 'Failed to download file' });
            }
        });
    }
    catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ error: 'Failed to download file' });
    }
});
exports.downloadMix = downloadMix;
