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

import React, { useState } from 'react';

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
    certifications: '',
    education: '',
    experience: '',
    projects: '',
    profileImage: null,
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
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resume Builder</h2>

        {/* Profile Image */}
        <div>
          <label className="block font-semibold text-gray-700">Profile Image</label>
          <input type="file" onChange={handleImageUpload} className="w-full p-2" />
        </div>

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
          />
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-gray-700">Contact Information</h3>
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.contact.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.contact.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.contact.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
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
          <label className="block font-semibold text-gray-700">Certifications (comma separated)</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Education */}
        <div>
          <label className="block font-semibold text-gray-700">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-semibold text-gray-700">Experience (separate each entry with a new line)</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Projects */}
        <div>
          <label className="block font-semibold text-gray-700">Projects (separate each entry with a new line)</label>
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
