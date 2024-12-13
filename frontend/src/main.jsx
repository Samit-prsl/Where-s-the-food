import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SecureReqProvider } from './contexts/Requests.jsx'
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./components/ui/animated-grid-pattern.jsx";
import { Toaster } from './components/ui/toaster.jsx'
import React from 'react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SecureReqProvider>
     <div className=' bg-gradient-to-b from-[#93a5cf] to-[#e4efe9]  justify-center items-start min-h-screen relative flex w-full overflow-hidden rounded-lg border bg-background  md:shadow-xl'>
     <App />
     <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
     </div>
      <Toaster />
    </SecureReqProvider>
  </StrictMode>,
)
