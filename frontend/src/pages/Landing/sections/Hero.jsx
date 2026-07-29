import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] pt-32 pb-24">
      {/* Background Blur */}
      <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={16} />
            AI Powered Referral Platform
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
            Connect.
            <br />
            Refer.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            ReferralHub helps students and professionals discover referral
            opportunities, connect with employees, and land interviews faster
            using AI-powered recommendations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button className="h-12 rounded-xl bg-indigo-600 px-8 hover:bg-indigo-700">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-xl border-slate-600 bg-transparent px-8 text-white hover:bg-slate-800"
            >
              Explore Referrals
            </Button>
          </div>

          <div className="mt-10 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold text-white">1000+</h2>
              <p className="text-slate-400">Users</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">500+</h2>
              <p className="text-slate-400">Referrals</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">100+</h2>
              <p className="text-slate-400">Companies</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl">
            {/* Top */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Referral Dashboard
                </h2>
                <p className="text-sm text-slate-400">
                  AI Recommendation Score
                </p>
              </div>

              <div className="rounded-xl bg-green-500/20 px-4 py-2 text-green-400">
                95%
              </div>
            </div>

            {/* Cards */}

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      Google SDE Internship
                    </h3>

                    <p className="text-sm text-slate-400">
                      Posted 2 hours ago
                    </p>
                  </div>

                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                    AI Match
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-[92%] rounded-full bg-indigo-500"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      Microsoft Backend
                    </h3>

                    <p className="text-sm text-slate-400">
                      Resume Score 89%
                    </p>
                  </div>

                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                    Recommended
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-700">
                  <div className="h-2 w-[89%] rounded-full bg-cyan-500"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <h3 className="mb-4 font-semibold text-white">
                  Recent Notifications
                </h3>

                <div className="space-y-3">
                  <div className="rounded-xl bg-slate-700 p-3 text-sm text-slate-300">
                    🎉 Your Google referral has been accepted.
                  </div>

                  <div className="rounded-xl bg-slate-700 p-3 text-sm text-slate-300">
                    🚀 Microsoft Backend Referral available.
                  </div>

                  <div className="rounded-xl bg-slate-700 p-3 text-sm text-slate-300">
                    🤖 AI found 7 matching referrals.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;