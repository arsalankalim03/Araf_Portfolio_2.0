
import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { db } from '../services/db';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await db.addSubmission(formState);
      
      setIsSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 bg-zk-white dark:bg-zk-black min-h-screen flex flex-col justify-between transition-colors duration-500"
    >
      <div className="max-w-[1600px] mx-auto w-full px-6 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="lg:sticky lg:top-32 h-fit">
             <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, x: 10, color: "#a3a3a3", transition: { duration: 0.2 } }}
              transition={{ duration: 0.5 }}
              className="font-display text-[12vw] lg:text-[10vw] leading-[0.8] font-bold text-black dark:text-white tracking-tighter uppercase mb-10 cursor-default origin-left"
            >
              Get In<br />Touch
            </motion.h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-xl max-w-md leading-relaxed font-light">
              Have a project in mind? We'd love to hear from you. Fill out the form or send us an email directly at <a href="mailto:hello@araf.in" className="text-black dark:text-white underline decoration-1 underline-offset-4 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors">hello@araf.in</a>
            </p>
        </div>

        <div className="lg:pt-10">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-2 group">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-500 block transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl md:text-3xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-neutral-400 dark:placeholder-neutral-800 font-light"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-500 block transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl md:text-3xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-neutral-400 dark:placeholder-neutral-800 font-light"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-500 block transition-colors group-focus-within:text-black dark:group-focus-within:text-white">Message</label>
              <textarea 
                id="message" 
                name="message" 
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl md:text-3xl text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-neutral-400 dark:placeholder-neutral-800 resize-none font-light"
                placeholder="Tell us about your project"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 flex items-center gap-2 text-sm"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <div className="pt-8">
               <button 
                type="submit" 
                disabled={isSubmitting}
                className="group flex items-center gap-4 text-2xl md:text-4xl font-display uppercase font-bold text-black dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3 text-neutral-400">
                    <Loader2 className="animate-spin" size={32} />
                    Sending...
                  </span>
                ) : isSuccess ? (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 dark:text-white flex items-center gap-2"
                  >
                    Message Sent <Check size={32} />
                  </motion.span>
                ) : (
                   <>
                    Send Message 
                    <motion.span 
                      className="inline-block"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight size={32} />
                    </motion.span>
                   </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};
