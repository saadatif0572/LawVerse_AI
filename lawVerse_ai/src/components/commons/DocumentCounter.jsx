import React, { useState } from 'react';

const DocumentCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1)); // Prevent negative
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border-2 border-blue-600 shadow-lg max-w-md mx-auto mt-8">
      <h3 className="text-2xl font-bold text-blue-600 mb-2">Documents Reviewed</h3>
      <p className="text-gray-600 text-sm mb-6">Track your legal document reviews today</p>
      
      <div className="text-5xl font-bold text-blue-600 mb-8 p-6 bg-blue-50 rounded-lg w-full text-center">
        {count}
      </div>

      <div className="flex gap-4 w-full mb-4">
        <button
          onClick={decrement}
          className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
        >
          − Decrement
        </button>
        
        <button
          onClick={increment}
          className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
        >
          + Increment
        </button>
      </div>

      <button
        onClick={reset}
        className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
      >
        Reset Counter
      </button>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Track your document review progress in real-time
      </p>
    </div>
  );
};

export default DocumentCounter;
