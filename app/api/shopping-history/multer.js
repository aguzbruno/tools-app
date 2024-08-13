import multer from 'multer';

// Configura multer
const upload = multer({ dest: '/tmp' });

export const uploadMiddleware = upload.single('image');

export const multerMiddleware = (req, res, next) => {
  return new Promise((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  }).then(next).catch(next);
};
