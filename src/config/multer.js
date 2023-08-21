import multer from 'multer'
import path from 'path'

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']

const diskStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname + `_${Date.now()}`)
    },
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
});


export const imageFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    if (allowedExtensions.includes(extension)) {
        cb(null, true)
    } else {
        cb(new Error("Archivo no permitido"))
    }
}
const upload = multer({ storage: diskStorage, fileFilter: imageFilter })

export default upload