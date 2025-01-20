const express = require('express');
const multer = require('multer');
const docxConverter = require('docx-pdf');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/convert', upload.single('docx'), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = path.join('temp', `${Date.now()}.pdf`);

    // Ensure temp directory exists
    await fs.mkdir('temp', { recursive: true });

    // Convert document
    await new Promise((resolve, reject) => {
      docxConverter(inputPath, outputPath, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    // Send the PDF file
    res.sendFile(outputPath, {
      root: process.cwd(),
      headers: {
        'Content-Type': 'application/pdf'
      }
    });

    // Clean up temporary files
    await Promise.all([
      fs.unlink(inputPath),
      fs.unlink(outputPath)
    ]);
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert document' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
}); 