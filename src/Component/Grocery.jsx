// import React, { useState, useEffect } from 'react';

// // Updated list of grocery images
// const groceryImages = [
//     { name: 'Apple', image: '../src/assets/Apple.png' },  // Corrected path
//     { name: 'Banana', image: '../src/assets/Banana.png' }, // Corrected path
//     { name: 'Milk', image: '../src/assets/image.png' },     // Corrected file name
//     { name: 'Bread', image: '../src/assets/Bread.png' },   // Fixed missing slash in path
//     { name: 'Broccoli', image: '../src/assets/Broccoli.png' },
//     { name: 'Cabbage', image: '../src/assets/Cabbage.png' },
//     { name: 'Carrot', image: '../src/assets/Carrot.png' },
//     { name: 'Chili', image: '../src/assets/Chili.png' },
//     { name: 'Ice-cream', image: '../src/assets/Ice-cream.png' },
//     { name: 'Kiwi', image: '../src/assets/Kiwi.png' },
//     { name: 'Lemon', image: '../src/assets/Lemon.png' },
//     { name: 'Lime', image: '../src/assets/Lime.png' },
//     { name: 'Pea', image: '../src/assets/Pea.png' },
//     { name: 'Strawberry', image: '../src/assets/Strawberry.png' },
//     //{ name: 'Sandwich', image: '../src/assets/Sandwich.png' },
//     { name: 'Tomato', image: '../src/assets/Tomato.png' },
// ];

// // Component
// const Grocery = () => {
//     const [groceries, setGroceries] = useState([]);
//     const [input, setInput] = useState({ name: '', quantity: '', image: null });
//     const [editIndex, setEditIndex] = useState(null);
//     const [isImageModalOpen, setIsImageModalOpen] = useState(false);

//     // Load grocery list from local storage
//     useEffect(() => {
//         const savedGroceries = JSON.parse(localStorage.getItem('groceries')) || [];
//         setGroceries(savedGroceries); // Default to an empty array if nothing is in local storage
//     }, []);

//     // Save groceries to local storage
//     useEffect(() => {
//         if (groceries.length > 0) {
//             localStorage.setItem('groceries', JSON.stringify(groceries));
//         }
//     }, [groceries]);

//     // Handle form input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInput((prev) => ({ ...prev, [name]: value }));
//     };

//     // Open image selection modal
//     const openImageModal = () => {
//         setIsImageModalOpen(true);
//     };

//     // Handle image selection
//     const handleImageSelect = (image) => {
//         setInput((prev) => ({ ...prev, image }));
//         setIsImageModalOpen(false); // Close modal after selection
//     };

//     // Add or update grocery item
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (input.name && input.quantity && input.image) {
//             if (editIndex !== null) {
//                 const updatedGroceries = [...groceries];
//                 updatedGroceries[editIndex] = input;
//                 setGroceries(updatedGroceries);
//                 setEditIndex(null);
//             } else {
//                 setGroceries([...groceries, input]);
//             }
//             setInput({ name: '', quantity: '', image: null });
//         }
//     };

//     // Edit grocery item
//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setInput(groceries[index]);
//     };

//     // Delete grocery item
//     const handleDelete = (index) => {
//         const updatedGroceries = groceries.filter((_, i) => i !== index);
//         setGroceries(updatedGroceries);

//         // Update local storage after deletion
//         localStorage.setItem('groceries', JSON.stringify(updatedGroceries));
//     };

//     // Download grocery list as plain text
//     const handleDownload = () => {
//         let listText = groceries.map(
//             (grocery) => `Item: ${grocery.name}, Quantity: ${grocery.quantity}`
//         ).join('\n');

//         const element = document.createElement('a');
//         const file = new Blob([listText], { type: 'text/plain' });
//         element.href = URL.createObjectURL(file);
//         element.download = 'grocery-list.txt';
//         document.body.appendChild(element); // Required for FireFox
//         element.click();
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-4">
//             <h1 className="text-2xl font-bold text-center">Grocery To-Do List</h1>

//             {/* Form to add or edit grocery */}
//             <form className="max-w-lg mx-auto mt-6" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Grocery Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={input.name}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-lg"
//                         placeholder="Enter grocery item"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Quantity</label>
//                     <input
//                         type="text"
//                         name="quantity"
//                         value={input.quantity}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded-lg"
//                         placeholder="Enter quantity"
//                     />
//                 </div>

//                 {/* Image selection button */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Select Grocery Image</label>
//                     <button
//                         type="button"
//                         onClick={openImageModal}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     >
//                         Select Image
//                     </button>
//                     {input.image && (
//                         <img
//                             src={input.image}
//                             alt="Selected"
//                             className="w-16 h-16 object-cover mt-2"
//                         />
//                     )}
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                 >
//                     {editIndex !== null ? 'Update Item' : 'Add Item'}
//                 </button>
//             </form>

//             {/* Display grocery list */}
//             <div className="max-w-lg mx-auto mt-6">
//                 {groceries.length === 0 ? (
//                     <p className="text-center text-gray-600">No groceries added yet.</p>
//                 ) : (
//                     <ul className="space-y-4">
//                         {groceries.map((grocery, index) => (
//                             <li
//                                 key={index}
//                                 className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
//                             >
//                                 {/* Grocery Image */}
//                                 {grocery.image && (
//                                     <img
//                                         src={grocery.image}
//                                         alt={grocery.name}
//                                         className="w-16 h-16 object-cover"
//                                     />
//                                 )}

//                                 {/* Name and Quantity */}
//                                 <div className="flex-grow">
//                                     <p className="font-bold text-lg">{grocery.name}</p>
//                                     <p className="text-gray-600">Quantity: {grocery.quantity}</p>
//                                 </div>

//                                 {/* Edit and Delete buttons */}
//                                 <div className="flex space-x-2">
//                                     <button
//                                         onClick={() => handleEdit(index)}
//                                         className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(index)}
//                                         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Download list */}
//             <div className="text-center mt-6">
//                 <button
//                     onClick={handleDownload}
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 >
//                     Download List
//                 </button>
//             </div>

//             {/* Image selection modal */}
//             {isImageModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white rounded-lg p-6">
//                         <h2 className="text-xl font-bold mb-4">Select an Image</h2>
//                         <div className="grid grid-cols-3 gap-4">
//                             {groceryImages.map((grocery, index) => (
//                                 <div
//                                     key={index}
//                                     className="border rounded-lg p-2 cursor-pointer"
//                                     onClick={() => handleImageSelect(grocery.image)}
//                                 >
//                                     <img
//                                         src={grocery.image}
//                                         alt={grocery.name}
//                                         className="w-16 h-16 object-cover mx-auto"
//                                     />
//                                     <p className="text-center mt-2">{grocery.name}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//                             onClick={() => setIsImageModalOpen(false)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Grocery;

import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';  // Import jsPDF for PDF generation

// Updated list of grocery images
const groceryImages = [
    { name: 'Apple', image: '../src/assets/Apple.png' },
    { name: 'Banana', image: '../src/assets/Banana.png' },
    { name: 'Milk', image: '../src/assets/image.png' },
    { name: 'Bread', image: '../src/assets/Bread.png' },
    { name: 'Broccoli', image: '../src/assets/Broccoli.png' },
    { name: 'Cabbage', image: '../src/assets/Cabbage.png' },
    { name: 'Carrot', image: '../src/assets/Carrot.png' },
    { name: 'Chili', image: '../src/assets/Chili.png' },
    { name: 'Ice-cream', image: '../src/assets/Ice-cream.png' },
    { name: 'Kiwi', image: '../src/assets/Kiwi.png' },
    { name: 'Lemon', image: '../src/assets/Lemon.png' },
    { name: 'Lime', image: '../src/assets/Lime.png' },
    { name: 'Pea', image: '../src/assets/Pea.png' },
    { name: 'Strawberry', image: '../src/assets/Strawberry.png' },
    { name: 'Tomato', image: '../src/assets/Tomato.png' },
];

const Grocery = () => {
    const [groceries, setGroceries] = useState([]);
    const [input, setInput] = useState({ name: '', quantity: '', image: null });
    const [editIndex, setEditIndex] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    useEffect(() => {
        const savedGroceries = JSON.parse(localStorage.getItem('groceries')) || [];
        setGroceries(savedGroceries);
    }, []);

    useEffect(() => {
        if (groceries.length > 0) {
            localStorage.setItem('groceries', JSON.stringify(groceries));
        }
    }, [groceries]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const openImageModal = () => {
        setIsImageModalOpen(true);
    };

    const handleImageSelect = (image) => {
        setInput((prev) => ({ ...prev, image }));
        setIsImageModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.name && input.quantity && input.image) {
            if (editIndex !== null) {
                const updatedGroceries = [...groceries];
                updatedGroceries[editIndex] = input;
                setGroceries(updatedGroceries);
                setEditIndex(null);
            } else {
                setGroceries([...groceries, input]);
            }
            setInput({ name: '', quantity: '', image: null });
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setInput(groceries[index]);
    };

    const handleDelete = (index) => {
        const updatedGroceries = groceries.filter((_, i) => i !== index);
        setGroceries(updatedGroceries);
        localStorage.setItem('groceries', JSON.stringify(updatedGroceries));
    };

    const generateTimestamp = () => {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

    // Download grocery list as PDF with quantity and images
    const handleDownloadPDF = () => {
        const timestamp = generateTimestamp();
        const doc = new jsPDF();
        let yPosition = 20;  // Starting position for content

        doc.text('Grocery To-Do List', 10, 10);

        groceries.forEach((grocery, index) => {
            // Load image and draw it
            const img = new Image();
            img.src = grocery.image;

            img.onload = function () {
                const imgWidth = 20;
                const imgHeight = 20;
                doc.addImage(img, 'PNG', 10, yPosition, imgWidth, imgHeight);  // Add image at specified position

                // Add grocery name and quantity next to the image
                doc.text(`${index + 1}. ${grocery.name} (Quantity: ${grocery.quantity})`, 40, yPosition + 10);

                yPosition += 30;  // Move down for the next item
                if (index === groceries.length - 1) {
                    // Save the document once all items have been added
                    doc.text(`Generated on: ${timestamp}`, 10, yPosition + 10);
                    doc.save(`grocery-list-${timestamp}.pdf`);
                }
            };
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-center">Grocery To-Do List</h1>

            {/* Form to add or edit grocery */}
            <form className="max-w-lg mx-auto mt-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Grocery Name</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter grocery item"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="text"
                        name="quantity"
                        value={input.quantity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter quantity"
                    />
                </div>

                {/* Image selection button */}
                <div className="mb-4">
                    <label className="block text-gray-700">Select Grocery Image</label>
                    <button
                        type="button"
                        onClick={openImageModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Select Image
                    </button>
                    {input.image && (
                        <img
                            src={input.image}
                            alt="Selected"
                            className="w-16 h-16 object-cover mt-2"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    {editIndex !== null ? 'Update Item' : 'Add Item'}
                </button>
            </form>

            {/* Display grocery list */}
            <div className="max-w-lg mx-auto mt-6">
                {groceries.length === 0 ? (
                    <p className="text-center text-gray-600">No groceries added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {groceries.map((grocery, index) => (
                            <li
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
                            >
                                {grocery.image && (
                                    <img
                                        src={grocery.image}
                                        alt={grocery.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                )}

                                <div className="flex-grow">
                                    <p className="font-bold text-lg">{grocery.name}</p>
                                    <p className="text-gray-600">Quantity: {grocery.quantity}</p>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Download list */}
            <div className="max-w-lg mx-auto mt-6">
                <button
                    onClick={handleDownloadPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Download as PDF
                </button>
            </div>

            {/* Image selection modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
                        <h2 className="text-lg font-bold mb-4">Select an Image</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {groceryImages.map((img) => (
                                <img
                                    key={img.name}
                                    src={img.image}
                                    alt={img.name}
                                    className="w-16 h-16 object-cover cursor-pointer"
                                    onClick={() => handleImageSelect(img.image)}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Grocery;
