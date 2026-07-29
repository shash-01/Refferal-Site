import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-[#0F172A] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-[40px] border border-indigo-500/20 bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 p-16 text-center shadow-2xl">

          <h2 className="text-5xl font-bold text-white">
            Ready to build your professional network?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-indigo-100">
            Join ReferralHub today and connect with professionals,
            discover referral opportunities, and accelerate your career
            with the power of AI.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;