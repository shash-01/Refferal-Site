import { Link } from "react-router-dom";
import { Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 font-bold text-white">
                RH
              </div>

              <h2 className="text-2xl font-bold text-white">
                ReferralHub
              </h2>
            </div>

            <p className="leading-7 text-slate-400">
              AI-powered referral platform helping students
              and professionals connect with employees,
              discover opportunities, and accelerate their careers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Product
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#how-it-works" className="hover:text-white transition">
                  How It Works
                </a>
              </li>

              <li>
                <Link to="/register" className="hover:text-white transition">
                  Get Started
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <a href="#" className="hover:text-white transition">
                  Documentation
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  API
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
             <FaGithub size={20} className="text-white" />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
             <FaLinkedin size={20} className="text-white" />
              </a>

              <a
                href="#"
                className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <Mail size={20} className="text-white" />
              </a>

            </div>

          </div>

        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 ReferralHub. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Built with
            <Heart size={16} className="fill-red-500 text-red-500" />
            by Shashank Bhardwaj
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;