require('dotenv').config();
const multer=require('multer')
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3');

const s3 = new S3Client({
    credentials: {
        accessKeyId:  process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRATE,
    },
    region:"us-east-1"
}) 

  const upload = multer({ 
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    }),
    
  limits: {
    fileSize: 1024 * 1024 * 2 // we are allowing only 5 MB files
}
  }
  
  ).single("files")

  exports.upload=upload

