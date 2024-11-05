// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilePdf, FaTasks, FaCalculator, FaTh } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import ButtonComponent from './ButtonComponent';
// import { FaList } from 'react-icons/fa6';
// import GridComponent from './GridComponent';

// const NewTab = () => {
//     const [isPopupOpen, setPopupOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [viewType, setViewType] = useState('list');
//     const searchInputRef = useRef(null);

//     const tools = [
//         { name: 'Image To Pdf', path: '/imagetopdf', icon: <FaFilePdf className="mr-3 text-red-500" /> },
//         { name: 'Split Pdf', path: '/splitpdf', icon: <FaFilePdf className="mr-3 text-red-500" /> },
//         { name: 'Grocery List', path: '/grocery', icon: <FaTasks className="mr-3 text-purple-500" /> },
//         { name: 'Calculator', path: '/calculator', icon: <FaCalculator className="mr-3 text-teal-500" /> },
//         { name: 'Percentage Calculator', path: '/percentage', icon: <FaCalculator className="mr-3 text-teal-500" /> },
//         { name: 'BMI Calculator', path: '/bmi', icon: <FaCalculator className="mr-3 text-teal-500" /> },
//         { name: 'Fahrenheit to Celsius', path: '/faren-to-celcius', icon: <FaFilePdf className="mr-3 text-blue-500" /> },
//         { name: 'Seconds to HH:MM:SS', path: '/second', icon: <FaFilePdf className="mr-3 text-blue-500" /> },
//         { name: 'HH:MM:SS to Second', path: '/hours', icon: <FaFilePdf className="mr-3 text-blue-500" /> },
//         { name: 'Paypal Link Generator', path: '/paypal', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
//         { name: 'HTML Beautifier', path: '/beautifier', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
//         { name: 'Resume Builder', path: '/resumebuild', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
//         { name: 'Website Link Checker', path: '/linkchecker', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
//     ];

//     // Toggle popup visibility on Ctrl + K press
//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.ctrlKey && event.key === 'k') {
//                 event.preventDefault(); // Prevent browser search
//                 setPopupOpen((prev) => !prev);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, []);

//     // Focus the search input when the popup opens
//     useEffect(() => {
//         if (isPopupOpen && searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     }, [isPopupOpen]);

//     // Filter tools based on search query
//     const filteredTools = tools.filter((tool) =>
//         tool.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="App min-h-screen bg-zinc-100 p-8">
//             <header className="text-center mb-12">
//                 <h1 className="text-5xl font-bold mb-4">DAILY TOOLS</h1>
//             </header>

//             {/* Search Bar */}
//             <div className="flex justify-center mb-12">
//                 <div className="relative w-full max-w-lg">
//                     <input
//                         type="text"
//                         className="w-full border rounded-lg p-4 focus:outline-none shadow-sm"
//                         placeholder="Search tools..."
//                     />
//                     <div className="absolute right-4 top-4 text-gray-400">Ctrl + K</div>
//                 </div>
//             </div>

//             <div className="flex gap-4 mb-8">
//                 <button
//                     onClick={() => setViewType('grid')}
//                     className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-gray-200' : ''}`}
//                 >
//                     <FaTh size={20} />
//                 </button>
//                 <button
//                     onClick={() => setViewType('list')}
//                     className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-gray-200' : ''}`}
//                 >
//                     <FaList size={20} />
//                 </button>
//             </div>

//             {/* Popup Modal */}
//             {isPopupOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-full overflow-y-auto">
//                         <input
//                             ref={searchInputRef}
//                             type="text"
//                             className="w-full border-b-2 p-2 focus:outline-none mb-4"
//                             placeholder="Search for a tool..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <div>
//                             {filteredTools.length > 0 ? (
//                                 filteredTools.map((tool) => (
//                                     <Link to={tool.path} key={tool.name} className="block mb-2">
//                                         <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 w-full">
//                                             {tool.icon}
//                                             <span>{tool.name}</span>
//                                         </button>
//                                     </Link>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-500">No tools found.</p>
//                             )}
//                         </div>
//                         <button
//                             className="mt-4 text-sm text-blue-500"
//                             onClick={() => setPopupOpen(false)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Tool Categories */}
//             {viewType === 'list' ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
//                 <div>
//                     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">PDF</h3>
//                     <ButtonComponent path="/imagetopdf" name="Image To Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
//                     <ButtonComponent path="/splitpdf" name="Split Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
//                 </div>
//                 <div>
//                     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">TODO</h3>
//                     <ButtonComponent path="/grocery" name="Grocery List" icon={<FaTasks className="mr-3 text-purple-500" />} />
//                 </div>
//                 <div>
//                     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">CALCULATOR</h3>
//                     <ButtonComponent path="/calculator" name="Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
//                     <ButtonComponent path="/percentage" name="Percentage Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
//                     <ButtonComponent path="/bmi" name="BMI Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
//                 </div>

//                 {/* CONVERTER Section */}
//                 <div>
//                     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">CONVERTER</h3>
//                     <ButtonComponent path="/faren-to-celcius" name="Fahrenheit to Celsius" icon={<FaFilePdf className="mr-3 text-blue-500" />} />
//                     <ButtonComponent path="/second" name="Seconds to HH:MM:SS" icon={<FaFilePdf className="mr-3 text-blue-500" />} />
//                     <ButtonComponent path="/hours" name="HH:MM:SS to Second" icon={<FaFilePdf className="mr-3 text-blue-500" />} />

//                 </div>

//                 {/* MISC Section */}
//                 <div>
//                     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">MISC</h3>
//                     <ButtonComponent path="/paypal" name="Paypal Link Generator" icon={<FaFilePdf className="mr-3 text-pink-500" />} />
//                     <ButtonComponent path="/beautifier" name="HTML Beautifier" icon={<FaFilePdf className="mr-3 text-pink-500" />} />
//                     <ButtonComponent path="/resumebuild" name="Resume Builder" icon={<FaFilePdf className="mr-3 text-pink-500" />} />
//                     <ButtonComponent path="/linkchecker" name="Website Link Checker" icon={<FaFilePdf className="mr-3 text-pink-500" />} />

//                 </div>
//             </div>
//             ):(
//                 <div className="grid grid-cols-1 gap-8">
//   {/* PDF Section */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">PDF</h3>
//     <GridComponent path="/imagetopdf" name="Image To Pdf" icon={<FaFilePdf className="text-red-500" />} />
//     <GridComponent path="/splitpdf" name="Split Pdf" icon={<FaFilePdf className="text-red-500" />} />
//   </div>

//   {/* TODO Section */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">TODO</h3>
//     <GridComponent path="/grocery" name="Grocery List" icon={<FaTasks className="text-purple-500" />} />
//   </div>

//   {/* Calculator Section */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">CALCULATOR</h3>
//     <GridComponent path="/calculator" name="Calculator" icon={<FaCalculator className="text-teal-500" />} />
//     <GridComponent path="/percentage" name="Percentage Calculator" icon={<FaCalculator className="text-teal-500" />} />
//     <GridComponent path="/bmi" name="BMI Calculator" icon={<FaCalculator className="text-teal-500" />} />
//   </div>

//   {/* Converter Section */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">CONVERTER</h3>
//     <GridComponent path="/faren-to-celcius" name="Fahrenheit to Celsius" icon={<FaFilePdf className="text-blue-500" />} />
//     <GridComponent path="/second" name="Seconds to HH:MM:SS" icon={<FaFilePdf className="text-blue-500" />} />
//     <GridComponent path="/hours" name="HH:MM:SS to Second" icon={<FaFilePdf className="text-blue-500" />} />
//   </div>

//   {/* Misc Section */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//     <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">MISC</h3>
//     <GridComponent path="/paypal" name="Paypal Link Generator" icon={<FaFilePdf className="text-pink-500" />} />
//     <GridComponent path="/beautifier" name="HTML Beautifier" icon={<FaFilePdf className="text-pink-500" />} />
//     <GridComponent path="/resumebuild" name="Resume Builder" icon={<FaFilePdf className="text-pink-500" />} />
//     <GridComponent path="/linkchecker" name="Website Link Checker" icon={<FaFilePdf className="text-pink-500" />} />
//   </div>
// </div>

//             )}

//         </div>
//     );
// };

// export default NewTab;





import React, { useState, useEffect, useRef } from 'react';
import { FaFilePdf, FaTasks, FaCalculator, FaTh } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import { FaList } from 'react-icons/fa6';
import GridComponent from './GridComponent';
import Header from './Component/Header';

const NewTab = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewType, setViewType] = useState('list');
    const searchInputRef = useRef(null);

    const tools = [
        { name: 'Image To Pdf', path: '/imagetopdf', icon: <FaFilePdf className="mr-3 text-red-500" /> },
        { name: 'Split Pdf', path: '/splitpdf', icon: <FaFilePdf className="mr-3 text-red-500" /> },
        { name: 'Grocery List', path: '/grocery', icon: <FaTasks className="mr-3 text-purple-500" /> },
        { name: 'Calculator', path: '/calculator', icon: <FaCalculator className="mr-3 text-teal-500" /> },
        { name: 'Percentage Calculator', path: '/percentage', icon: <FaCalculator className="mr-3 text-teal-500" /> },
        { name: 'BMI Calculator', path: '/bmi', icon: <FaCalculator className="mr-3 text-teal-500" /> },
        { name: 'Fahrenheit to Celsius', path: '/faren-to-celcius', icon: <FaFilePdf className="mr-3 text-blue-500" /> },
        { name: 'Seconds to HH:MM:SS', path: '/second', icon: <FaFilePdf className="mr-3 text-blue-500" /> },
        { name: 'HH:MM:SS to Second', path: '/hours', icon: <FaFilePdf className="mr-3 text-blue-500" /> },
        { name: 'Paypal Link Generator', path: '/paypal', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'HTML Beautifier', path: '/beautifier', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Resume Builder', path: '/resumebuild', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Website Link Checker', path: '/linkchecker', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Compress pdf', path: '/compress', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Merge pdf', path: '/mergepdf', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Pdf Converter', path: '/pdfconverter', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Search Excel', path: '/searchpdf', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Search Pdf', path: '/searchexcelpdf', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Edit Pdf', path: '/editpdf', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Extract Page', path: '/extractpages', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Pdf Cropper', path: '/pdfcropper', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Add page number', path: '/addpagenum', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Protect Pdf', path: '/protect', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
        { name: 'Unlock Pdf', path: '/unlockpdf', icon: <FaFilePdf className="mr-3 text-pink-500" /> },
    ];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setPopupOpen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isPopupOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isPopupOpen]);

    const filteredTools = tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        
        <div className="min-h-screen bg-zinc-100 flex flex-col items-center mt-14 px-8 py-6">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">DAILY TOOLS</h1>
            </header>

            {/* Search Bar */}
            <div className="w-full max-w-3xl mx-auto mb-8">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full border rounded-lg p-4 shadow-sm focus:outline-none"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-4 top-4 text-gray-400">Ctrl + K</div>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-gray-200' : ''}`}
                >
                    <FaTh size={20} />
                </button>
                <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-gray-200' : ''}`}
                >
                    <FaList size={20} />
                </button>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center mt-14 justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-full overflow-y-auto">
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="w-full border-b-2 p-2 focus:outline-none mb-4"
                            placeholder="Search for a tool..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div>
                            {filteredTools.length > 0 ? (
                                filteredTools.map((tool) => (
                                    <Link to={tool.path} key={tool.name} className="block mb-2">
                                        <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 w-full">
                                            {tool.icon}
                                            <span>{tool.name}</span>
                                        </button>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500">No tools found.</p>
                            )}
                        </div>
                        <button
                            className="mt-4 text-sm text-blue-500"
                            onClick={() => setPopupOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl mx-auto">
                {viewType === 'list' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4">PDF</h3>
                            <ButtonComponent path="/imagetopdf" name="Image To Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/splitpdf" name="Split Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/compress" name="Compress Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/mergepdf" name="Merge Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/pdfconverter" name="Pdf Converter" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/searchpdf" name="Search Excel" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            {/* <ButtonComponent path="/searchexcelpdf" name="Search Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} /> */}
                            {/* <ButtonComponent path="/upload" name="Edit Image" icon={<FaFilePdf className="mr-3 text-red-500" />} /> */}
                            <ButtonComponent path="/editpdf" name="Edit Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/extractpages" name="Extract Page" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/pdfcropper" name="Pdf Cropper" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/addpagenum" name="Add page number" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/protect" name="Protect Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            <ButtonComponent path="/unlockpdf" name="Unlock Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                            
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4">TODO</h3>
                            <ButtonComponent path="/grocery" name="Grocery List" icon={<FaTasks className="mr-3 text-purple-500" />} />
                        </div>
                        {/* Other Sections */}
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">CALCULATOR</h3>
                            <ButtonComponent path="/calculator" name="Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
                            <ButtonComponent path="/percentage" name="Percentage Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
                            <ButtonComponent path="/bmi" name="BMI Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
                        </div>

                        {/* CONVERTER Section */}
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">CONVERTER</h3>
                            <ButtonComponent path="/faren-to-celcius" name="Fahrenheit to Celsius" icon={<FaFilePdf className="mr-3 text-blue-500" />} />
                            <ButtonComponent path="/second" name="Seconds to HH:MM:SS" icon={<FaFilePdf className="mr-3 text-blue-500" />} />
                            <ButtonComponent path="/hours" name="HH:MM:SS to Second" icon={<FaFilePdf className="mr-3 text-blue-500" />} />

                        </div>

                        {/* MISC Section */}
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">MISC</h3>
                            <ButtonComponent path="/paypal" name="Paypal Link Generator" icon={<FaFilePdf className="mr-3 text-pink-500" />} />
                            <ButtonComponent path="/beautifier" name="HTML Beautifier" icon={<FaFilePdf className="mr-3 text-pink-500" />} />
                            <ButtonComponent path="/resumebuild" name="Resume Builder" icon={<FaFilePdf className="mr-3 text-pink-500" />} />
                            <ButtonComponent path="/linkchecker" name="Website Link Checker" icon={<FaFilePdf className="mr-3 text-pink-500" />} />

                        </div>
                    </div>
                ) : (
                    <div >
                        {/* Render Grid View */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">PDF</h3>
                            <GridComponent path="/imagetopdf" name="Image To Pdf" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/splitpdf" name="Split Pdf" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/compress" name="Compress Pdf" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/mergepdf" name="Merge Pdf" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/pdfconverter" name="Pdf Converter" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/searchpdf" name="Search Excel" icon={<FaFilePdf className="text-red-500" />} />
                            {/* <GridComponent path="/searchexcelpdf" name="Search Pdf" icon={<FaFilePdf className="text-red-500" />} /> */}
                            <GridComponent path="/editpdf" name="Edit Pdf" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/pdfcropper" name="Pdf Cropper" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/addpagenum" name="Add page number" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/protect" name="Protect Pdf" icon={<FaFilePdf className="text-red-500" />} />
                            <GridComponent path="/unlockpdf" name="Unlock Pdf" icon={<FaFilePdf className="text-red-500" />} />
                        </div>

                        {/* TODO Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">TODO</h3>
                            <GridComponent path="/grocery" name="Grocery List" icon={<FaTasks className="text-purple-500" />} />
                        </div>

                        {/* Calculator Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">CALCULATOR</h3>
                            <GridComponent path="/calculator" name="Calculator" icon={<FaCalculator className="text-teal-500" />} />
                            <GridComponent path="/percentage" name="Percentage Calculator" icon={<FaCalculator className="text-teal-500" />} />
                            <GridComponent path="/bmi" name="BMI Calculator" icon={<FaCalculator className="text-teal-500" />} />
                        </div>

                        {/* Converter Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">CONVERTER</h3>
                            <GridComponent path="/faren-to-celcius" name="Fahrenheit to Celsius" icon={<FaFilePdf className="text-blue-500" />} />
                            <GridComponent path="/second" name="Seconds to HH:MM:SS" icon={<FaFilePdf className="text-blue-500" />} />
                            <GridComponent path="/hours" name="HH:MM:SS to Second" icon={<FaFilePdf className="text-blue-500" />} />
                        </div>

                        {/* Misc Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                            <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4 col-span-full">MISC</h3>
                            <GridComponent path="/paypal" name="Paypal Link Generator" icon={<FaFilePdf className="text-pink-500" />} />
                            <GridComponent path="/beautifier" name="HTML Beautifier" icon={<FaFilePdf className="text-pink-500" />} />
                            <GridComponent path="/resumebuild" name="Resume Builder" icon={<FaFilePdf className="text-pink-500" />} />
                            <GridComponent path="/linkchecker" name="Link Checker" icon={<FaFilePdf className="text-pink-500" />} />
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default NewTab;
