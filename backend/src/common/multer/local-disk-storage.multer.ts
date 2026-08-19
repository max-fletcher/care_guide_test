import { diskStorage } from 'multer'
import * as fs from 'fs'

export const diskStorageEngine = (path: string = '') => {
  const dir = './public/uploads/' + path
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }) // create folder if it doesn't exist

  return diskStorage({
    destination: dir,
    // use "filename: (req, file, cb) => {" in case you need access to the original request
    filename: (_, file, cb) => {
      const randomNum = crypto.randomUUID()
      const filename = Date.now() + '-' + randomNum + '-' + file.originalname.trim().replaceAll(' ', '_')

      cb(null, filename)
    }
  })
}
