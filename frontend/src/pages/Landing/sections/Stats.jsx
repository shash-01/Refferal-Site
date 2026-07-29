import {
  Users,
  Briefcase,
  Building2,
  BadgeCheck,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "1,500+",
    title: "Active Users",
  },
  {
    icon: Building2,
    number: "350+",
    title: "Companies",
  },
  {
    icon: Briefcase,
    number: "12,000+",
    title: "Referral Requests",
  },
  {
    icon: BadgeCheck,
    number: "4,000+",
    title: "Successful Referrals",
  },
];

const Stats = () => {
  return (
    <section className="bg-[#0F172A] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            Platform Statistics
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Growing every
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}single day
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Thousands of students and professionals are already using
            ReferralHub to discover better career opportunities.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
              >

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">

                  <Icon
                    size={30}
                    className="text-white"
                  />

                </div>

                <h3 className="text-5xl font-extrabold text-white">
                  {stat.number}
                </h3>

                <p className="mt-3 text-lg text-slate-400">
                  {stat.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Stats;