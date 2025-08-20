

import React, { useEffect, useState, useRef } from "react";

const BubbleSortAnimation = () => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [comparing, setComparing] = useState([-1, -1]);
  const [swapping, setSwapping] = useState(false);
  const [sorted, setSorted] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const intervalRef = useRef(null);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    resetAnimation();
  };

  const resetAnimation = () => {
    setComparing([-1, -1]);
    setSwapping(false);
    setSorted([]);
    setIsPlaying(false);
    setIsPaused(false);
    setStep(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startSort = () => {
    if (isPaused) {
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    resetAnimation();
    setIsPlaying(true);
    
    const arr = [...array];
    const sortedIndices = [];
    let currentStep = 0;
    let i = 0, j = 0;
    let totalOperations = 0;

    // Calculate total steps
    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr.length - x - 1; y++) {
        totalOperations++;
      }
    }
    setTotalSteps(totalOperations);

    intervalRef.current = setInterval(() => {
      if (i < arr.length - 1) {
        if (j < arr.length - i - 1) {
          setComparing([j, j + 1]);
          setStep(currentStep++);
          
          setTimeout(() => {
            if (arr[j] > arr[j + 1]) {
              setSwapping(true);
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              setArray([...arr]);
              
              setTimeout(() => {
                setSwapping(false);
              }, speed / 3);
            }
          }, speed / 2);

          j++;
        } else {
          sortedIndices.push(arr.length - i - 1);
          setSorted([...sortedIndices]);
          setComparing([-1, -1]);
          j = 0;
          i++;
        }
      } else {
        sortedIndices.push(0);
        setSorted([...sortedIndices]);
        setComparing([-1, -1]);
        setIsPlaying(false);
        clearInterval(intervalRef.current);
      }
    }, speed);
  };

  const pauseSort = () => {
    setIsPaused(true);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getBarColor = (index) => {
    if (sorted.includes(index)) return "bg-gradient-to-t from-green-400 to-green-600";
    if (comparing.includes(index)) return "bg-gradient-to-t from-red-400 to-red-600";
    if (swapping && comparing.includes(index)) return "bg-gradient-to-t from-yellow-400 to-yellow-600";
    return "bg-gradient-to-t from-blue-400 to-blue-600";
  };

  const getBarHeight = (value) => {
    const maxHeight = 400;
    const maxValue = Math.max(...array);
    return (value / maxValue) * maxHeight;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Bubble Sort Visualizer
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Watch how Bubble Sort compares adjacent elements and swaps them if they're in the wrong order
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={startSort}
              disabled={isPlaying}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold
                         hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {isPaused ? "Resume" : "Start Sort"}
            </button>
            
            <button
              onClick={pauseSort}
              disabled={!isPlaying}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl font-semibold
                         hover:from-yellow-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Pause
            </button>

            <button
              onClick={resetAnimation}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold
                         hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Reset
            </button>

            <button
              onClick={generateRandomArray}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold
                         hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Generate Array
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-white font-semibold">Speed:</span>
            <input
              type="range"
              min="200"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isPlaying}
              className="w-32 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-white text-sm">{(2200 - speed) / 2000 * 100}%</span>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8 border border-white/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Progress:</span>
            <span className="text-white text-sm">{step} / {totalSteps} comparisons</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${totalSteps > 0 ? (step / totalSteps) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8 border border-white/20">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-blue-400 to-blue-600 rounded"></div>
              <span className="text-white text-sm">Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-red-400 to-red-600 rounded"></div>
              <span className="text-white text-sm">Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-yellow-400 to-yellow-600 rounded"></div>
              <span className="text-white text-sm">Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-green-400 to-green-600 rounded"></div>
              <span className="text-white text-sm">Sorted</span>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 overflow-hidden">
          <div className="flex items-end justify-center gap-2 h-96">
            {array.map((value, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ease-in-out transform rounded-t-lg shadow-lg
                           ${getBarColor(index)}
                           ${comparing.includes(index) ? 'scale-110 shadow-2xl' : ''}
                           ${swapping && comparing.includes(index) ? 'animate-pulse' : ''}
                           ${sorted.includes(index) ? 'animate-bounce' : ''}`}
                style={{
                  height: `${getBarHeight(value)}px`,
                  width: '60px',
                  minHeight: '40px',
                }}
              >
                {/* Value label */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm
                               bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  {value}
                </div>
                
                {/* Glow effect for comparing elements */}
                {comparing.includes(index) && (
                  <div className="absolute inset-0 bg-white/20 rounded-t-lg animate-pulse"></div>
                )}

                {/* Sparkle effect for sorted elements */}
                {sorted.includes(index) && (
                  <div className="absolute inset-0 overflow-hidden rounded-t-lg">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-6 right-2 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                    <div className="absolute bottom-4 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-700"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">Algorithm Information</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Time Complexity</h4>
              <ul className="space-y-1">
                <li>• Best Case: O(n)</li>
                <li>• Average Case: O(n²)</li>
                <li>• Worst Case: O(n²)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Space Complexity</h4>
              <ul className="space-y-1">
                <li>• Space: O(1)</li>
                <li>• In-place sorting algorithm</li>
                <li>• Stable sorting algorithm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `}</style>
        </div>
      )}
        
    



export default BubbleSortAnimation;
