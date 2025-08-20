import arrayCategory from "./ArrayCategory";
import graphCategory from "./GraphCategory";
import Card from "../Card"; 
import Navbar from "../Navbar";
import Sidebar , {SidebarItem} from "../Sidebar";
import { Home as Homeicon, Flag } from "lucide-react"
import { useState } from "react";

export default function CategoryCard() {
  const [searchTerm, setSearchTerm] = useState("");

  const query = searchTerm.toLowerCase().trim();

  const filteredArray = query
    ? arrayCategory.filter((item) =>
        item.algorithms.some((algo) => {
            return  algo.name.toLowerCase().includes(query);
        })
      )
    : arrayCategory;

  const filteredGraph = query
    ? graphCategory.filter((item) =>
        item.algorithms.some((algo) => {
        return  algo.name.toLowerCase().includes(query);
        })
      )
    : graphCategory;

  const noResults =
    query.length > 0 && filteredArray.length === 0 && filteredGraph.length === 0;

  return (

      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-2">
       

      <div className="max-w-7xl mx-auto">
       
              
                         
                                  <div className=" lg:hidden   w-full relative">
                         
                            <Sidebar>
                                     <SidebarItem icon={<Homeicon size={20} />} text="Home" link="/"  />
                                     <SidebarItem icon={<Flag size={20} />} text="Algorithms" link="/Category"  />
                                     <SidebarItem icon={<Flag size={20} />} text="Chatbot" link="/Chatbot" />
                                     <SidebarItem icon={<Flag size={20} />} text="About" link="/About" />
                                   </Sidebar>
                            </div>

                            
                            <div className="hidden lg:block   w-full relative z-10 px-6 pt-6 ">
                                      <Navbar />
                                    </div>
                                    

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group  ">
            <input
              type="text"
              placeholder="Search algorithms..."
              className="w-full p-4 pl-6 pr-12 text-lg border-2  mt-30 lg:mt-8 border-gray-200 rounded-2xl shadow-sm 
                         bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out
                         focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none
                         hover:shadow-md group-hover:shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              </svg>
            </div>
          </div>
        </div>

        {noResults && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-2">🔍</div>
            <p className="text-gray-500 text-lg">No algorithms found</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}

        {filteredArray.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 mb-8 border border-white/50
                          hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Array Algorithms
              </h2>
            </div>
            <div className="space-y-4">
              {filteredArray.map((algo, index) => (
                <Card key={index} algo={algo} />
              ))}
            </div>
          </div>
        )}

        {filteredGraph.length > 0 && (
          <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-white/50
                          hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-xl mr-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Graph Algorithms
              </h2>
            </div>
            <div className="space-y-4">
              {filteredGraph.map((algo, index) => (
                <Card key={index} algo={algo} />
              ))}
            </div>
          </div>
        )}
      </div>
        </div>
        
  )
      
    } 
   

