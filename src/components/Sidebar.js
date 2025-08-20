import {ChevronFirst, MoreVertical , ChevronLast , Menu} from "lucide-react"
import { useContext, useState  , createContext, use } from "react";
import { SidebarProvider , SidebarContext } from "./SidebarContext";
import { Link, useNavigate , useLocation } from "react-router";


export default function Sidebar ({children})
{
const { expanded, setexpanded } = useContext(SidebarContext);

console.log(expanded)
return (
<>
{/* Mobile Header - Full width navbar */}

<div className="lg:hidden  mb-2  bg-white shadow-md p-4 h-12 flex justify-between items-center w-screen fixed left-0 z-50 rounded-b-lg">
 <div className="block w-full">
  <h2 className="text-2xl font-bold">
    Vis.<span className="text-blue-400">A</span>
  </h2>
</div>
<button onClick={() => setexpanded(!expanded)}
className="p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100">
<Menu size={20} />
</button>
</div>

{/* Mobile Menu - Dropdown */}
{expanded && (
<div className="lg:hidden bg-white shadow-lg w-screen fixed top-15 rounded-b-2xl left-0 z-40 border-t">
<ul className="px-4 py-2">
{children}
</ul>
</div>
)}

{/* Desktop Sidebar */}
<div className="hidden ">
<aside className={`w-64  fixed left-0 top-0`}>
   <nav className=" flex flex-col bg-white border-r shadow-sm">
<div className="p-4 pb-2 flex justify-between items-center">
<button onClick={() => setexpanded(!expanded)}
className="p-1.5 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-900">
  {expanded? <ChevronFirst/> : <ChevronLast/>}
{console.log(expanded)}
</button>
</div>
  
<ul className="flex-1 px-4 ">
{children}
   </ul>
             <div className="border-t flex p-3">
<h2 className="w-10 h-10 rounded-md"></h2>
<div className="flex justify-between items-center w-52 ml-3 overflow-hidden transition-all">
<div className="leading-4">
{/* <h4 className="font-semibold">DSA Visualiser</h4> */}
       </div>
<MoreVertical size={20} className="text-gray-500"/>
</div>
     </div>
            </nav>
</aside>
</div>
    </>
)
}



export function SidebarItem({icon , text , link ,  alert})
{
    const {expanded,setexpanded} = useContext(SidebarContext)
      const navigate = useNavigate();
       const location = useLocation();

        
       
       const isactive = location.pathname === link;


    function handleclick()
{
            navigate(link);
            setexpanded(false);

        
}
    return(
        <li className={`relative flex items-center py-3 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isactive ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 " : "hover:bg-indigo-50 text-gray-600"} `}>
            {icon}
             <button onClick={() => handleclick({link,text})} className="px-2">{text}</button>
             
            {alert &&  (
                <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400"></div>
            )}
        </li>
    ) 
}