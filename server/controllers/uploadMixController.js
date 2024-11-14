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
exports.uploadMix = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv = __importStar(require("dotenv"));
const updateMixes_1 = require("../database/update/updateMixes");
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
// Controller for uploading a file
const uploadMix = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || !req.files.mix) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }
    try {
        const mixFile = req.files.mix;
        const mixFileKey = `${Date.now()}_${mixFile.name}`;
        const coverFile = req.files.cover;
        const coverFileKey = `${Date.now()}_${mixFile.name}`;
        // Upload parameters
        const mixUploadParams = {
            Bucket: bucketName,
            Key: mixFileKey,
            Body: mixFile.data,
        };
        const coverUploadParams = {
            Bucket: bucketName,
            Key: coverFileKey,
            Body: coverFile.data,
        };
        // Upload file to S3
        const mixUploadResult = yield s3Client.send(new client_s3_1.PutObjectCommand(mixUploadParams));
        console.log(`Successfully uploaded object: ${bucketName}/${mixFileKey}`);
        const coverUploadResult = yield s3Client.send(new client_s3_1.PutObjectCommand(mixUploadParams));
        console.log(`Successfully uploaded object: ${bucketName}/${coverFileKey}`);
        // Insert file details into the database
        yield (0, updateMixes_1.insertMixes)(1, // Assuming this is some mix ID or placeholder
        req.body.user_id, req.body.title, req.body.artist, req.body.album, req.body.release_date, mixFileKey, coverFileKey, req.body.tags, req.body.visibility, req.body.allow_download);
        res.status(200).json({
            message: 'Mix uploaded successfully',
            mixFileKey: mixFileKey,
            mixUploadResult: mixUploadResult,
            coverFileKey: coverFileKey,
            coverUploadResult: coverUploadResult,
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});
exports.uploadMix = uploadMix;
