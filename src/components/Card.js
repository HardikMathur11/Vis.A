import { useNavigate } from "react-router";
export default function Card({ algo , title }) {
  const navigate = useNavigate();
  
  return (

    <div className="m-4 mt-8" >
     
     
      {/* 🛠 Loop over subcategories inside arrayCategory */}
      <h3 className="text-lg font-semibold border-l-4 border-blue-500 pl-2 mb-2" >
        {algo.subcategory }
      </h3 >

      <div className="flex flex-wrap gap-4">
        {algo.algorithms.map((item, i) => (
          <button
            key={i}
            className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 w-48 shadow-sm"
             onClick={() => navigate(`/algorithm/${item.slug}`)}
          >
            <span>{item.name}</span>
          </button>
        ))}
        
      </div>
    </div>
  );
}
