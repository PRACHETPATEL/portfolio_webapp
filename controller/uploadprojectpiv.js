const multer = require('multer');
const path = require('path');
const asyncHandler = require('express-async-handler');
const project = require('../models/project.model');

let filenamex;
const storage = multer.diskStorage({
    destination:path.join(__dirname , "../public/assets/"),
    filename: function (req, file, cb) {
        // Use the desired filename
        const filename = filenamex;
        cb(null, filename);
    }
});

const fileFilter = function (req, file, cb) {
    if (path.extname(file.originalname).toLowerCase() !== '.webp') {
        return cb(new Error('Invalid file format. Only webp files are allowed.'));
    }
    cb(null, true);
};

const limits = {
    fileSize: 100000
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter, 
    limits: limits 
});


let updateProjectpic = asyncHandler(async (req,res)=>{
    const response=await project.findById(req.params.id);
    filenamex=response.project_image;
    upload.single('projectpic')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ status: 400, message: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }
        if (!req.file) {
            return res.status(400).json({ status: 400, message: 'No file uploaded.' });
        }
        res.status(200).json({ status: 200, message: 'File uploaded successfully.' });
    });
});
module.exports=updateProjectpic;