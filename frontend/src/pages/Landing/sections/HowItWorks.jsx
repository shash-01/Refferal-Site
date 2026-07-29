import {
  UserPlus,
  Search,
  Send,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Build your professional profile with skills, education, experience, and resume.",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Search professionals and referral opportunities using smart filters.",
  },
  {
    icon: Send,
    title: "Apply for Referrals",
    description:
      "Send referral requests directly to employees and track every application.",
  },
  {
    icon: BadgeCheck,
    title: "Get Referred & Hired",
    description:
      "Receive referrals, prepare for interviews, and land your dream job.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-[#0F172A] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-24 max-w-3xl text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
            How It Works
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Get referred in
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}4 simple steps
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            ReferralHub simplifies the referral journey from building your
            profile to receiving referrals from professionals.
          </p>

        </div>

        <div className="relative grid gap-10 lg:grid-cols-4">

          {/* Horizontal Line */}
          <div className="absolute left-0 right-0 top-10 hidden h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative z-10 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-[#0F172A] bg-gradient-to-r from-indigo-600 to-violet-600 shadow-2xl">

                  <Icon
                    size={34}
                    className="text-white"
                  />

                </div>

                <div className="mt-8">

                  <div className="mb-4 text-lg font-bold text-indigo-400">
                    Step {index + 1}
                  </div>

                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="leading-8 text-slate-400">
                    {step.description}
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

export default HowItWorks;