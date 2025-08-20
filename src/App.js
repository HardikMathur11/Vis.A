import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Navbar  from "./components/Navbar";
import AlgoCard from "./components/Algorithms/AlgoCard";
import Sorting from "./components/Categories/ArrayCategory"
import Searching from "./components/Categories/DynamicCategory"
import Graph from "./components/Categories/GraphCategory"
import Card from "./components/Card";
import CategoryCard from "./components/Categories/CategoryCard";
import AlgoCard from "./components/Algorithms/AlgoCard"
import Chatbot from "./components/GeminiAI";
import {SidebarProvider} from "./components/SidebarContext";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { Home as Homeicon, Flag } from "lucide-react"
import { Footer } from "./components/Home";


 



function App() {
  return (
    <div>
    
   <BrowserRouter>

    <SidebarProvider>

       {/* <div className=" lg:hidden relative  overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"> */}
              {/* Mobile Sidebar */}
              {/* <Sidebar>
                <SidebarItem icon={<Homeicon size={20} />} text="Home" active />
                <SidebarItem icon={<Flag size={20} />} text="Algorithms" alert />
                <SidebarItem icon={<Flag size={20} />} text="Tutorials" />
                <SidebarItem icon={<Flag size={20} />} text="About" />
              </Sidebar> */}
             
           
                      {/* Desktop Navbar
                      <div className="hidden lg:block   w-full relative z-10 px-6 pt-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                        <Navbar />
                      </div> */}
             
  
   <Routes>
    
    <Route path='' element={<Home></Home>}></Route>
   
    <Route path='/Algorithms' element={<AlgoCard></AlgoCard>}> </Route>
    <Route path='/Category' element={<CategoryCard></CategoryCard>}> </Route>
    <Route path="/algorithm/:slug" element={<AlgoCard />} />
    <Route path="/Sidebar" element={<Sidebar></Sidebar>} />
    <Route path="/Chatbot"  element={<Chatbot></Chatbot>} />

   
      {/* <Route path='/Algorithms/Searching' element={<Searching></Searching>}> </Route>
      <Route path='/Algorithms/Graph' element={<Graph></Graph>}> </Route> */}

        
   
   </Routes>

   <Footer></Footer>
     
        </SidebarProvider>
    </BrowserRouter>
     
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);