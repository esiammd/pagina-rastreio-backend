import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "..", "uploads"),
  filename: (req, file, cb) => {
    const date = new Date().toISOString();
    const fileName = `${date}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype !== "text/csv") {
    cb(new Error("File uploaded is not of type csv"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
