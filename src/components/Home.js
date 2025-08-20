import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import Sidebar, { SidebarItem } from "./Sidebar";
import { Home as Homeicon, Flag , ChartNoAxesColumnIncreasing as Charts , Bot} from "lucide-react"
import { SidebarContext } from "./SidebarContext";
import {Link} from 'react-router';


function Footer() {
  return (
  
    <footer
      id="footer" 
      className="w-full bg-gray-900 text-gray-300 pt-8 py-8 shadow-inner h-full "
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold tracking-wide text-white">VIS.A</h2>
          <p className="text-sm text-gray-400 mt-2">
            Transform abstract algorithms into stunning visual experiences.
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="https://github.com/"
            target="_blank"
           
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="mailto:contact@dsavisualiser.com"
            className="hover:text-white transition"
          >
            Contact
          </a>
          <a
            href="#footer"
            className="hover:text-white transition"
          >
            About
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} DSA Visualiser. All rights reserved.
      </div>
    </footer>

  );
}



export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { expanded, setexpanded } = useContext(SidebarContext);
  console.log(expanded);

  useEffect(() => {
    setIsVisible(true);
   
  }, []);

  // Shared content component
  const MainContent = () => (
    <>

      <div className="absolute inset-0 overflow-hidden bottom-8">

        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: `${20 + mousePosition.x * 0.02}%`,
            animationDelay: '0s',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            top: '60%',
            right: `${15 + mousePosition.y * 0.02}%`,
            animationDelay: '2s',
            animationDuration: '6s'
          }}
        />
        
      
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/50 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-5 h-5 bg-blue-400/50 rotate-12 animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-60 left-1/3 w-3 h-3 bg-pink-400/50 animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/4 w-8 h-1 bg-gradient-to-r from-cyan-400/50 to-transparent animate-pulse" />
        
 
        <div 
          className="absolute inset-0 opacity-10"
         
        />
      </div>


      <div className="relative z-10 flex items-center justify-center min-h-screen  px-6">
        <div className="max-w-6xl mx-auto text-center">
          
  
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
    
            <div className="mb-8 mt-4">
              <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Vis.A
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  (Visualization OF Algorithms)
                </span>
              </h1>
              
              <div className="relative">
                <p className="text-2xl md:text-3xl text-gray-300 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
                  Transform abstract algorithms into stunning visual experiences
                </p>
                
               
                <div className="h-16 mb-8">
                  <div className="text-xl md:text-2xl font-mono text-cyan-400 overflow-hidden">
                    <span className="animate-pulse">{'>'}</span>
                    <span className="ml-2 animate-pulse delay-1000">Understanding algorithms through visualization...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-12 max-w-4xl mx-auto">
              {[
                "Every algorithm has a story",
                "Visualize it step by step", 
                "Understand the logic deep within",
                "That's how mastery begins"
              ].map((line, index) => (
                <div
                  key={index}
                  className={`text-2xl md:text-3xl font-bold transition-all duration-1000 delay-${index * 200}`}
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 200 + 500}ms`
                  }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-pink-500 hover:via-purple-500 hover:to-blue-400 transition-all duration-300">
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              <Link to="./Category">
              <div className="mb-8">
                <button className="group relative px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden
                                 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                                 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600
                                 transform hover:scale-105 transition-all duration-300 
                                 shadow-2xl hover:shadow-purple-500/25">
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
           
                  
                  <div className="relative flex items-center gap-3">
                    <span className="text-2xl animate-bounce">🚀</span>
                   <span>Start Visualizing</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     
                    </svg>
                  </div>
                 
                  
                </button>
              </div>
               </Link>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
                {[
                  { icon: "", title: "Interactive Learning", desc: "Step-by-step algorithm execution" },
                  { icon: "", title: "Real-time Visualization", desc: "Watch algorithms come to life" },
                  { icon: "", title: "Deep Understanding", desc: "Grasp complex concepts easily" }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 
                             hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                    style={{
                      animationDelay: `${index * 200 + 1500}ms`
                    }}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 mb-16 text-center">
                <p className="text-gray-400 mb-6">Explore various algorithm categories</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Sorting', 'Searching', 'Graph', 'Dynamic Programming', 'Trees'].map((algo, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm 
                               border border-blue-400/30 rounded-full text-blue-300 hover:text-white 
                               hover:border-blue-400 transition-all duration-300 cursor-pointer
                               hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                      style={{
                        animationDelay: `${index * 100 + 2000}ms`
                      }}
                    >
                      {algo}
                    </span>
                  ))}

              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </>
  )






  return (
    <>
      {/* Mobile Layout - Show Sidebar */}
      <div className=" lg:hidden relative  overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Mobile Sidebar */}
        <Sidebar>
          <SidebarItem icon={<Homeicon size={20} />} text="Home" link="/"  />
          <SidebarItem icon={<Charts size={20} />} text="Algorithms" link="/Category"  />
          <SidebarItem icon={<Bot size={20} />} text="Chatbot" link="/Chatbot" />
          <SidebarItem icon={<Flag size={20} />} text="About" link="#footer" />
        </Sidebar>


        <div className={`transition-all duration-300 pt-16`}>
          <div className="relative min-h-screen ">
            <MainContent />
          </div>
        </div>
          
        
      </div>

      <div className="hidden lg:block relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
       
        <div className="relative z-10 px-6 pt-6">
          <Navbar />
        </div>

        <div className="relative min-h-screen">
          <MainContent />
        </div>

     
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </>
  );

}

export {Footer}

// I have to write footer in diff function bcox i want to export it that's why i have to define it as separte function 