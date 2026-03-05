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
    //console.log(dateString);

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


const pdf = require("pdf-parse/lib/pdf-parse");


const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});


//ResumeATS

const storageATS = multer.diskStorage({
  destination: function (req, file, cb) {
    const userObjectId = req.user._id;

    const userFolderPath = path.join(
      __dirname,
      "..",
      "uploads",
      userObjectId.toString(),
      "ResumeHolder"
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
    //console.log(dateString);

    cb(
      null,
      file.originalname 
    );
  },
});

const uploadATS = multer({ storage: storageATS });

documentHolder.get("/uploadATS", restrictMiddleware, (req, res) => {
   try{
    const userObjectId = req.user._id;
    const username = req.user.username;
    res.render("uploadATSEJS", {
      userId: userObjectId,
      username: username,
      allFiles,
    });
   } catch(err) {
    console.error(err);
    return res.redirect("/auth/login");
   }


})

documentHolder.post("/ATS/upload", restrictMiddleware, (req, res) => {

  try {

    uploadATS.single("resumeATS")(req, res, async function (err) {

      if (err) {
        console.error("Upload error:", err);
        return res.status(500).send("File upload failed");
      }

      try {

        const filePath = req.file.path;
        const roleDescription = req.body.roleDescription;

        // Extract PDF text
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdf(dataBuffer);

        console.log(pdfData.text);

        const resumeText = pdfData.text.slice(0, 12000); // prevent token overflow

        // AI Analysis
        const response = await client.responses.create({
          model: "llama-3.1-8b-instant",
          input: `
You are an ATS Resume Analyzer.

Job Description:
${roleDescription}

Resume:
${resumeText}

Return ONLY valid JSON like this:

{
 "score": number out of 100,
 "suggestions": ["suggestion1","suggestion2","suggestion3"]
}
`
        });

        let output = response.output_text;

const match = output.match(/\{[\s\S]*\}/);

if (!match) {
  throw new Error("Invalid AI response");
}

//console.log("Raw AI response:", output);

const parsed = JSON.parse(match[0]);

//console.log("Parsed AI response:", parsed);

res.render("uploadATSEJS", {
  username: req.user.username,
  atsScore: parsed.score,
  suggestions: parsed.suggestions
});

      } catch (err) {
        console.error("AI error:", err);
        res.status(500).send("Resume analysis failed");
      }

    });

  } catch (err) {
    console.error(err);
    return res.redirect("/auth/login");
  }

});


documentHolder.get("/ATS", restrictMiddleware, (req, res) => {
    try {
        return res.render("uploadATSEJS", {
            username: req.user.username,
            userId: req.user._id
        });
    } catch (err) {
        console.error(err);
        return res.redirect("/auth/login");
    }
});




module.exports = { documentHolder };
