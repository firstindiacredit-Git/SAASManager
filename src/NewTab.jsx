import React, { useState, useEffect, useRef } from 'react';
import { FaFilePdf, FaTasks, FaCalculator } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';

const NewTab = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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
    ];

    // Toggle popup visibility on Ctrl + K press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault(); // Prevent browser search
                setPopupOpen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus the search input when the popup opens
    useEffect(() => {
        if (isPopupOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isPopupOpen]);

    // Filter tools based on search query
    const filteredTools = tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="App min-h-screen bg-zinc-100 p-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">DAILY TOOLS</h1>
            </header>

            {/* Search Bar */}
            <div className="flex justify-center mb-12">
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        className="w-full border rounded-lg p-4 focus:outline-none shadow-sm"
                        placeholder="Search tools..."
                    />
                    <div className="absolute right-4 top-4 text-gray-400">Ctrl + K</div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

            {/* Tool Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
                <div>
                    <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">PDF</h3>
                    <ButtonComponent path="/imagetopdf" name="Image To Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                    <ButtonComponent path="/splitpdf" name="Split Pdf" icon={<FaFilePdf className="mr-3 text-red-500" />} />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">TODO</h3>
                    <ButtonComponent path="/grocery" name="Grocery List" icon={<FaTasks className="mr-3 text-purple-500" />} />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">CALCULATOR</h3>
                    <ButtonComponent path="/calculator" name="Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
                    <ButtonComponent path="/percentage" name="Percentage Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
                    <ButtonComponent path="/bmi" name="BMI Calculator" icon={<FaCalculator className="mr-3 text-teal-500" />} />
                </div>
                
                                {/* CONVERTER Section */}
                                <div>
                    <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">CONVERTER</h3>
                    <ButtonComponent path="/faren-to-celcius" name="Fahrenheit to Celsius" icon={<FaFilePdf className="mr-3 text-blue-500" />}/>
                    <ButtonComponent path="/second" name="Seconds to HH:MM:SS" icon={<FaFilePdf className="mr-3 text-blue-500" />}/>
                    <ButtonComponent path="/hours" name="HH:MM:SS to Second" icon={<FaFilePdf className="mr-3 text-blue-500" />}/>
                    
                </div>

                {/* MISC Section */}
                <div>
                    <h3 className="font-semibold text-lg text-neutral-600 text-left mb-4 pl-4">MISC</h3>
                    <ButtonComponent path="/paypal" name="Paypal Link Generator" icon={<FaFilePdf className="mr-3 text-pink-500" />}/>
                    <ButtonComponent path="/beautifier" name="HTML Beautifier" icon={<FaFilePdf className="mr-3 text-pink-500" />}/>
                    <ButtonComponent path="/resumebuild" name="Resume Builder" icon={<FaFilePdf className="mr-3 text-pink-500" />}/>
                    <ButtonComponent path="/linkchecker" name="Website Link Checker" icon={<FaFilePdf className="mr-3 text-pink-500" />}/>
                    
                </div>
            </div>
        </div>
    );
};

export default NewTab;

