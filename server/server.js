const express = require('express');
const multer = require('multer');
const cors = require('cors');
const libre = require('libreoffice-convert');
const path = require('path');
const fs = require('fs-extra');
const { promisify } = require('util');

const libreConvert = promisify(libre.convert);

const app = express();

// Enable CORS
app.use(cors());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadsDir);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/convert', upload.single('docx'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(uploadsDir, `${Date.now()}.pdf`);

    // Read the file
    const docxBuffer = await fs.readFile(inputPath);

    // Convert it to PDF
    const pdfBuffer = await libreConvert(docxBuffer, '.pdf', undefined);

    // Save the PDF
    await fs.writeFile(outputPath, pdfBuffer);

    // Send the file
    res.sendFile(outputPath, {
      headers: {
        'Content-Type': 'application/pdf'
      }
    });

    // Clean up files after sending
    setTimeout(async () => {
      try {
        await fs.remove(inputPath);
        await fs.remove(outputPath);
        // Clean up temp directory
        const tempDir = path.dirname(inputPath);
        await fs.remove(tempDir);
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    }, 2000);

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert document' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 