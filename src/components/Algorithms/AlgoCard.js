import React , {useState} from "react";
import { useParams } from "react-router";
import algorithmData from "./Algorithm";
import BubbleSortAnimation from "../Animations/BubbleSortAnimations";
import SelectionSortAnimation from "../Animations/SelectionSortAnimation";
import LinearSearchAnimation from "../Animations/LinearSearchAnimation";
import BinarySearchAnimation from "../Animations/BinarySearchAnimation"
import { Key } from "lucide-react";
import  Sidebar, {SidebarItem } from "../Sidebar";
import Navbar from "../Navbar";
import { Home as Homeicon, Flag , ChartNoAxesColumnIncreasing as Charts , Bot} from "lucide-react"
import { SidebarContext } from "../SidebarContext";
// import BinarySearchAnimation from "../animations/BinarySearchAnimation";

const animationComponents = {
  BubbleSortAnimation: <BubbleSortAnimation />,
  SelectionSortAnimation: <SelectionSortAnimation />,
  LinearSearchAnimation: <LinearSearchAnimation />,
  BinarySearchAnimation:<BinarySearchAnimation/>
  
//   BinarySearchAnimation: <BinarySearchAnimation />,
};

const AlgorithmPage = () => {
  const { slug } = useParams(); // get from route
  console.log(slug);
  const algo = algorithmData.find((a) => a.slug === slug);
  const[code , setcode] = useState(algo.implementations.cpp);

  if (!algo) return <div>Algorithm not found</div>;
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
     
             <div className=" lg:hidden   w-full relative mt-4 ">
                                
                                        <Sidebar>
                                                 <SidebarItem icon={<Homeicon size={20} />} text="Home" link="/"  />
                                                 <SidebarItem icon={<Charts size={20} />} text="Algorithms" link="/Category"  />
                                                 <SidebarItem icon={<Bot size={20} />} text="Chatbot" link="/Chatbot" />
                                                 <SidebarItem icon={<Flag size={20} />} text="About" link="/About" />
                                               </Sidebar>
                                        </div>
                          
                       
                                                <div className="hidden lg:block   w-full relative z-10 px-6 pt-6 ">
                                                  <Navbar />
                                                </div>
                   
      <div className="absolute inset-0  overflow-hidden ">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"
             style={{ top: '10%', left: '20%', animationDuration: '4s' }} />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
             style={{ top: '60%', right: '15%', animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/50 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
       <div className="relative z-10 p-6 lg:p-8  mt-15 sm:mt-0 ">
        <div className="max-w-7xl mx-auto">
          
    
          <div className="text-center mb-12 ">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                {algo.name}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
              {algo.description}
            </p>
            {(algo.timeComplexity || algo.spaceComplexity) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                {algo.timeComplexity && (
                  <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">⏱️ Time Complexity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Best:</span>
                        <code className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg text-green-300 font-mono border border-green-500/30">
                          {algo.timeComplexity.best}
                        </code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average:</span>
                        <code className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg text-yellow-300 font-mono border border-yellow-500/30">
                          {algo.timeComplexity.average}
                        </code>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Worst:</span>
                        <code className="px-3 py-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg text-red-300 font-mono border border-red-500/30">
                          {algo.timeComplexity.worst}
                        </code>
                      </div>
                    </div>
                  </div>
                )}
                {algo.spaceComplexity && (
                  <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">💾 Space Complexity</h3>
                    <code className="px-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl text-purple-300 font-mono text-xl border border-purple-500/30 inline-block">
                      {algo.spaceComplexity}
                    </code>
                  </div>
                )}
              </div>
            )}
          </div>

         
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            
         
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="px-6 py-4 border-b border-white/20">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  💻 Implementation
                </h2>
              </div>
            
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'cpp', label: 'C++', code: algo.implementations.cpp },
                    { key: 'javascript', label: 'JavaScript', code: algo.implementations.javascript },
                    { key: 'java', label: 'Java', code: algo.implementations.java },
                    { key: 'c', label: 'C', code: algo.implementations.c }
                  ].map((lang) => (
                    <button 
                      key={lang.key}
                      onClick={() => setcode(lang.code)}   
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        code === lang.code 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 transform scale-105' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20 hover:scale-105'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
        
              <div className="p-6">
                <pre className="bg-black/50 backdrop-blur text-green-400 p-6 rounded-xl overflow-auto max-h-96 border border-green-500/20 shadow-inner font-mono">
                  <code className="text-sm leading-relaxed">
                    {code}
                  </code>
                </pre>
              </div>
            </div>

    
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
              <div className="px-6 py-4 border-b border-white/20">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  📋 Algorithm Steps
                </h2>
              </div>
              
              <div className="p-6">
                <ol className="space-y-4">
                  {algo.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed pt-1 group-hover:text-white transition-colors duration-300">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>


          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
            <div className="px-6 py-4 border-b border-white/20">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                🎬 Live Animation
              </h2>
            </div>
            
            <div className="p-8">
              {animationComponents[algo.animationComponent] || (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-xl text-gray-300 mb-2">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Animation coming soon!
                    </span>
                  </p>
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default AlgorithmPage;