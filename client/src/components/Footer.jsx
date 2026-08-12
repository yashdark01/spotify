import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-10 py-8">
      <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-3">
        <div>
          <h3 className="font-bold">Music Player</h3>
          <p className="mt-2 text-gray-400">
            Full-stack streaming app — MERN, Redux Toolkit, Clerk auth, MongoDB
            aggregation pipelines.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Project</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>
              <a
                href="https://github.com/yashdark01/Music-Player"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                GitHub repository
              </a>
            </li>
            <li>
              <a
                href="https://yashpatidar.vercel.app/work/music-player"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Portfolio case study
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Built by</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li>Yash Patidar</li>
            <li>IIIT Nagpur · Full Stack Developer</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-gray-700 pt-4">
        <span className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Yash Patidar · Portfolio project
        </span>
        <div className="flex space-x-4">
          <a
            href="https://github.com/yashdark01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-xl text-white hover:text-green-400" />
          </a>
          <a
            href="https://linkedin.com/in/yash-patidar-97a8861b3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-xl text-white hover:text-green-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
