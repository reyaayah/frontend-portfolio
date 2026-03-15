const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for projects
const projectStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/projects',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 1200, height: 800, crop: 'limit' }],
    },
});

// Storage for resume
const resumeStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/resume',
        allowed_formats: ['pdf'],
    },
});

function fileFilter(req, file, cb) {
    if (file.fieldname === 'resume') {
        if (file.mimetype !== 'application/pdf') return cb(new Error('Resume must be PDF'));
    }
    // accept images for projects
    if (file.fieldname === 'image') {
        if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'));
    }
    cb(null, true);
}

const uploadProject = multer({
    storage: projectStorage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadResume = multer({
    storage: resumeStorage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for PDF
});

module.exports = { uploadProject, uploadResume };
