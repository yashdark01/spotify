import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-10 py-8">
      <div className="grid grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold">Company</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>About</li>
            <li>Jobs</li>
            <li>For the Record</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Communities</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>For Artists</li>
            <li>Developers</li>
            <li>Advertising</li>
            <li>Investors</li>
            <li>Vendors</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Useful links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>Support</li>
            <li>Free Mobile App</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Spotify Plans</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>Premium Individual</li>
            <li>Premium Duo</li>
            <li>Premium Family</li>
            <li>Premium Student</li>
            <li>Spotify Free</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8 border-t border-gray-700 pt-4">
        <span className="text-gray-400 text-sm">&copy; 2025 Spotify AB</span>
        <div className="flex space-x-4">
          <FaInstagram className="text-xl text-white" />
          <FaTwitter className="text-xl text-white" />
          <FaFacebook className="text-xl text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;