import {
  Building2,
  Briefcase,
  Cpu,
  Globe,
  Landmark,
  Code2,
  Network,
  ShieldCheck,
  Monitor,
} from "lucide-react";

const companies = [
  { icon: Building2, name: "Google" },
  { icon: Cpu, name: "Microsoft" },
  { icon: Globe, name: "Amazon" },
  { icon: Code2, name: "Adobe" },
  { icon: Monitor, name: "Apple" },
  { icon: Landmark, name: "Oracle" },
  { icon: Network, name: "Salesforce" },
  { icon: ShieldCheck, name: "Meta" },
  { icon: Briefcase, name: "Netflix" },
];
const Companies = () => {
  return (
    <section className="bg-[#0F172A] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-14 text-center text-lg text-slate-400">
          Trusted by aspiring professionals targeting
          <span className="ml-2 font-semibold text-white">
            top global companies
          </span>
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">

          {companies.map((company) => {
            const Icon = company.icon;

            return (
              <div
                key={company.name}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:bg-slate-900"
              >
                <Icon
                  size={42}
                  className="text-slate-400 transition-all duration-300 group-hover:text-indigo-400"
                />

                <p className="mt-4 font-medium text-slate-300 group-hover:text-white">
                  {company.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Companies;