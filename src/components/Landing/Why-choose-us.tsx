import { CheckCircle, Zap, Users, Award } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: CheckCircle,
      title: "Expert-led Courses",
      description:
        "Learn from professionals real skills and topics that are essentials for software development.",
    },
    {
      icon: Zap,
      title: "Real-world Topics",
      description:
        "Master practical skills that you can apply immediately to your projects and career.",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Your'e not alone in this field and you are not the first to have those problems!",
    },
    {
      icon: Award,
      title: "Certification",
      description:
        "Earn certificates upon completion to showcase your new skills.",
    },
  ];

  return (
    <section className="bg-gray-950  px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              DevArt
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Join the elite platform where developers master their craft with
            cutting-edge courses and resources
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-700/50 bg-gray-950  p-6 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 sm:p-8"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-amber-600 sm:h-14 sm:w-14">
                <feature.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
