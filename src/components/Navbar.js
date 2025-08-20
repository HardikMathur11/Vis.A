import { Link } from "react-router"
export default function  Navbar()
{
    return (
        
        <div className="bg-white mx-auto  max-w-[99vw] flex  justify-between h-16  rounded-2xl">
      <div className="flex items-center h-[100%]  justify-center ml-4">
       <h2 className="text-2xl font-bold ">Vis.</h2>
       <h2 className="text-2xl font-bold text-blue-400">A</h2>
      </div>
      <div className="flex gap-4 items-center h-[100%]  justify-center text-1xl font-medium mr-4">
        <Link to='/'>Home</Link>
        <Link to='/Category'>Alogirthms</Link>
         <a href="#footer">About</a>
        <Link to="/Chatbot">Chatbot</Link>
      </div>
        </div>
  
    )
}