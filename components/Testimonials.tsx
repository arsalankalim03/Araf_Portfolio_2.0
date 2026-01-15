import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "We've had a great experience working with A'raf. Their team is responsive, strategic, and truly understands how to position a brand. They are highly professional and results-driven.",
    author: "Hammad Rahman",
    role: "Founder",
    company: "Nikah Forever"
  },
  {
    id: 2,
    quote: "A'raf delivered seamless and impactful PR services with fresh ideas and creative vision. Adeeb, the founder, is incredibly professional and truly understands building presence. Highly recommended for dedicated Branding.",
    author: "Nitin Jain",
    role: "Founder",
    company: "IVYN"
  },
  {
    id: 3,
    quote: "Partnering with A'raf for our PR activities was a great decision. The team was proactive, creative, and deeply committed to understanding our brand. Their support helped us amplify GoodLives' presence meaningfully, and I truly appreciated their collaborative approach",
    author: "Sakshi Shah",
    role: "Co-Founder",
    company: "Goodlives"
  },
  {
    id: 4,
    quote: "Collaborating with A'raf was an absolute pleasure. The young, enthusiastic team brought fresh perspectives and handled every detail with care. Adeeb's energy, vision, and commitment truly sets A'raf apart. Highly recommend this passionate and driven team.",
    author: "Aman Chourasia",
    role: "Founder",
    company: "Own It Pure"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-zk-black transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, x: 10, color: "#a3a3a3", transition: { duration: 0.2 } }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl font-medium tracking-tighter text-black dark:text-white mb-24 cursor-default origin-left"
        >
          CLIENT<br/>STORIES
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col justify-between relative"
            >
               {/* Decorative line */}
              <div className="absolute top-0 left-0 w-12 h-[1px] bg-neutral-300 dark:bg-white/20 mb-8" />
              
              <div className="pt-8">
                <Quote className="text-neutral-400 dark:text-neutral-600 mb-8 opacity-50" size={40} strokeWidth={1} />
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-12">
                  "{item.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-500 font-mono text-xs">
                    {item.author.charAt(0)}
                </div>
                <div>
                    <h4 className="text-black dark:text-white font-display text-lg font-bold uppercase tracking-wide leading-none">
                    {item.author}
                    </h4>
                    <p className="text-neutral-500 text-xs uppercase tracking-widest mt-1">
                    {item.role} — {item.company}
                    </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};