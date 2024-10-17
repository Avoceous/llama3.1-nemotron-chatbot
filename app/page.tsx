"use client";

import ChatbotComponent from '@/components/ChatbotComponent';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 w-full max-w-2xl">
        <ChatbotComponent />
      </div>
    </div>
  );
}
