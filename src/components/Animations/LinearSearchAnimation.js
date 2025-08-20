import { useState, useEffect, useCallback, useRef } from 'react';

const LinearSearchVisualizer = () => {
  // State for the array and visualization
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState('Ready to sort');
  const [isPaused, setIsPaused] = useState(false);
  const [elementInput, setElementInput] = useState(""); // Renamed for clarity
  const pauseRef = useRef(false);
  const sortingActiveRef = useRef(false);
  const [target , settarget] = useState("");
  const [isfound , setisfound] = useState(false);
  const [isnotfound , setisnotfound] = useState(false);

  // Generate array based on user input or random
  const generateArray = useCallback((size = 20) => {
    // If user has entered elements, use those
    if (elementInput.trim() !== "") {
      try {
        const newArray = elementInput.split(',')
          .map(num => parseInt(num.trim(), 10))
          .filter(num => !isNaN(num) && num<50); // Filter out any non-numbers
        
        if (newArray.length > 0) {
          setArray(newArray);
          setSortedIndices([]);
          setActiveIndices([]);
          setCurrentStep('Custom array generated');
          pauseRef.current = false;
          setIsPaused(false);
          setisfound(false);
    setisnotfound(false);
          sortingActiveRef.current = false;
          return;
        }
      } catch (error) {
        console.error("Error parsing custom array:", error);
      }
    }
    
    // Fallback to random array
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 20 % size) + 1);
    }
    setArray(newArray);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentStep('Random array generated');
    pauseRef.current = false;
    setIsPaused(false);
    setisfound(false);
    setisnotfound(false);
    sortingActiveRef.current = false;
  }, [elementInput]);

  // Initialize array on mount
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Improved delay function with reliable pause
  const delay = useCallback(async (ms) => {
    return new Promise((resolve) => {
      const checkPause = () => {
        if (pauseRef.current && sortingActiveRef.current) {
          setTimeout(checkPause, 50); // Keep checking while paused
        } else if (sortingActiveRef.current) {
          setTimeout(resolve, ms); // Resume with delay
        } else {
          resolve(); // Exit if sorting stopped
        }
      };
      checkPause();
    });
  }, []);

  // Selection sort implementation
  const startLinearSearch = async () => {
    if (isSorting) return;

    if(!target) {
      setCurrentStep("Please enter the target");
      return ;
    }
    
    setIsSorting(true);
    sortingActiveRef.current = true;
    pauseRef.current = false;
    setIsPaused(false);
     setSortedIndices([]);
    setActiveIndices([]);
    setisnotfound(false);
    setisfound(false);
    let arr = [...array];
   

    setCurrentStep('Starting Linear Search...');
    // setSortedIndices([]);
    // setActiveIndices([]);
   

    for (let i = 0; i < arr.length; i++) {
        
        if(!sortingActiveRef.current) break;
    if (arr[i] == target) {
        setActiveIndices([i]);
        setIsSorting(true)
        setisfound(true);
        setCurrentStep(`Found target ${target} at index ${i}`);
        await delay(1000 / speed);
         setActiveIndices([]);
        setSortedIndices([i]);
        sortingActiveRef.current = false;
        setIsSorting(false);
        return i;
    };

    setActiveIndices([i]);
    setCurrentStep(`Comparing ${arr[i]} with ${target}`);
    await delay(1000 / speed);
    if (!sortingActiveRef.current) break;

  }
  if(sortingActiveRef.current){
    setisnotfound(true);
  setCurrentStep(`Target ${target} not found in the array`);
  setActiveIndices([]);
    setSortedIndices([]);
    sortingActiveRef.current = false;
    setIsSorting(false);
    setIsPaused(false);
  }
  else{
    setActiveIndices([]);
    setSortedIndices([]);
    
    sortingActiveRef.current = true;
    setIsSorting(false);
    setIsPaused(false);

     setCurrentStep('Sorting stopped');
   await delay(1000 / speed);
     sortingActiveRef.current = false;
    setCurrentStep("");
  }
   
}
  

  const togglePause = () => {
    if (isSorting) {
      pauseRef.current = !pauseRef.current;
      setIsPaused(pauseRef.current);
      setCurrentStep(pauseRef.current ? 'Paused - click Resume to continue' : 'Resuming sort...');
    }
  };



  function handlearray (){
    setElementInput('');
    generateArray();
  }

  const stopSorting = () => {
  sortingActiveRef.current = false; // Stops immediately
};


  return (
  <div className="min-h-full bg-gray-100 p-1 sm:p-16 md:p-8">
      <div className="max-w-6xl mx-auto w-full p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Linear Search Visualizer</h1>

        {/* Custom array input */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 w-full">
          <div className="flex flex-col w-full sm:w-64">
            <label className="mb-1 text-xs sm:text-sm font-semibold text-gray-700">Custom Array</label>
            <input 
              type="text" 
              value={elementInput} 
              onChange={(e) => setElementInput(e.target.value)} 
              placeholder="Enter elements separated by commas (e.g., 5,3,8,1)" 
              className="px-2 py-2 border rounded-md w-full text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isSorting && !isPaused}
            />
          </div>
          <div className="flex flex-col w-full sm:w-64">
            <label className="mb-1 text-xs sm:text-sm font-semibold text-gray-700">Target Value</label>
            <input
              type="number"
              value={target}
              onChange={(e) => settarget(e.target.value)}
              placeholder="Enter target value"
              className="px-2 py-2 border rounded-md w-full text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isSorting && !isPaused}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-8 w-full">
          <button
            onClick={() => handlearray()}
            disabled={isSorting && !isPaused}
            className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md w-full sm:w-auto text-xs sm:text-base ${
              isSorting && !isPaused ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Generate Random Array
          </button>
          <button
            onClick={startLinearSearch}
            disabled={isSorting && !isPaused }
            className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md w-full sm:w-auto text-xs sm:text-base ${
              isSorting && !isPaused ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            Start Linear Search
          </button>
          {isSorting && (
            <button
              onClick={togglePause}
              className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md w-full sm:w-auto text-xs sm:text-base text-white ${
                isPaused 
                  ? 'bg-purple-500 hover:bg-purple-600' 
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
          {isSorting && (
            <button
              onClick={stopSorting}
              className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md w-full sm:w-auto text-xs sm:text-base text-white ${
                isPaused 
                  ? 'bg-purple-500 hover:bg-purple-600' 
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              Stop Sorting
            </button>
          )}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="mb-1 text-xs sm:text-sm font-semibold text-gray-700">Speed</label>
            <div className="flex items-center gap-1 sm:gap-2">
              <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="w-full sm:w-32"
                disabled={isSorting && !isPaused}
              />
               <span className="ml-2 text-xs sm:text-base font-semibold text-gray-700">{speed}</span>
            </div>
         
          </div>

          <div className='flex flex-col w-full sm:w-auto'>
            <label className="mb-1 text-xs sm:text-sm font-semibold text-gray-700">Array Size:</label>
            <div className='"flex items-center gap-1 sm:gap-2"'>
            <input 
              type="range"
              min="5"
              max="50"
              value={array.length}
              onChange={(e) => generateArray(Number(e.target.value))}
              className="w-full sm:w-32"
              disabled={isSorting && !isPaused || elementInput.trim() !== ""}
            />
            <span className="ml-2 text-xs sm:text-base font-semibold text-gray-700">{array.length}</span>
          </div>
        </div>
         </div>

        {/* Status information */}
        <div className="text-center mb-2 sm:mb-4 min-h-8">
          <p className={`text-xs sm:text-lg font-semibold ${isfound ? 'text-green-400 sm:text-2xl' : 'text-xs sm:text-lg'}  ${isnotfound ? 'text-red-400 sm:text-2xl' : 'text-xs sm:text-lg'}`}>{currentStep}</p>
        </div>

        {/* Array Visualization */}
        <div className="flex items-end h-[50vh] sm:h-[75vh] bg-white p-1 sm:p-4 rounded-lg shadow-md border border-gray-200 w-full overflow-x-auto sm:overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {array.map((value, index) => {
            const isActive = activeIndices.includes(index);
            const isSorted = sortedIndices.includes(index);
            return (
              <div
                key={index}
                className={`rounded-t-md transition-all duration-300 ease-in-out flex flex-col justify-center
                  ${isActive ? 'bg-red-500' : isSorted ? 'bg-green-500' : 'bg-blue-500'}
                  mx-[1.5px] sm:mx-1
                `}
                style={{
                  height: `${value*75*5/100}%`,
                  minWidth: '16px',
                  width: `calc((100%/${array.length}) - 3px)`,
                  maxWidth: '100%',
                }}
              >
                <span className="text-shadow-md text-center font-extrabold block transform text-white text-[10px] sm:text-xs md:text-base lg:text-lg">
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}  
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-6 w-full">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-blue-500 mr-1 sm:mr-2 rounded-sm"></div>
            <span className="text-xs sm:text-base">Unsorted</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-red-500 mr-1 sm:mr-2 rounded-sm"></div>
            <span className="text-xs sm:text-base">Active/Comparing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-1 sm:mr-2 rounded-sm"></div>
            <span className="text-xs sm:text-base">Sorted</span>
          </div>
        </div>
      </div>
    </div>
  );
};








export default LinearSearchVisualizer;