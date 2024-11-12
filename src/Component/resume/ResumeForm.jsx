// ResumeForm.jsx
// import React, { useState } from 'react';

// const ResumeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     summary: '',
//     contact: {
//       email: '',
//       phone: '',
//       location: '',
//       linkedin: '',
//     },
//     skills: '',
//     certifications: '',
//     education: '',
//     experience: '',
//     projects: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.contact) {
//       setFormData({
//         ...formData,
//         contact: {
//           ...formData.contact,
//           [name]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resume Builder</h2>

//         {/* Form Fields */}
//         <div>
//           <label className="block font-semibold text-gray-700">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-semibold text-gray-700">Job Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         {/* Summary */}
//         <div>
//           <label className="block font-semibold text-gray-700">Summary</label>
//           <textarea
//             name="summary"
//             value={formData.summary}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Contact Information */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Contact Information</h3>
//           <div className="space-y-2">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.contact.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.contact.phone}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.contact.location}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               name="linkedin"
//               placeholder="LinkedIn Profile URL"
//               value={formData.contact.linkedin}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//         </div>

//         {/* Skills */}
//         <div>
//           <label className="block font-semibold text-gray-700">Skills (comma separated)</label>
//           <input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Certifications */}
//         <div>
//           <label className="block font-semibold text-gray-700">Certifications (comma separated)</label>
//           <input
//             type="text"
//             name="certifications"
//             value={formData.certifications}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Education */}
//         <div>
//           <label className="block font-semibold text-gray-700">Education</label>
//           <textarea
//             name="education"
//             value={formData.education}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Experience */}
//         <div>
//           <label className="block font-semibold text-gray-700">Experience (separate each entry with a new line)</label>
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Projects */}
//         <div>
//           <label className="block font-semibold text-gray-700">Projects (separate each entry with a new line)</label>
//           <textarea
//             name="projects"
//             value={formData.projects}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
        
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Generate Resume
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResumeForm;

// import React, { useState } from 'react';

// const ResumeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     summary: '',
//     contact: {
//       email: '',
//       phone: '',
//       location: '',
//       linkedin: '',
//     },
//     skills: '',
//     certifications: '',
//     education: '',
//     experience: '',
//     projects: '',
//     profileImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.contact) {
//       setFormData({
//         ...formData,
//         contact: {
//           ...formData.contact,
//           [name]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, profileImage: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resume Builder</h2>

//         {/* Profile Image */}
//         <div>
//           <label className="block font-semibold text-gray-700">Profile Image</label>
//           <input type="file" onChange={handleImageUpload} className="w-full p-2" />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-semibold text-gray-700">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Summary */}
//         <div>
//           <label className="block font-semibold text-gray-700">Summary</label>
//           <textarea
//             name="summary"
//             value={formData.summary}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Contact Information */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Contact Information</h3>
//           <div className="space-y-2">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.contact.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.contact.phone}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.contact.location}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               name="linkedin"
//               placeholder="LinkedIn Profile URL"
//               value={formData.contact.linkedin}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//         </div>

//         {/* Skills */}
//         <div>
//           <label className="block font-semibold text-gray-700">Skills (comma separated)</label>
//           <input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Certifications */}
//         <div>
//           <label className="block font-semibold text-gray-700">Certifications (comma separated)</label>
//           <input
//             type="text"
//             name="certifications"
//             value={formData.certifications}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Education */}
//         <div>
//           <label className="block font-semibold text-gray-700">Education</label>
//           <textarea
//             name="education"
//             value={formData.education}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Experience */}
//         <div>
//           <label className="block font-semibold text-gray-700">Experience (separate each entry with a new line)</label>
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Projects */}
//         <div>
//           <label className="block font-semibold text-gray-700">Projects (separate each entry with a new line)</label>
//           <textarea
//             name="projects"
//             value={formData.projects}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
        
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Generate Resume
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResumeForm;

// import React, { useState } from 'react';

// const ResumeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     summary: '',
//     contact: {
//       email: '',
//       phone: '',
//       location: '',
//       linkedin: '',
//     },
//     skills: '',
//     certifications: [{ name: '', duration: '', company: '' }],
//     experience: [{ title: '', duration: '', details: '' }],
//     education: [{ course: '', college: '', duration: '', cgpa: '' }],
//     projects: [{ name: '', duration: '', details: '' }],
//     profileImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.contact) {
//       setFormData({
//         ...formData,
//         contact: {
//           ...formData.contact,
//           [name]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleArrayChange = (section, index, field, value) => {
//     const updatedArray = formData[section].map((item, i) =>
//       i === index ? { ...item, [field]: value } : item
//     );
//     setFormData({ ...formData, [section]: updatedArray });
//   };

//   const handleAddField = (section, template) => {
//     setFormData({ ...formData, [section]: [...formData[section], template] });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, profileImage: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resume Builder</h2>

//         {/* Profile Image */}
//         <div>
//           <label className="block font-semibold text-gray-700">Profile Image</label>
//           <input type="file" onChange={handleImageUpload} className="w-full p-2" />
//         </div>

//         {/* Name and Title */}
//         <div>
//           <label className="block font-semibold text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-semibold text-gray-700">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Summary */}
//         <div>
//           <label className="block font-semibold text-gray-700">Summary</label>
//           <textarea
//             name="summary"
//             value={formData.summary}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             rows='6'
//           />
//         </div>

//         {/* Contact Information */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Contact Information</h3>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.contact.email}
//             onChange={handleChange}
//             className="w-full p-2 border mb-2 border-gray-300 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.contact.phone}
//             onChange={handleChange}
//             className="w-full p-2 border mb-2 border-gray-300 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={formData.contact.location}
//             onChange={handleChange}
//             className="w-full p-2 border mb-2 border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="linkedin"
//             placeholder="LinkedIn Profile URL"
//             value={formData.contact.linkedin}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Skills */}
//         <div>
//           <label className="block font-semibold text-gray-700">Skills (comma separated)</label>
//           <input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Certifications */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Certifications</h3>
//           {formData.certifications.map((cert, index) => (
//             <div key={index} className="space-y-2 mb-2">
//               <input
//                 type="text"
//                 placeholder="Certification Name"
//                 value={cert.name}
//                 onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Duration"
//                 value={cert.duration}
//                 onChange={(e) => handleArrayChange('certifications', index, 'duration', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Company"
//                 value={cert.company}
//                 onChange={(e) => handleArrayChange('certifications', index, 'company', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => handleAddField('certifications', { name: '', duration: '', company: '' })}
//             className="text-blue-600"
//           >
//             Add Certification
//           </button>
//         </div>

//         {/* Experience */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Experience</h3>
//           {formData.experience.map((exp, index) => (
//             <div key={index} className="space-y-2 mb-2">
//               <input
//                 type="text"
//                 placeholder="Job Title"
//                 value={exp.title}
//                 onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Duration"
//                 value={exp.duration}
//                 onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <textarea
//                 placeholder="Details"
//                 value={exp.details}
//                 onChange={(e) => handleArrayChange('experience', index, 'details', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => handleAddField('experience', { title: '', duration: '', details: '' })}
//             className="text-blue-600"
//           >
//             Add Experience
//           </button>
//         </div>

//         {/* Education */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Education</h3>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="space-y-2 mb-2">
//               <input
//                 type="text"
//                 placeholder="Course"
//                 value={edu.course}
//                 onChange={(e) => handleArrayChange('education', index, 'course', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="College"
//                 value={edu.college}
//                 onChange={(e) => handleArrayChange('education', index, 'college', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Duration"
//                 value={edu.duration}
//                 onChange={(e) => handleArrayChange('education', index, 'duration', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="CGPA"
//                 value={edu.cgpa}
//                 onChange={(e) => handleArrayChange('education', index, 'cgpa', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => handleAddField('education', { course: '', college: '', duration: '', cgpa: '' })}
//             className="text-blue-600"
//           >
//             Add Education
//           </button>
//         </div>

//         {/* Projects */}
//         <div>
//           <h3 className="font-semibold text-gray-700">Projects</h3>
//           {formData.projects.map((proj, index) => (
//             <div key={index} className="space-y-2 mb-2">
//               <input
//                 type="text"
//                 placeholder="Project Name"
//                 value={proj.name}
//                 onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Duration"
//                 value={proj.duration}
//                 onChange={(e) => handleArrayChange('projects', index, 'duration', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               <textarea
//                 placeholder="Details"
//                 value={proj.details}
//                 onChange={(e) => handleArrayChange('projects', index, 'details', e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => handleAddField('projects', { name: '', duration: '', details: '' })}
//             className="text-blue-600"
//           >
//             Add Project
//           </button>
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4">
//           Generate Resume
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResumeForm;

import React, { useState } from 'react';
import { Back } from '../back';

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    summary: '',
    contact: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
    },
    skills: '',
    certifications: [{ name: '', duration: '', company: '' }],
    experience: [{ title: '', duration: '', details: '' }],
    internships: [{ title: '', duration: '', details: '' }],
    education: [{ course: '', college: '', duration: '', cgpa: '' }],
    projects: [{ name: '', duration: '', details: '' }],
    profileImage: null,
    experienceType: 'fresher', // New state for toggling between experience and internship
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.contact) {
      setFormData({
        ...formData,
        contact: {
          ...formData.contact,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = formData[section].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, [section]: updatedArray });
  };

  const handleAddField = (section, template) => {
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
    <Back/>
      <div className="max-w-2xl mx-auto h-screen">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-full overflow-y-auto p-4 border border-gray-300 rounded bg-white"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resume Builder</h2>

          {/* Profile Image */}
          <div>
            <label className="block font-semibold text-gray-700">Profile Image</label>
            <input type="file" onChange={handleImageUpload} className="w-full p-2" />
          </div>

          {/* Name and Title */}
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block font-semibold text-gray-700">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="6"
            />
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-gray-700">Contact Information</h3>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.contact.email}
              onChange={handleChange}
              className="w-full p-2 border mb-2 border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.contact.phone}
              onChange={handleChange}
              className="w-full p-2 border mb-2 border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.contact.location}
              onChange={handleChange}
              className="w-full p-2 border mb-2 border-gray-300 rounded"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={formData.contact.linkedin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block font-semibold text-gray-700">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-semibold text-gray-700">Certifications</h3>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="space-y-2 mb-2">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={cert.duration}
                  onChange={(e) => handleArrayChange('certifications', index, 'duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={cert.company}
                  onChange={(e) => handleArrayChange('certifications', index, 'company', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('certifications', { name: '', duration: '', company: '' })}
              className="text-blue-600"
            >
              Add Certification
            </button>
          </div>

          {/* Experience Type (Experienced or Fresher) */}
          <div>
            <label className="block font-semibold text-gray-700">Are you experienced or a fresher?</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="experienceType"
                  value="experienced"
                  checked={formData.experienceType === 'experienced'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Experienced
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="experienceType"
                  value="fresher"
                  checked={formData.experienceType === 'fresher'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Fresher
              </label>
            </div>
          </div>

          {/* Experience or Internship */}
          {formData.experienceType === 'experienced' ? (
            <div>
              <h3 className="font-semibold text-gray-700">Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="space-y-2 mb-2">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Details"
                    value={exp.details}
                    onChange={(e) => handleArrayChange('experience', index, 'details', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField('experience', { title: '', duration: '', details: '' })}
                className="text-blue-600"
              >
                Add Experience
              </button>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-gray-700">Internships</h3>
              {formData.internships.map((intern, index) => (
                <div key={index} className="space-y-2 mb-2">
                  <input
                    type="text"
                    placeholder="Internship Title"
                    value={intern.title}
                    onChange={(e) => handleArrayChange('internships', index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={intern.duration}
                    onChange={(e) => handleArrayChange('internships', index, 'duration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Details"
                    value={intern.details}
                    onChange={(e) => handleArrayChange('internships', index, 'details', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField('internships', { title: '', duration: '', details: '' })}
                className="text-blue-600"
              >
                Add Internship
              </button>
            </div>
          )}

          {/* Education */}
          <div>
            <h3 className="font-semibold text-gray-700">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="space-y-2 mb-2">
                <input
                  type="text"
                  placeholder="Course"
                  value={edu.course}
                  onChange={(e) => handleArrayChange('education', index, 'course', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="College"
                  value={edu.college}
                  onChange={(e) => handleArrayChange('education', index, 'college', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={edu.duration}
                  onChange={(e) => handleArrayChange('education', index, 'duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="CGPA"
                  value={edu.cgpa}
                  onChange={(e) => handleArrayChange('education', index, 'cgpa', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('education', { course: '', college: '', duration: '', cgpa: '' })}
              className="text-blue-600"
            >
              Add Education
            </button>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold text-gray-700">Projects</h3>
            {formData.projects.map((proj, index) => (
              <div key={index} className="space-y-2 mb-2">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={proj.duration}
                  onChange={(e) => handleArrayChange('projects', index, 'duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  placeholder="Details"
                  value={proj.details}
                  onChange={(e) => handleArrayChange('projects', index, 'details', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('projects', { name: '', duration: '', details: '' })}
              className="text-blue-600"
            >
              Add Project
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
            >
              Generate Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
