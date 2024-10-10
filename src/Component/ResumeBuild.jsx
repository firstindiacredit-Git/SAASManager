// ResumeBuild.jsx
// import React, { useState } from 'react';
// import ResumeForm from './resume/ResumeForm';
// import ResumePreview from './resume/ResumePreview';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ResumeBuild = () => {
//   const [resumeData, setResumeData] = useState(null);

//   const handleDownload = () => {
//     const resume = document.getElementById('resume-preview');
//     html2canvas(resume).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm','a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//       pdf.addImage(imgData, 'PNG', 0, 0,pdfWidth,pdfHeight);
//       pdf.save('resume.pdf');
//     });
//   };

//   return (
//     <div className='flex flex-col items-center'>
//     <div className="flex flex-row items-center">
//       <ResumeForm onSubmit={setResumeData} />
//       {resumeData && (
//         <div id="resume-preview" className="mt-6">
//           <ResumePreview data={resumeData} />
//         </div>
//       )}
    
      
//     </div>
//     <div>
//     <button onClick={handleDownload} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-4">
//         Download Resume
//       </button>
//     </div>
//     </div>
//   );
// }

// export default ResumeBuild;

import React, { useState } from 'react';
import ResumeForm from './resume/ResumeForm';
import ResumePreview from './resume/ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumeBuild = () => {
  const [resumeData, setResumeData] = useState(null);
  const [themeColor, setThemeColor] = useState('#1F2937'); // Default dark color
  const [selectedFormat, setSelectedFormat] = useState('format1'); // Default format

  const handleColorChange = (e) => {
    setThemeColor(e.target.value);
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };


  const handleDownload = () => {
    // Target only the resume content, not the color or format picker
    const resumeContent = document.getElementById('resume-content');
    html2canvas(resumeContent).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div className="flex flex-col items-center">
     <div>
     <div className="mt-4">
        <label className="mr-2 text-gray-600">Choose Format: </label>
        <select value={selectedFormat} onChange={handleFormatChange}>
          <option value="format1">Format 1</option>
          <option value="format2">Format 2</option>
          <option value="format3">Format 3</option>
          <option value="format4">Format 4</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="mr-2 text-gray-600">Pick Theme Color: </label>
        <input type="color" value={themeColor} onChange={handleColorChange} />
      </div>
     </div>
      <div className="flex flex-row items-center">
     

        <ResumeForm onSubmit={setResumeData} />
        {resumeData && (
          <div id="resume-content" className="mt-6">
            {/* Only this part will be included in the download */}
            <ResumePreview data={resumeData} themeColor={themeColor} selectedFormat={selectedFormat}/>
          </div>
        )}
      </div>
      <div>
        <button onClick={handleDownload} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-4">
          Download Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeBuild;
