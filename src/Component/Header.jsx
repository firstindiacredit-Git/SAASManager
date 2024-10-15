import { FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logoimage from '../assets/logo.png';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 h-14">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-2">  {/* Wrap in Link */}
                    <img 
                        src={logoimage} 
                        alt="Logo" 
                        className="h-8" 
                    />
                </Link>

                {/* Links Section */}
                <nav className="flex items-center space-x-8 text-sm text-gray-700">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
                    <Link to="/contact" className="hover:underline">Contact Us</Link>
                    <button>
                        <FaGlobe size={20} />
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
