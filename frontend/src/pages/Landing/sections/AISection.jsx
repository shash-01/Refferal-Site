import {
  BrainCircuit,
  FileSearch,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const aiFeatures = [
  {
    icon: BrainCircuit,
    title: "Smart Referral Matching",
    description:
      "AI recommends the most relevant referral opportunities based on your profile, skills, and career goals.",
  },
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description:
      "Automatically analyze resumes to identify strengths, missing skills, and improvement suggestions.",
  },
  {
    icon: TrendingUp,
    title: "Candidate Ranking",
    description:
      "Rank applicants intelligently using resume quality, skills, projects, and experience.",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Receive AI-powered suggestions for companies, jobs, and professionals that match your profile.",
  },
];

const AISection = () => {
  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-[#0F172A] py-28"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
            Artificial Intelligence
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Powered by
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Intelligent Recommendations
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            ReferralHub leverages Artificial Intelligence to simplify networking,
            improve referrals, and help users discover better career
            opportunities.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {aiFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 shadow-lg">

                  <Icon
                    className="text-white"
                    size={30}
                  />

                </div>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="leading-8 text-slate-400">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom AI Preview */}

        <div className="mt-24 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/10 via-violet-600/10 to-cyan-600/10 p-10 backdrop-blur-xl">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <h3 className="mb-5 text-4xl font-bold text-white">
                AI Career Assistant
              </h3>

              <p className="mb-8 text-lg leading-8 text-slate-400">
                Our upcoming AI assistant will help users optimize resumes,
                identify skill gaps, recommend jobs, and prepare for interviews
                using intelligent insights.
              </p>

              <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-semibold text-white transition hover:scale-105">
                Coming Soon 🚀
              </button>

            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">

              <div className="mb-5 flex items-center justify-between">

                <h4 className="font-semibold text-white">
                  AI Recommendation
                </h4>

                <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                  96% Match
                </span>

              </div>

              <div className="space-y-4">

                <div className="rounded-xl bg-slate-800 p-4">
                  ✅ Google Software Engineer Internship
                </div>

                <div className="rounded-xl bg-slate-800 p-4">
                  ✅ Microsoft Backend Developer
                </div>

                <div className="rounded-xl bg-slate-800 p-4">
                  ✅ Amazon SDE I
                </div>

                <div className="rounded-xl bg-slate-800 p-4">
                  🤖 Resume Score : 91/100
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AISection;