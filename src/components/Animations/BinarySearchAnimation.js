import { Binary } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';

const BinarySeachVisualizer = () => {
  
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [currentStep, setCurrentStep] = useState('Ready to sort');
  const [isPaused, setIsPaused] = useState(false);
  const [elementInput, setElementInput] = useState("");
  const pauseRef = useRef(false);
  const sortingActiveRef = useRef(false);
  const [target , settarget] = useState("");
  const [isfound , setisfound] = useState(false);
  const [isnotfound , setisnotfound] = useState(false);
  const [side , setside] = useState([]);
  const [midIndex, setMidIndex] = useState(null);
  const [leftIndex, setLeftIndex] = useState(null);
  const [rightIndex, setRightIndex] = useState(null);
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [stepExplanation, setStepExplanation] = useState('');

  const generateArray = useCallback((size = 20) => {
   
    if (elementInput.trim() !== "") {
      try {
        const newArray = elementInput.split(',')
          .map(num => parseInt(num.trim(), 10))
          .filter(num => !isNaN(num) && num<50); 
        
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
          setLeftIndex(null);
          setRightIndex(null);
          setside([]);
          return;
        }
      } catch (error) {
        console.error("Error parsing custom array:", error);
      }
    }
    
   
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

  setMidIndex(null);
  setLeftIndex(null);
  setRightIndex(null);
  setStep(0);
  setTotalSteps(0);
  setStepExplanation('');
  setside([]);
  setisfound(false);
  setisnotfound(false);
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


const startBinarySearch = async () => {
  if (isSorting) return;
  if (!target || target === "") {
    setCurrentStep("Please enter target");
    return;
  }

  setIsSorting(true);
  sortingActiveRef.current = true;
  pauseRef.current = false;
  setIsPaused(false);
  setSortedIndices([]);
  setActiveIndices([]);
  setside([]);
  setMidIndex(null);
  setLeftIndex(null);
  setRightIndex(null);
  setStep(0);
  setTotalSteps(0);
  setStepExplanation('');
  setisnotfound(false);
  setisfound(false);

  let arr = [...array].sort((a, b) => a - b);
  setArray(arr);
  setCurrentStep("Array sorted for Binary Search...");

  await delay(1000 / speed);

  let left = 0;
  let right = arr.length - 1;
  let found = false;


  let tempL = left, tempR = right, tempSteps = 0;
  while (tempL <= tempR) {
    tempSteps++;
    let tempMid = Math.floor((tempL + tempR) / 2);
    if (arr[tempMid] == target) break;
    if (arr[tempMid] < target) tempL = tempMid + 1;
    else tempR = tempMid - 1;
  }
  setTotalSteps(tempSteps);

  let steps = 0;
  while (left <= right && sortingActiveRef.current) {
    let mid = Math.floor((left + right) / 2);
    setActiveIndices([left, right]);
    setMidIndex(mid);
    setLeftIndex(left);
    setRightIndex(right);
    setStep(steps + 1);
    let explanation = `Step ${steps + 1}: left=${left}, right=${right}, mid=${mid}. Comparing ${arr[mid]} with target ${target}.`;
    if (arr[mid] == target) {
      explanation += ` Found! ${arr[mid]} == ${target}.`;
    } else if (arr[mid] < target) {
      explanation += ` ${arr[mid]} < ${target}, move left to mid+1.`;
    } else {
      explanation += ` ${arr[mid]} > ${target}, move right to mid-1.`;
    }
    setStepExplanation(explanation);
    setCurrentStep(explanation);
    await delay(1200); 

    if (!sortingActiveRef.current) break;

    if (arr[mid] == target) {
      setActiveIndices([mid]);
      setisfound(true);
      setCurrentStep(`Found target ${target} at index ${mid}`);
      setStepExplanation(`Found target ${target} at index ${mid}.`);
      setSortedIndices([mid]);
      await delay(1800);
      found = true;
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
      setside([left , right]);
      await delay(600);
    } else {
      right = mid - 1;
      setside([left , right]);
      await delay(600); 
    }
    steps++;
  }

  if (!found && sortingActiveRef.current) {
    setisnotfound(true);
    setCurrentStep(`Target ${target} not found in the array`);
    setActiveIndices([]);
    setSortedIndices([]);
     setIsSorting(false);
  sortingActiveRef.current = false;
  setIsPaused(false);

  setSortedIndices([]);
  setActiveIndices([]);
  setMidIndex(null);
  setLeftIndex(null);
  setRightIndex(null);
  setStep(0);
  setTotalSteps(0);
  setStepExplanation('');
  }

  else
  {
     setIsSorting(false);

  sortingActiveRef.current = true;
  setCurrentStep("Sorting stop");
  await delay ( 600);
  sortingActiveRef.current = false;
  setIsPaused(false);

  setCurrentStep("");
  setSortedIndices([]);
  setActiveIndices([]);
  setMidIndex(null);
  setLeftIndex(null);
  setRightIndex(null);
  setStep(0);
  setTotalSteps(0);
  setStepExplanation('');
  }

 
};
  

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
  sortingActiveRef.current = false;
  
};


  return (
  <div className="min-h-full bg-gray-100 p-1 sm:p-16 md:p-8">
      <div className="max-w-6xl mx-auto w-full p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Binary Search Visualizer</h1>

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
            onClick={startBinarySearch}
            disabled={isSorting && !isPaused }
            className={`px-2 py-2 sm:px-4 sm:py-2 rounded-md w-full sm:w-auto text-xs sm:text-base ${
              isSorting && !isPaused ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            Start binary Search
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
          <p className={`text-xs sm:text-lg font-semibold ${isfound ? 'text-green-400 sm:text-2xl' : 'text-xs sm:text-lg'}  ${isnotfound ? 'text-red-400 sm:text-2xl' : 'text-xs sm:text-lg'}`}>{currentStep}</p>
        </div>

        <div className="flex items-end h-[50vh] sm:h-[75vh] bg-white p-1 sm:p-4 rounded-lg shadow-md border border-gray-200 w-full overflow-x-auto sm:overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative">
        
          <div className="absolute left-0 right-0 flex justify-between px-2" style={{top: '-2.5rem'}}>
            {array.map((_, idx) => (
              <div key={idx} className="w-full flex justify-center" style={{minWidth: '16px'}}>
                {idx === leftIndex && <span className="text-blue-700 font-bold text-xs">&#8595; Left</span>}
                {idx === midIndex && <span className="text-yellow-700 font-bold text-xs">&#8595; Mid</span>}
                {idx === rightIndex && <span className="text-purple-700 font-bold text-xs">&#8595; Right</span>}
              </div>
            ))}
          </div>
         
          {array.map((value, index) => {
            const isActive = activeIndices.includes(index);
            const isSorted = sortedIndices.includes(index);
            const [left, right] = side.length ? side : [0, array.length - 1];
            const isOutOfRange = index < left || index > right;
            const isMid = midIndex === index;
        
            let barColor = 'bg-blue-500';
            if (isSorted || (isfound && midIndex === index)) barColor = 'bg-green-500';
            else if (isMid) barColor = 'bg-yellow-400';
          
            else if (isOutOfRange && isSorting) barColor = 'bg-gray-400';

            return (
              <div
                key={index}
                className={`rounded-t-md transition-all duration-300 ease-in-out flex flex-col justify-center ${barColor} mx-[1.5px] sm:mx-1 border-2 ${isMid ? 'border-yellow-600' : isSorted ? 'border-green-700' : isActive ? 'border-blue-700' : 'border-gray-300'}`}
                style={{
                  height: `${value * 75 * 5 / 100}%`,
                  minWidth: '16px',
                  width: `calc((100%/${array.length}) - 3px)`,
                  maxWidth: '100%',
                }}
              >
                <span className={`text-shadow-md text-center font-extrabold block transform text-white text-[10px] sm:text-xs md:text-base lg:text-lg ${isMid ? 'text-yellow-900' : ''}`}>
                  {value}
                </span>
                {isMid && <span className="text-xs text-yellow-900 font-bold">mid</span>}
                {isSorted && <span className="text-xs text-green-900 font-bold">found</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-6 w-full">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-blue-500 mr-1 sm:mr-2 rounded-sm border-2 border-blue-700"></div>
            <span className="text-xs sm:text-base">Active Range (left/right)</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-yellow-400 mr-1 sm:mr-2 rounded-sm border-2 border-yellow-600"></div>
            <span className="text-xs sm:text-base">Middle (mid)</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-green-500 mr-1 sm:mr-2 rounded-sm border-2 border-green-700"></div>
            <span className="text-xs sm:text-base">Found</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-4 h-4 bg-gray-400 mr-1 sm:mr-2 rounded-sm border-2 border-gray-300"></div>
            <span className="text-xs sm:text-base">Out of Range</span>
          </div>
          {step > 0 && totalSteps > 0 && (
            <div className="flex items-center ml-4">
              <span className="text-xs sm:text-base font-bold text-gray-700">Step {step} / {totalSteps}</span>
            </div>
          )}
        </div>
     
        {stepExplanation && (
          <div className="mt-2 text-center text-sm sm:text-base font-semibold text-gray-800 bg-yellow-50 rounded p-2 border border-yellow-200 shadow">
            {stepExplanation}
          </div>
        )}
      </div>
    </div>
  );
};




export default BinarySeachVisualizer;
   

