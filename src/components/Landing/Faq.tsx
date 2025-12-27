"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What courses does DevArt offer?",
      answer:
        "DevArt offers a comprehensive range of computer science and software development courses, including web development algorithms, system design, and more. All courses are designed and taught by industry experts.",
    },
    {
      question: "How long do I have access to the courses?",
      answer:
        "You have lifetime access to all course materials, including future updates and additions. Learn at your own pace without any time pressure.",
    },
    {
      question: "Do I get a certificate upon completion?",
      answer:
        "Right now, we do not offer certificates for course completion. Our focus is on providing high-quality education and practical skills that you can apply in real-world scenarios.",
    },
    {
      question: "Are the courses suitable for beginners?",
      answer:
        "We offer courses for all skill levels, from complete beginners to advanced developers. Each course clearly indicates its difficulty level and prerequisites to help you choose the right path.",
    },
    {
      question: "What kind of support is available?",
      answer:
        "Our support team is available to assist you with any technical issues or questions you may have.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer:
        "Yes! Our platform is fully responsive and optimized for all devices. You can learn on your desktop, tablet, or smartphone, and your progress syncs automatically across all devices.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-950  px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header!S */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Got questions? We've got answers. Find everything you need to know
            about DevArt below.
          </p>
        </div>

        {/* FAQ Items--*/}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700/50 bg-gray-950 transition-all duration-300 hover:border-orange-500/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6 lg:p-8"
              >
                <span className="text-base font-semibold text-white sm:text-lg lg:text-xl">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange-500 transition-transform duration-300 sm:h-6 sm:w-6 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400 sm:px-6 sm:pb-6 sm:text-base lg:px-8 lg:pb-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
