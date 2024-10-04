// ResumeBuild.jsx
import React, { useState } from 'react';
import ResumeForm from './resume/ResumeForm';
import ResumePreview from './resume/ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumeBuild = () => {
  const [resumeData, setResumeData] = useState(null);

  const handleDownload = () => {
    const resume = document.getElementById('resume-preview');
    html2canvas(resume).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <ResumeForm onSubmit={setResumeData} />
      {resumeData && (
        <div id="resume-preview" className="mt-6">
          <ResumePreview data={resumeData} />
        </div>
      )}
      <button onClick={handleDownload} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-4">
        Download Resume
      </button>
    </div>
  );
}

export default ResumeBuild;
