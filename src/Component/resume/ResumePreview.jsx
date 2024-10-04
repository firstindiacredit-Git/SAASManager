// ResumePreview.jsx
// import React from 'react';

// const ResumePreview = ({ data }) => {
//   const { name, title, summary, contact, skills, certifications, education, experience, projects } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-3xl mx-auto my-8 p-8">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-6">
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
//           <h2 className="text-xl font-bold">{name}</h2>
//           <p className="text-sm">{title}</p>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//           <p>{contact.email}</p>
//           <p>{contact.phone}</p>
//           <p>{contact.location}</p>
//           <p>{contact.linkedin}</p>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
//           <ul className="list-disc pl-5">
//             {skills.split(',').map((skill, index) => (
//               <li key={index}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
//           <ul className="list-disc pl-5">
//             {certifications.split(',').map((cert, index) => (
//               <li key={index}>{cert.trim()}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-6">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">{name.toUpperCase()}</h2>
//           <p className="text-gray-500 mb-4">{title}</p>
//           <p className="text-gray-700">{summary}</p>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">EXPERIENCE</h3>
//           <ul className="list-disc pl-5">
//             {experience.split('\n').map((exp, index) => (
//               <li key={index} className="mb-2">{exp.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">PROJECTS</h3>
//           <ul className="list-disc pl-5">
//             {projects.split('\n').map((project, index) => (
//               <li key={index} className="mb-2">{project.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">EDUCATION</h3>
//           <p className="text-gray-700">{education}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;



// import React from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

// const ResumePreview = ({ data }) => {
//   const { name,title,profileImage, summary, contact, skills, certifications, education, experience, projects } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-3xl mx-auto my-8 p-8">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-6">
//         <div className="flex flex-col items-center mb-8">
//           {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />}
//         </div>

        // <div className="mb-8">
        //   <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
        //   <p className="flex items-center"><FaEnvelope className="mr-2" />{contact.email}</p>
        //   <p className="flex items-center"><FaPhone className="mr-2" />{contact.phone}</p>
        //   <p className="flex items-center"><FaMapMarkerAlt className="mr-2" />{contact.location}</p>
        //   <p className="flex items-center"><FaLinkedin className="mr-2" />{contact.linkedin}</p>
        // </div>

        // <div className="mb-8">
        //   <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
        //   <ul className="list-disc pl-5">
        //     {skills.split(',').map((skill, index) => (
        //       <li key={index}>{skill.trim()}</li>
        //     ))}
        //   </ul>
        // </div>

        // <div>
        //   <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
        //   <ul className="list-disc pl-5">
        //     {certifications.split(',').map((cert, index) => (
        //       <li key={index}>{cert.trim()}</li>
        //     ))}
        //   </ul>
        // </div>
//       </div>

//       {/* Main Content */}


//       <div className="w-2/3 p-6">
        // <div className="mb-6">
        //   <h3 className="text-xl font-semibold text-gray-800 mb-2">SUMMARY</h3>
        //   <p className="text-gray-700">{summary}</p>
        // </div>

        // <div className="mb-6">
        //   <h3 className="text-xl font-semibold text-gray-800 mb-2">EXPERIENCE</h3>
        //   <ul className="list-disc pl-5">
        //     {experience.split('\n').map((exp, index) => (
        //       <li key={index} className="mb-2">{exp.trim()}</li>
        //     ))}
        //   </ul>
        // </div>

        // <div className="mb-6">
        //   <h3 className="text-xl font-semibold text-gray-800 mb-2">PROJECTS</h3>
        //   <ul className="list-disc pl-5">
        //     {projects.split('\n').map((project, index) => (
        //       <li key={index} className="mb-2">{project.trim()}</li>
        //     ))}
        //   </ul>
        // </div>

        // <div>
        //   <h3 className="text-xl font-semibold text-gray-800 mb-2">EDUCATION</h3>
        //   <p className="text-gray-700">{education}</p>
        // </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;

// import React from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

// const ResumePreview = ({ data }) => {
//   const { name, title, profileImage, summary, contact, skills, certifications, education, experience, projects } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-3xl mx-auto my-8 p-8">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-6">
//         <div className="flex flex-col items-center mb-8">
//           {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />}
//         </div>
//         {/* Contact Information */}
//         {/* ... */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//           <p className="flex items-center"><FaEnvelope className="mr-2" />{contact.email}</p>
//           <p className="flex items-center"><FaPhone className="mr-2" />{contact.phone}</p>
//           <p className="flex items-center"><FaMapMarkerAlt className="mr-2" />{contact.location}</p>
//           <p className="flex items-center"><FaLinkedin className="mr-2" />{contact.linkedin}</p>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
//           <ul className="list-disc pl-5">
//             {skills.split(',').map((skill, index) => (
//               <li key={index}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
//           <ul className="list-disc pl-5">
//             {certifications.split(',').map((cert, index) => (
//               <li key={index}>{cert.trim()}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-6">
//         {/* Name and Title */}
//         <div className="mb-4">
//           <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
//           <h2 className="text-lg text-gray-600">{title}</h2>
//         </div>
        
//         {/* Rest of the main content */}
//         {/* ... */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">SUMMARY</h3>
//           <p className="text-gray-700">{summary}</p>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">EXPERIENCE</h3>
//           <ul className="list-disc pl-5">
//             {experience.split('\n').map((exp, index) => (
//               <li key={index} className="mb-2">{exp.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">PROJECTS</h3>
//           <ul className="list-disc pl-5">
//             {projects.split('\n').map((project, index) => (
//               <li key={index} className="mb-2">{project.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">EDUCATION</h3>
//           <p className="text-gray-700">{education}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;

import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

const ResumePreview = ({ data }) => {
  const { name, title, profileImage, summary, contact, skills, certifications, education, experience, projects } = data;

  return (
    <div className="flex bg-white shadow-lg w-full max-w-4xl mx-auto my-8">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-900 text-white p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />}
        </div>
        
        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
          <p className="flex items-center mb-2"><FaEnvelope className="mr-2" />{contact.email}</p>
          <p className="flex items-center mb-2"><FaPhone className="mr-2" />{contact.phone}</p>
          <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" />{contact.location}</p>
          <p className="flex items-center"><FaLinkedin className="mr-2" />{contact.linkedin}</p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
          <ul className="list-disc list-inside space-y-1">
            {skills.split(',').map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
          <ul className="list-disc list-inside space-y-1">
            {certifications.map((cert, index) => (
                <div key={index}>
              <p>{cert.name} - {cert.duration} ({cert.company})</p>
            </div>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Name and Title */}
        <div className="mb-6 text-right">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <h2 className="text-lg text-gray-600">{title}</h2>
        </div>
        
        {/* Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">SUMMARY</h3>
          <p className="text-gray-700">{summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">EXPERIENCE</h3>
          <ul className="list-disc list-inside space-y-2">
            {experience.split('\n').map((exp, index) => (
              <li key={index} className="text-gray-700">{exp.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">PROJECTS</h3>
          <ul className="list-disc list-inside space-y-2">
            {projects.split('\n').map((project, index) => (
              <li key={index} className="text-gray-700">{project.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">EDUCATION</h3>
          <p className="text-gray-700">{education}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;