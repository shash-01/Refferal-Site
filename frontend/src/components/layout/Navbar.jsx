import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
   <div className="mx-auto flex h-20 w-full max-w-8xl items-center justify-between px-1 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg">
            RH
          </div>

          <span className="text-2xl font-bold text-white ">
            ReferralHub
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 lg:flex">
          <a
            href="#features"
            className="text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-slate-300 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#ai"
            className="text-slate-300 transition hover:text-white"
          >
            AI Matching
          </a>

          <a
            href="#about"
            className="text-slate-300 transition hover:text-white"
          >
            About
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex p-10">
          <Link to="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="px-8 py-4 text-xl">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <button className="text-white lg:hidden">
          <Menu size={28} />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;