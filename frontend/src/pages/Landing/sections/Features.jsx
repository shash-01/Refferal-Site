import {
  BrainCircuit,
  Users,
  Search,
  Bell,
  FileText,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Referral Matching",
    description:
      "Discover the most relevant referral opportunities using intelligent matching algorithms.",
  },
  {
    icon: Users,
    title: "Professional Networking",
    description:
      "Connect with employees from top companies and expand your professional network.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description:
      "Search professionals by company, role, skills, and username with powerful filters.",
  },
  {
    icon: FileText,
    title: "Resume Management",
    description:
      "Upload, update, and manage resumes securely with cloud storage integration.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Receive instant updates on applications, referrals, and important activities.",
  },
  {
    icon: Briefcase,
    title: "Referral Marketplace",
    description:
      "Browse, apply, and manage referral opportunities from professionals worldwide.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-[#0F172A] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            Why ReferralHub
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Everything you need to
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}land your next opportunity.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Built for students, professionals, and employees who want
            a smarter and faster referral experience.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-indigo-500"
              >

                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

                <div className="relative z-10">

                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">

                    <Icon
                      size={30}
                      className="text-white"
                    />

                  </div>

                  <h3 className="mb-4 text-2xl font-semibold text-white">

                    {feature.title}

                  </h3>

                  <p className="leading-8 text-slate-400">

                    {feature.description}

                  </p>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;