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

// import React from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

// const ResumePreview = ({ data }) => {
//   const { name, title, profileImage, summary, contact, skills, certifications, education, experience, projects } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-4xl mx-auto my-8">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-8">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center mb-6">
//           {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />}
//         </div>
        
//         {/* Contact Information */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//           <p className="flex items-center mb-2"><FaEnvelope className="mr-2" />{contact.email}</p>
//           <p className="flex items-center mb-2"><FaPhone className="mr-2" />{contact.phone}</p>
//           <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" />{contact.location}</p>
//           <p className="flex items-center"><FaLinkedin className="mr-2" />{contact.linkedin}</p>
//         </div>

//         {/* Skills */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
//           <ul className="list-disc list-inside space-y-1">
//             {skills.split(',').map((skill, index) => (
//               <li key={index}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Certifications */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
//           <ul className="list-disc list-inside space-y-1">
//             {certifications.map((cert, index) => (
//                 <div key={index}>
//               <p>{cert.name} - {cert.duration} ({cert.company})</p>
//             </div>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-8">
//         {/* Name and Title */}
//         <div className="mb-6 text-right">
//           <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
//           <h2 className="text-lg text-gray-600">{title}</h2>
//         </div>
        
//         {/* Summary */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">SUMMARY</h3>
//           <p className="text-gray-700">{summary}</p>
//         </div>

//         {/* Experience */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">EXPERIENCE</h3>
//           <ul className="list-disc list-inside space-y-2">
//             {experience.split('\n').map((exp, index) => (
//               <li key={index} className="text-gray-700">{exp.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Projects */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">PROJECTS</h3>
//           <ul className="list-disc list-inside space-y-2">
//             {projects.split('\n').map((project, index) => (
//               <li key={index} className="text-gray-700">{project.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Education */}
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
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa'

// const ResumePreview = ({ data }) => {
//   const { name, title, summary, contact, skills, certifications, experience, education, projects, profileImage } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-4xl mx-auto my-8 border border-gray-300">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-8">
//         {profileImage && <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />}
        
//         {/* Contact Information */}
//         <div className="space-y-2 mb-8">
          

//           <div className="mb-8">
//            <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//           <p className="flex items-center mb-2"><FaEnvelope className="mr-2" />{contact.email}</p>
//           <p className="flex items-center mb-2"><FaPhone className="mr-2" />{contact.phone}</p>
//            <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" />{contact.location}</p>
//            <p className="flex items-center"><FaLinkedin className="mr-2" />{contact.linkedin}</p>
//          </div>
//         </div>

//         {/* Skills */}
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Skills</h3>
//           <ul className="list-disc pl-4 text-sm">
//             {skills.split(',').map((skill, index) => (
//               <li key={index}>{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Certifications */}
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold">Certifications</h3>
//           {certifications.map((cert, index) => (
//             <div key={index} className="text-sm">
//               <p><strong>{cert.name}</strong> - {cert.duration}</p>
//               <p>{cert.company}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-8">

//        <div className="mb-6 text-right">
//           <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
//           <h2 className="text-lg text-gray-600">{title}</h2>
//         </div>
//         {/* Summary */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
//           <p className="text-sm">{summary}</p>
//         </div>

//         {/* Experience */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
//           {experience.map((exp, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="font-semibold">{exp.title} - {exp.duration}</h4>
//               <p className="text-sm">{exp.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Projects */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
//           {projects.map((proj, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="font-semibold">{proj.name} - {proj.duration}</h4>
//               <p className="text-sm">{proj.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Education */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-700">Education</h3>
//           {education.map((edu, index) => (
//             <div key={index} className="mb-2">
//               <p><strong>{edu.course}</strong> - {edu.college} ({edu.duration}) - CGPA: {edu.cgpa}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;

// import React from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

// const ResumePreview = ({ data }) => {
//   const { name, title, summary, contact, skills, certifications, experience, education, projects, profileImage } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-4xl mx-auto my-8 border border-gray-300">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-8">
//         {profileImage && (
//           <div className="flex justify-center mb-6">
//             <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full" />
//           </div>
//         )}

//         {/* Contact Information */}
//         <div className="space-y-4 mb-8">
//           <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//           <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {contact.email}</p>
//           <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {contact.phone}</p>
//           <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {contact.location}</p>
//           <p className="flex items-center"><FaLinkedin className="mr-2" /> {contact.linkedin}</p>
//         </div>

//         {/* Skills */}
//         <div className="mt-4 mb-8">
//           <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
//           <ul className="text-sm space-y-1">
//             {skills.split(',').map((skill, index) => (
//               <li key={index} className="bg-gray-800 rounded-full px-3 py-1 inline-block">{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Certifications */}
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
//           {certifications.map((cert, index) => (
//             <div key={index} className="text-sm mb-2">
//               <p><strong>{cert.name}</strong> - {cert.duration}</p>
//               <p>{cert.company}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-8">
//         {/* Name and Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">{name.toUpperCase()}</h1>
//           <h2 className="text-xl text-gray-600">{title.toUpperCase()}</h2>
//         </div>

//         {/* Summary */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">SUMMARY</h3>
//           <p className="text-sm text-gray-600">{summary}</p>
//         </div>

//         {/* Experience */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">EXPERIENCE</h3>
//           {experience.map((exp, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="font-semibold text-gray-800">{exp.title}</h4>
//               <p className="text-gray-600">{exp.duration}</p>
//               <p className="text-sm text-gray-600">{exp.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Projects */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">PROJECTS</h3>
//           {projects.map((proj, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="font-semibold text-gray-800">{proj.name}</h4>
//               <p className="text-gray-600">{proj.duration}</p>
//               <p className="text-sm text-gray-600">{proj.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Education */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">EDUCATION</h3>
//           {education.map((edu, index) => (
//             <div key={index} className="mb-4">
//               <p className="font-semibold text-gray-800">{edu.course}</p>
//               <p className="text-gray-600">{edu.college} ({edu.duration})</p>
//               <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;

// import React from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

// const ResumePreview = ({ data }) => {
//   const { name, title, summary, contact, skills, certifications, experience, education, projects, internships, profileImage } = data;

//   return (
//     <div className="flex bg-white shadow-lg w-full max-w-4xl mx-auto my-8 border border-gray-300">
//       {/* Left Sidebar */}
//       <div className="w-1/3 bg-gray-900 text-white p-8">
//         {profileImage && (
//           <div className="flex justify-center mb-6">
//             <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full" />
//           </div>
//         )}

//         {/* Contact Information */}
//         <div className="space-y-4 mb-8">
//           <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//           <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {contact.email}</p>
//           <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {contact.phone}</p>
//           <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {contact.location}</p>
//           <p className="flex items-center"><FaLinkedin className="mr-2" /> {contact.linkedin}</p>
//         </div>

//         {/* Skills */}
//         <div className="mt-4 mb-8">
//           <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
//           <ul className="text-sm space-y-1">
//             {skills.split(',').map((skill, index) => (
//               <li key={index} className="bg-gray-800 rounded-full px-3 py-1 inline-block">{skill.trim()}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Certifications */}
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
//           {certifications.map((cert, index) => (
//             <div key={index} className="text-sm mb-2">
//               <p><strong>{cert.name}</strong> - {cert.duration}</p>
//               <p>{cert.company}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-2/3 p-8">
//         {/* Name and Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">{name.toUpperCase()}</h1>
//           <h2 className="text-xl text-gray-600">{title.toUpperCase()}</h2>
//         </div>

//         {/* Summary */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">SUMMARY</h3>
//           <p className="text-sm text-gray-600">{summary}</p>
//         </div>

//         {/* Experience */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">EXPERIENCE</h3>
//           {experience.map((exp, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="font-semibold text-gray-800">{exp.title}</h4>
//               <p className="text-gray-600">{exp.duration}</p>
//               <p className="text-sm text-gray-600">{exp.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Internships */}
//         {internships && internships.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold text-gray-700">INTERNSHIPS</h3>
//             {internships.map((intern, index) => (
//               <div key={index} className="mb-4">
//                 <h4 className="font-semibold text-gray-800">{intern.title}</h4>
//                 <p className="text-gray-600">{intern.duration}</p>
//                 <p className="text-sm text-gray-600">{intern.details}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Projects */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">PROJECTS</h3>
//           {projects.map((proj, index) => (
//             <div key={index} className="mb-4">
//               <h4 className="font-semibold text-gray-800">{proj.name}</h4>
//               <p className="text-gray-600">{proj.duration}</p>
//               <p className="text-sm text-gray-600">{proj.details}</p>
//             </div>
//           ))}
//         </div>

//         {/* Education */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-700">EDUCATION</h3>
//           {education.map((edu, index) => (
//             <div key={index} className="mb-4">
//               <p className="font-semibold text-gray-800">{edu.course}</p>
//               <p className="text-gray-600">{edu.college} ({edu.duration})</p>
//               <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;
// import React, { useState } from 'react';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

// const ResumePreview = ({ data }) => {
//   const { name, title, summary, contact, skills, certifications, experience, education, projects, internships, profileImage } = data;

//   const [themeColor, setThemeColor] = useState('#1F2937'); // Default dark color

//   const handleColorChange = (e) => {
//     setThemeColor(e.target.value);
//   };

//   return (
//     <div>
//       {/* Color Picker */}
//       <div className="flex justify-center my-4">
//         <label className="mr-4 font-semibold">Select Resume Color: </label>
//         <input
//           type="color"
//           value={themeColor}
//           onChange={handleColorChange}
//           className="border rounded-md p-2"
//         />
//       </div>

//       {/* Resume Preview */}
//       <div className="flex shadow-lg w-full max-w-4xl mx-auto my-8 border border-gray-300">
//         {/* Left Sidebar */}
//         <div className="w-1/3 p-8" style={{ backgroundColor: themeColor, color: '#fff' }}>
//           {profileImage && (
//             <div className="flex justify-center mb-6">
//               <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full" />
//             </div>
//           )}

//           {/* Contact Information */}
//           <div className="space-y-4 mb-8">
//             <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
//             <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {contact.email}</p>
//             <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {contact.phone}</p>
//             <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {contact.location}</p>
//             <p className="flex items-center"><FaLinkedin className="mr-2" /> {contact.linkedin}</p>
//           </div>

//           {/* Skills */}
//           <div className="mt-4 mb-8">
//             <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
//             <ul className="text-sm space-y-1">
//               {skills.split(',').map((skill, index) => (
//                 <li key={index} className="bg-gray-800 rounded-full px-3 py-1 inline-block">{skill.trim()}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Certifications */}
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
//             {certifications.map((cert, index) => (
//               <div key={index} className="text-sm mb-2">
//                 <p><strong>{cert.name}</strong> - {cert.duration}</p>
//                 <p>{cert.company}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="w-2/3 p-8 bg-white">
//           {/* Name and Title */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold" style={{ color: themeColor }}>{name.toUpperCase()}</h1>
//             <h2 className="text-xl" style={{ color: `${themeColor}99` }}>{title.toUpperCase()}</h2>
//           </div>

//           {/* Summary */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold" style={{ color: themeColor }}>SUMMARY</h3>
//             <p className="text-sm text-gray-600">{summary}</p>
//           </div>

//           {/* Experience or Internships */}
//           {internships && internships.length > 0 ? (
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold" style={{ color: themeColor }}>INTERNSHIPS</h3>
//               {internships.map((intern, index) => (
//                 <div key={index} className="mb-4">
//                   <h4 className="font-semibold ">{intern.title}</h4>
//                   <p className="text-gray-600">{intern.duration}</p>
//                   <p className="text-sm text-gray-600">{intern.details}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EXPERIENCE</h3>
//               {experience.map((exp, index) => (
//                 <div key={index} className="mb-4">
//                   <h4 className="font-semibold">{exp.title}</h4>
//                   <p className="text-gray-600">{exp.duration}</p>
//                   <p className="text-sm text-gray-600">{exp.details}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Projects */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold" style={{ color: themeColor }}>PROJECTS</h3>
//             {projects.map((proj, index) => (
//               <div key={index} className="mb-4">
//                 <h4 className="font-semibold">{proj.name}</h4>
//                 <p className="text-gray-600">{proj.duration}</p>
//                 <p className="text-sm text-gray-600">{proj.details}</p>
//               </div>
//             ))}
//           </div>

//           {/* Education */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EDUCATION</h3>
//             {education.map((edu, index) => (
//               <div key={index} className="mb-4">
//                 <p className="font-semibold">{edu.course}</p>
//                 <p className="text-gray-600">{edu.college} ({edu.duration})</p>
//                 <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumePreview;


import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

const ResumePreview = ({ data,themeColor,selectedFormat }) => {
  const { name, title, summary, contact, skills, certifications, experience, education, projects, internships, profileImage } = data;
  
  const hasExperienceData = experience && experience.some(
    (exp) => exp.title || exp.duration || exp.details
  );
  const hasInternshipData = internships && internships.some(
    (intern) => intern.title || intern.duration || intern.details
  );
     

  // Format 1 - Default Resume Layout
  const renderFormat1 = () => (
    <div className="flex shadow-lg w-full max-w-4xl mx-auto my-8 border border-gray-300">
      {/* Left Sidebar */}
      <div className="w-1/3 p-8" style={{ backgroundColor: themeColor, color: '#fff' }}>
        {profileImage && (
          <div className="flex justify-center mb-6">
            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full" />
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
          <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {contact.email}</p>
          <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {contact.phone}</p>
          <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {contact.location}</p>
          <p className="flex items-center"><FaLinkedin className="mr-2" /> {contact.linkedin}</p>
        </div>

        {/* Skills */}
        <div className="mt-4 mb-8">
          <h3 className="text-lg font-semibold mb-2">SKILLS</h3>
          <ul className="text-sm space-y-1">
            {skills.split(',').map((skill, index) => (
              <li key={index} className="bg-gray-800 rounded-full px-3 py-1 inline-block">{skill.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="text-sm mb-2">
              <p><strong>{cert.name}</strong> - {cert.duration}</p>
              <p>{cert.company}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white">
        {/* Name and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: themeColor }}>{name.toUpperCase()}</h1>
          <h2 className="text-xl" style={{ color: `${themeColor}99` }}>{title.toUpperCase()}</h2>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold" style={{ color: themeColor }}>SUMMARY</h3>
          <p className="text-sm text-gray-600">{summary}</p>
        </div>

        {/* Experience or Internships */}
        {hasInternshipData ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>INTERNSHIPS</h3>
            {internships.map((intern, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold ">{intern.title}</h4>
                <p className="text-gray-600">{intern.duration}</p>
                <p className="text-sm text-gray-600">{intern.details}</p>
              </div>
            ))}
          </div>
        ):null}

        {hasExperienceData ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EXPERIENCE</h3>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-gray-600">{exp.duration}</p>
                <p className="text-sm text-gray-600">{exp.details}</p>
              </div>
            ))}
          </div>
        ): null}

        

        {/* Projects */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold" style={{ color: themeColor }}>PROJECTS</h3>
          {projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold">{proj.name}</h4>
              <p className="text-gray-600">{proj.duration}</p>
              <p className="text-sm text-gray-600">{proj.details}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EDUCATION</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{edu.course}</p>
              <p className="text-gray-600">{edu.college} ({edu.duration})</p>
              <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Format 2 - Alternate Layout (Centered Resume)
  const renderFormat2 = () => (
    <div className="flex flex-col w-full max-w-4xl mx-auto my-8 p-8 border border-gray-300 shadow-lg">
      {/* Name and Title */}
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold" style={{ color: themeColor }}>{name.toUpperCase()}</h1>
        <p className="text-lg text-gray-600">{title.toUpperCase()}</p>
        <p className="text-sm text-gray-600">{contact.email} | {contact.phone}</p>
        <p className="text-sm text-gray-600">{contact.linkedin}</p>
        <p className="text-sm text-gray-600">{contact.location}</p>
      </div>

      {/* Summary Section */}
      <div>
        <h3 className="text-lg font-semibold" style={{ color: themeColor }}>SUMMARY</h3>
        <p>{summary}</p>
      </div>

      {/* Experience or Internships */}
      {hasInternshipData ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>INTERNSHIPS</h3>
            {internships.map((intern, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold ">{intern.title}</h4>
                <p className="text-gray-600">{intern.duration}</p>
                <p className="text-sm text-gray-600">{intern.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EXPERIENCE</h3>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-gray-600">{exp.duration}</p>
                <p className="text-sm text-gray-600">{exp.details}</p>
              </div>
            ))}
          </div>
        )}
      
      {/* Education Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EDUCATION</h3>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold">{edu.course} - {edu.college}</h4>
            <p className="text-gray-600">{edu.duration} - CGPA: {edu.cgpa}</p>
          </div>
        ))}
      </div>
      
      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold" style={{ color: themeColor }}>SKILLS</h3>
        <p>{skills}</p>
      </div>
  
      {/* Projects Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold" style={{ color: themeColor }}>PROJECTS</h3>
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold">{project.name} <span className="text-gray-600">({project.duration})</span></h4>
            <p className="text-sm text-gray-600">{project.details}</p>
          </div>
        ))}
      </div>
  
      
    </div>
  );

  const renderFormat3 = () => (
    <div className="w-full min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl shadow-md rounded-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="w-1/3 p-6 text-white" style={{ backgroundColor: themeColor }}>
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
          </div>
  
          {/* Contact Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
          <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {contact.email}</p>
          <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {contact.phone}</p>
          <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {contact.location}</p>
          <p className="flex items-center"><FaLinkedin className="mr-2" /> {contact.linkedin}</p>
        </div>
  
          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            {skills.split(',').map((skill, index) => (
              <div key={index} className="mb-3">
                <span>{skill.trim()}</span>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Language Skills */}
          {/* Certifications */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="text-sm mb-2">
              <p><strong>{cert.name}</strong> - {cert.duration}</p>
              <p>{cert.company}</p>
            </div>
          ))}
        </div>
        </div>
  
        {/* Right Section */}
        <div className="w-2/3 p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: themeColor }}>{name.toUpperCase()}</h1>
          <h2 className="text-xl" style={{ color: `${themeColor}99` }}>{title.toUpperCase()}</h2>
        </div>

          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4" style={{ color: themeColor }}>About Me</h2>
            <p className="text-gray-600">{summary}</p>
          </div>
  
          {/* Experience or Internships */}
        {hasInternshipData ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>INTERNSHIPS</h3>
            {internships.map((intern, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold ">{intern.title}</h4>
                <p className="text-gray-600">{intern.duration}</p>
                <p className="text-sm text-gray-600">{intern.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EXPERIENCE</h3>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-gray-600">{exp.duration}</p>
                <p className="text-sm text-gray-600">{exp.details}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold" style={{ color: themeColor }}>PROJECTS</h3>
          {projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold">{proj.name}</h4>
              <p className="text-gray-600">{proj.duration}</p>
              <p className="text-sm text-gray-600">{proj.details}</p>
            </div>
          ))}
        </div>
  
          {/* Education */}
          {education && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4" style={{ color: themeColor }}>Education</h2>
              {education.map((school, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-semibold text-lg text-gray-800">{school.course}</h3>
                  <p className="text-gray-500">
                    {school.duration} | {school.college}
                  </p>
                  <p className="text-gray-600">CGPA: {school.cgpa}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderFormat4 = () => (
    <div className="w-full min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl shadow-md rounded-lg overflow-hidden flex">
        {/* Left Section */}
        <div className="w-1/3 p-6 text-white" style={{ backgroundColor: themeColor }}>
          <div className="flex items-center mb-6">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <h2 className="text-lg">{title}</h2>
            </div>
          </div>
  
          {/* Profile Section */}
          <h3 className="text-xl font-semibold mb-2">PROFILE</h3>
          <p className="text-sm">{summary}</p>
  
          {/* Contact Information */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold mb-2">CONTACT</h3>
          <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /> {contact.email}</p>
          <p className="flex items-center mb-2"><FaPhone className="mr-2" /> {contact.phone}</p>
          <p className="flex items-center mb-2"><FaMapMarkerAlt className="mr-2" /> {contact.location}</p>
          <p className="flex items-center"><FaLinkedin className="mr-2" /> {contact.linkedin}</p>
        </div>
  
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">CERTIFICATIONS</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="text-sm mb-2">
              <p><strong>{cert.name}</strong> - {cert.duration}</p>
              <p>{cert.company}</p>
            </div>
          ))}
        </div>
        </div>
  
        {/* Right Section */}
        <div className="w-2/3 p-8">
          {/* Experience or Internships */}
        {hasInternshipData ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>INTERNSHIPS</h3>
            {internships.map((intern, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold ">{intern.title}</h4>
                <p className="text-gray-600">{intern.duration}</p>
                <p className="text-sm text-gray-600">{intern.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>EXPERIENCE</h3>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-gray-600">{exp.duration}</p>
                <p className="text-sm text-gray-600">{exp.details}</p>
              </div>
            ))}
          </div>
        )}
  
          {/* Education Section */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4" style={{ color: themeColor }}>EDUCATION</h2>
          {education.map((school, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg text-gray-800">{school.course}</h3>
              <p className="text-gray-500">{school.duration} | {school.college}</p>
              <p className="text-gray-600">{school.cgpa}</p>
            </div>
          ))}
  
          
          <h2 className="text-2xl font-semibold text-gray-700 mb-4" style={{ color: themeColor }}>SKILLS</h2>
          {skills.split(',').map((skill, index) => (
            <div key={index} className="mb-3">
              <span>{skill.trim()}</span>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="h-4 " style={{ width: skill.proficiency,backgroundColor: themeColor }}></div>
              </div>
            </div>
          ))} 
  
          {/* References Section
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">REFERENCES</h2>
          {references.map((ref, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-lg text-gray-800">{ref.name}</h3>
              <p className="text-gray-500">{ref.title} | {ref.company}</p>
              <p className="text-gray-600">Phone: {ref.phone}</p>
              <p className="text-gray-600">Email: {ref.email}</p>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
  
  

  return (
    <div>
      

      {/* Resume Preview */}
      {selectedFormat === 'format1' && renderFormat1()}
      {selectedFormat === 'format2' && renderFormat2()}
      {selectedFormat === 'format3' && renderFormat3()}
      {selectedFormat === 'format4' && renderFormat4()}
    </div>
  );
};

export default ResumePreview;

