"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Welcome to NotesAI";
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full flex-col px-4">
      {/* BackgroundLines visible on all screen sizes */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <BackgroundLines className="w-full h-full">
          {/* Optional: You can add custom visuals here */}
          <>
          </>
        </BackgroundLines>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <motion.span 
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {text}
          </motion.span>
          {text === fullText && (
            <motion.span 
              className="text-primary ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
            >
            </motion.span>
          )}
        </h1>
        <motion.p 
          className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xs sm:max-w-lg md:max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          The smart note-taking app with AI-powered summarization.
          Organize your thoughts, store code snippets, and find what you need instantly.
        </motion.p>
        <motion.div 
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md mx-auto items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <Button size="sm" className="w-full md:w-[40%]" asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
          <Button size="sm" variant="outline" className="w-full md:w-[40%]" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
