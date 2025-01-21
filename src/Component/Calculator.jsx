import React, { useState, useEffect } from 'react';
import { Back } from './back';

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    useEffect(() => {
        const storedHistory = localStorage.getItem('calculatorHistory');
        if (storedHistory) {
            try {
                setHistory(JSON.parse(storedHistory));
            } catch (error) {
                console.error("Failed to parse history from localStorage:", error);
                localStorage.removeItem('calculatorHistory');
            }
        }
    }, []);

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
        }
    }, [history]);

    const formatNumber = (num) => {
        if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-7 && num !== 0)) {
            return num.toExponential(6);
        }
        return Number(parseFloat(num).toPrecision(10)).toString();
    };

    const handleClick = (value) => {
        const operators = ['÷', '×', '+', '-', '%'];
        
        // If there's a result and a new number is clicked
        if (result && !operators.includes(value)) {
            setInput(value);
            setResult("");
            return;
        }

        // If there's a result and an operator is clicked
        if (result && operators.includes(value)) {
            setInput(result + value);
            setResult("");
            return;
        }

        // Handle operator changes
        if (operators.includes(value)) {
            // If input is empty and minus is clicked, allow it (negative numbers)
            if (input === "" && value === "-") {
                setInput(value);
                return;
            }

            // If input is empty, don't allow other operators
            if (input === "") {
                return;
            }

            // Get the last character of current input
            const lastChar = input.slice(-1);

            // If last character is an operator, replace it
            if (operators.includes(lastChar)) {
                // Don't allow changing minus sign for negative numbers
                if (input.length === 1 && lastChar === "-") {
                    return;
                }
                setInput(input.slice(0, -1) + value);
            } else {
                setInput(input + value);
            }
        } else {
            // Handle numbers and decimal point
            setInput(input + value);
        }
    };

    const handleBackspace = () => {
        setInput(prevInput => prevInput.slice(0, -1));
    };

    const handlePercentage = () => {
        try {
            const currentValue = parseFloat(input);
            const percentResult = currentValue / 100;
            setInput(percentResult.toString());
        } catch (e) {
            setResult("Error");
        }
    };

    const calculate = () => {
        try {
            let expression = input;

            // Remove trailing operators before calculation
            expression = expression.replace(/[+\-*×÷/%]$/, '');
            
            // Replace × with * and ÷ with /
            expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
            
            // Validate expression
            if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
                throw new Error("Invalid characters");
            }

            if (!expression) {
                setResult("0");
                return;
            }

            // Evaluate and format
            const newResult = eval(expression);
            
            if (isNaN(newResult) || !isFinite(newResult)) {
                throw new Error("Invalid calculation");
            }

            const formattedResult = formatNumber(newResult);
            setResult(formattedResult);
            setHistory(prevHistory => [...prevHistory, `${input} = ${formattedResult}`]);
            setInput("");
        } catch (e) {
            setResult("Error");
            setTimeout(() => setResult(""), 1500);
        }
    };

    const clearInput = () => {
        setInput("");
        setResult("");
    };

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-80 mb-4">
                <Back/>
                <h1 className="text-white font-semibold text-2xl mb-6 text-center">Calculator</h1>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="text-right">
                        <div className="text-gray-400 text-lg h-6 mb-1">{input || "0"}</div>
                        <div className="text-white text-4xl font-bold">{result || "0"}</div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    <button onClick={clearInput} 
                            className="btn bg-red-500 hover:bg-red-600 text-white font-bold">C</button>
                    <button onClick={handleBackspace}
                            className="btn bg-gray-700 hover:bg-gray-600 text-white">DE</button>
                    <button onClick={handlePercentage}
                            className="btn bg-gray-700 hover:bg-gray-600 text-white">%</button>
                    <button onClick={() => handleClick('÷')}
                            className="btn bg-yellow-500 hover:bg-yellow-600 text-white">÷</button>
                    
                    <button onClick={() => handleClick('7')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">7</button>
                    <button onClick={() => handleClick('8')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">8</button>
                    <button onClick={() => handleClick('9')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">9</button>
                    <button onClick={() => handleClick('×')}
                            className="btn bg-yellow-500 hover:bg-yellow-600 text-white">×</button>
                    
                    <button onClick={() => handleClick('4')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">4</button>
                    <button onClick={() => handleClick('5')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">5</button>
                    <button onClick={() => handleClick('6')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">6</button>
                    <button onClick={() => handleClick('-')}
                            className="btn bg-yellow-500 hover:bg-yellow-600 text-white">−</button>
                    
                    <button onClick={() => handleClick('1')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">1</button>
                    <button onClick={() => handleClick('2')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">2</button>
                    <button onClick={() => handleClick('3')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">3</button>
                    <button onClick={() => handleClick('+')}
                            className="btn bg-yellow-500 hover:bg-yellow-600 text-white">+</button>
                    
                    <button onClick={() => handleClick('0')}
                            className="btn col-span-2 bg-gray-800 hover:bg-gray-700 text-white">0</button>
                    <button onClick={() => handleClick('.')}
                            className="btn bg-gray-800 hover:bg-gray-700 text-white">.</button>
                    <button onClick={calculate}
                            className="btn bg-yellow-500 hover:bg-yellow-600 text-white">=</button>
                </div>
                <button className="btn mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white"
                        onClick={toggleHistory}>
                    {isHistoryVisible ? 'Hide History' : 'Show History'}
                </button>
            </div>

            {isHistoryVisible && (
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-80 ml-0 md:ml-4 max-h-96 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4 text-white">History</h2>
                    <ul className="space-y-2">
                        {history.length === 0 ? (
                            <li className="text-gray-400">No history yet</li>
                        ) : (
                            history.map((item, index) => (
                                <li key={index} className="text-gray-300 border-b border-gray-700 pb-2">
                                    {item}
                                </li>
                            )).reverse()
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Calculator;
