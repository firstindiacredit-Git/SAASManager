const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const { exec } = require("child_process");
//const cloudconvert = new (require('cloudconvert'))('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTIyOWNlYjRkYzAxMDUxZGU4YzEzZWY3MjY4YzRjYjMxYjg4ODhiYTFiODM5M2UwYzRjM2QxZGJkOTViMzc3MWE0NTE2YTUyMzEwYTBhOGEiLCJpYXQiOjE3Mjg5MDIxMTMuMjU5MzIyLCJuYmYiOjE3Mjg5MDIxMTMuMjU5MzIzLCJleHAiOjQ4ODQ1NzU3MTMuMjUyNTY4LCJzdWIiOiI2OTg3NTY4OSIsInNjb3BlcyI6W119.ImpTJP6IyQuGcpKNtbfnXGm4vbGAJXwfHvZDXPjy5qLoUgTh8nnd4x9oLH1gTtBRUcyuTs9RrDutG6dMt3DybYtLwThUToH9yvaGN0bJJ9t-xTKdPHC3gFW2xA28mVKCrjOZngAmPWfD2VnZXhJA6M3a7OYyWWDN8k3ZFcAfkzZJrhlUtFP3XuETu7hpGew81X8Nnya95S99F8SzV2BDK1xZRxjFXRU9MPaC-FSkHyGHRZPrcUQU-6yzU4RjcRnId96mswPou-2vRfY98jPu9ZzC9gGMFPGtFXbv6b0n82Qsnjrayzu26H4RGg47oNk4sD7XUcmjsjsryhOE4aXKdqTZfBr2VGt3ekWCcLg1bs_FtgptVgvv1YACo7D00C8wmEq3JKfii_AplayPtxXCRl6iZ-WI4tdkUzPG-QCu58jx-Fq7Divuu4w1BkNUeU9iFFi-55pbXm6Qwrirl6HnleXTGsf85xPk1kdlENK4QIPAk838cBatghbfCvXmOEbf5ECO8x-7i8_39n4R8YqqHwf6Wtue3Do7GRZLmUVMatPi7HHv1gaUSGNVH94ydrwb0LsqLA9KtQ5mYP_3Y4B_5w1uvBbykhvWttaPRATaHlpoNPUxIaTShcHyyZSGuv2NGkP_qzbhfNBWSE0Z3-Qt8TZpAxeqJH9vJZZp4r4YLjk');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching the URL');
  }
});




app.post('/convert', upload.single('pdf'), async (req, res) => {
  try {
    const pdfFilePath = req.file.path;

    const job = await cloudconvert.jobs.create({
      tasks: {
        'import-my-file': {
          operation: 'import/upload',
        },
        'convert-my-file': {
          operation: 'convert',
          input: 'import-my-file',
          output_format: 'docx',
        },
        'export-my-file': {
          operation: 'export/url',
          input: 'convert-my-file',
        },
      },
    });

    const uploadTask = job.tasks.filter(
      (task) => task.name === 'import-my-file'
    )[0];

    const form = new FormData();
    form.append('file', fs.createReadStream(pdfFilePath));
    await axios.post(uploadTask.result.form.url, form, {
      headers: form.getHeaders(),
    });

    const updatedJob = await cloudconvert.jobs.wait(job.id);
    const exportTask = updatedJob.tasks.filter(
      (task) => task.name === 'export-my-file'
    )[0];

    const fileUrl = exportTask.result.files[0].url;
    res.json({ wordFileUrl: fileUrl });
  } catch (error) {
    res.status(500).send('Error during conversion');
  } finally {
    fs.unlinkSync(req.file.path); // Cleanup
  }
});


//for protected pdf

app.post("/protect", upload.single("pdfFile"), (req, res) => {
  const { password } = req.body;
  const inputPath = req.file.path;
  const outputPath = path.join("uploads", `protected_${req.file.originalname}`);

  // Using qpdf to add password protection
  const command = `qpdf --encrypt ${password} ${password} 256 -- ${inputPath} ${outputPath}`;
  exec(command, (error) => {
    if (error) {
      console.error("Error encrypting PDF:", error);
      return res.status(500).send("Error encrypting PDF");
    }

    res.download(outputPath, (err) => {
      if (err) console.error("Error sending file:", err);
      // Clean up uploaded files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});


//for Unlock pdf
app.post("/unlock-pdf", upload.single("file"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join("uploads", `unlocked_${req.file.filename}.pdf`);
  const password = req.body.password || ""; // Get the password if provided

  const command = password
    ? `qpdf --decrypt --password="${password}" "${inputPath}" "${outputPath}"`
    : `qpdf --decrypt "${inputPath}" "${outputPath}"`;

  exec(command, (error) => {
    if (error) {
      console.error("Error unlocking PDF:", error);
      return res.status(500).json({ error: "Error unlocking PDF. Please check the password and try again." });
    }

    // Send the unlocked PDF to the client
    res.download(outputPath, "unlocked.pdf", (err) => {
      if (err) console.error("Error sending file:", err);

      // Clean up temporary files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});








app.listen(8080, () => {
  console.log('CORS Proxy Server running on port 8080');
});


// const express = require('express');
// const multer = require('multer');
// const cloudconvert = new (require('cloudconvert'))('YOUR_CLOUDCONVERT_API_KEY');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.post('/convert', upload.single('pdf'), async (req, res) => {
//   try {
//     const pdfFilePath = req.file.path;

//     const job = await cloudconvert.jobs.create({
//       tasks: {
//         'import-my-file': {
//           operation: 'import/upload',
//         },
//         'convert-my-file': {
//           operation: 'convert',
//           input: 'import-my-file',
//           output_format: 'docx',
//         },
//         'export-my-file': {
//           operation: 'export/url',
//           input: 'convert-my-file',
//         },
//       },
//     });

//     const uploadTask = job.tasks.filter(
//       (task) => task.name === 'import-my-file'
//     )[0];

//     const form = new FormData();
//     form.append('file', fs.createReadStream(pdfFilePath));
//     await axios.post(uploadTask.result.form.url, form, {
//       headers: form.getHeaders(),
//     });

//     const updatedJob = await cloudconvert.jobs.wait(job.id);
//     const exportTask = updatedJob.tasks.filter(
//       (task) => task.name === 'export-my-file'
//     )[0];

//     const fileUrl = exportTask.result.files[0].url;
//     res.json({ wordFileUrl: fileUrl });
//   } catch (error) {
//     res.status(500).send('Error during conversion');
//   } finally {
//     fs.unlinkSync(req.file.path); // Cleanup
//   }
// });

// app.listen(5000, () => console.log('Server started on port 5000'));
