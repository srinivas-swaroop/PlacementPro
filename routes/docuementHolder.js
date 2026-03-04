const documentHolder = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const restrictMiddleware = require("../middleware/restrictMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userObjectId = req.user._id;

    const userFolderPath = path.join(
      __dirname,
      "..",
      "uploads",
      userObjectId.toString(),
    );
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }
    cb(null, userFolderPath);
  },

  filename: function (req, file, cb) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const dateString = `${day}-${month}-${year}`;
    console.log(dateString);

    cb(
      null,
      file.originalname + "$" + dateString + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

documentHolder.get("/", restrictMiddleware, async (req, res) => {
  try {
    const userObjectId = req.user._id;
    const username = req.user.username;

    console.log(userObjectId, username);

    const userFolderPath = path.join(
      __dirname,
      "..",
      "uploads",
      userObjectId.toString(),
    );

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    const allFiles = fs.readdirSync(userFolderPath);

    res.render("documentHolder", {
      userId: userObjectId,
      username: username,
      allFiles,
    });
  } catch (err) {
    console.error(err);
    return res.redirect("/auth/login");
  }
});

documentHolder.post("/upload", restrictMiddleware, (req, res) => {
  try {
    upload.single("document")(req, res, function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send("Error uploading file");
      }
      res.redirect("/documents");
    });
  } catch (err) {
    console.error(err);
    return res.redirect("/auth/login");
  }
});


documentHolder.post('/delete', restrictMiddleware, (req, res) => {
    try {
        const { filename } = req.body;
        const userObjectId = req.user._id;

         const userFolderPath = path.join(
            __dirname,
            '..',
            'uploads',
            userObjectId.toString()
        );

        const filePath = path.join(userFolderPath, filename);

        // Ensure file belongs to user's folder
        if (!filePath.startsWith(userFolderPath)) {
            return res.redirect('/documents');
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.redirect('/documents');
        


    } catch(Err){
        console.log(Err);
        res.redirect('/auth/login');
    }
})

module.exports = { documentHolder };
