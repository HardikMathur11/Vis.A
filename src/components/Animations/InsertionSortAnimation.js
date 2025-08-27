import { useState, useEffect, useCallback, useRef } from 'react';

const InsertionSortVisualizer = () => {
 
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(2); 
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState('Ready to sort');
  const [isPaused, setIsPaused] = useState(false);
  const [elementInput, setElementInput] = useState(""); 
  const pauseRef = useRef(false);
  const [active , setactive] = useState(null);
  const sortingActiveRef = useRef(false);

 
  const generateArray = useCallback((size = 20) => {
 
    if (elementInput.length>0 &&elementInput.trim() !== "" ) {
      
        const newArray = elementInput.split(',')
          .map(num => parseInt(num.trim(), 10))
          .filter(num => !isNaN(num)); 
        
        if (newArray.length > 0) {
          setArray(newArray);
          setSortedIndices([]);
          setActiveIndices([]);
          setCurrentStep('Custom array generated');
          pauseRef.current = false;
          setIsPaused(false);
          sortingActiveRef.current = false;
          return;
        }
       

      else{
         setCurrentStep("Error parsing custom array:Please enter valid Input");
        return ;
      }
    
    }
    
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 20) + 1);
    }
    setArray(newArray);
    setSortedIndices([]);
    setActiveIndices([]);
    setCurrentStep('Random array generated');
    pauseRef.current = false;
    setIsPaused(false);
    sortingActiveRef.current = false;
  }, [elementInput]);


  useEffect(() => {
    generateArray();
  }, [generateArray]);


  const delay = useCallback(async (ms) => {
    return new Promise((resolve) => {
      const checkPause = () => {
        if (pauseRef.current && sortingActiveRef.current) {
          setTimeout(checkPause, 50);
        } else if (sortingActiveRef.current) {
          setTimeout(resolve, ms); 
        } else {
          resolve();
        }
      };
      checkPause();
    });
  }, []);

  const startInsertionSort = async () => {
  if (isSorting) return;

  setIsSorting(true);
  sortingActiveRef.current = true;
  pauseRef.current = false;
  setIsPaused(false);

  let arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    setActiveIndices([i]);
    setCurrentStep(`Key element: ${key}`);
    await delay(1000 / speed);

    // shift elements
    while (j >= 0 && arr[j] > key) {
      if (!sortingActiveRef.current) return; // stop immediately

      setCurrentStep(`Comparing ${arr[j]} > ${key}, shifting ${arr[j]}`);
      arr[j + 1] = arr[j];
      setArray([...arr]);

      setActiveIndices([j, j + 1]);
      await delay(1000 / speed);

      j--;
    }

    arr[j + 1] = key;
    setArray([...arr]);

    // Sorted upto i
    setSortedIndices(prev => [...prev, i]);
    setActiveIndices([]);
    setCurrentStep(`Inserted ${key} at position ${j + 1}`);
    await delay(1000 / speed);

    if (!sortingActiveRef.current) return; // in case stopped
  }


  if (sortingActiveRef.current) {
     setSortedIndices([...Array(arr.length).keys()]);
  setCurrentStep("Sorting complete");
  setIsSorting(false);
  sortingActiveRef.current = false;
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
    setIsSorting(false);
    sortingActiveRef.current = false;
  };
  // Sorting complete
  



//       if (!sortingActiveRef.current) break;

//       // Visualize the swap
//       if (minIdx !== i) {
//         setCurrentStep(`Swapping ${arr[i]} and ${arr[minIdx]}`);
//         setActiveIndices([i, minIdx]);
//         await delay(1000 / speed);
//         if (!sortingActiveRef.current) break;
        
//         [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
//         setArray([...arr]);
//         await delay(1000 / speed);
//         if (!sortingActiveRef.current) break;
//       }

//       setSortedIndices(prev => [...prev, i]);
//       setActiveIndices([]);
//     }

//     if (sortingActiveRef.current) {
//       setSortedIndices(prev => [...prev, arr.length - 1]);
//        setIsSorting(false);
//     sortingActiveRef.current = false;
//       setCurrentStep('Sorting complete');
//     }
//     else{
//     setActiveIndices([]);
//     setSortedIndices([]);
    
//     sortingActiveRef.current = true;
//     setIsSorting(false);
//     setIsPaused(false);

//      setCurrentStep('Sorting stopped');
//    await delay(1000 / speed);
//      sortingActiveRef.current = false;
//     setCurrentStep("");
//   }
//     setIsSorting(false);
//     sortingActiveRef.current = false;
  

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
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Insertion Sort Visualizer</h1>

     
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
        
        </div>

   
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
            onClick={startInsertionSort}
            disabled={isSorting && !isPaused}
            className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md w-full sm:w-auto text-xs sm:text-base ${
              isSorting && !isPaused ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            Start Insertion Sort
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

   
        <div className="text-center mb-2 sm:mb-4 min-h-8">
          <p className={`text-xs sm:text-lg font-semibold ${activeIndices?  ` text-xs sm:text-lg`:'text-green-400 sm:text-2xl' }  `}>{currentStep}</p>
        </div>

        <div className="flex items-end h-[50vh] sm:h-[75vh] bg-white p-1 sm:p-4 rounded-lg shadow-md border border-gray-200 w-full overflow-x-auto sm:overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {array.map((value, index) => {
            const isActive = activeIndices.includes(index);
            const isSorted = sortedIndices.includes(index);
            const isact = active !== null && active === index;
            return (
              <div
                key={index}
                className={`rounded-t-md transition-all duration-300 ease-in-out flex flex-col justify-center
                  ${ isact   ? 'bg-amber-500' :   isActive ? 'bg-red-500' : isSorted ? 'bg-green-500'  : 'bg-blue-500'}
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

export default InsertionSortVisualizer;
