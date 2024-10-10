import React, { useState } from 'react';

const Bmi = () => {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(25);
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('Pounds'); // New state for weight unit
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [healthRisk, setHealthRisk] = useState('');
  const [normalWeightRange, setNormalWeightRange] = useState('');
  const [displayWeight, setDisplayWeight] = useState(''); // To show weight in the selected unit

  const calculateBMI = (e) => {
    e.preventDefault();

    const heightInMeters = ((parseInt(heightFeet) * 12) + parseInt(heightInches)) * 0.0254;
    let weightInKg;

    // Convert the weight to kg based on the selected unit
    if (weightUnit === 'Pounds') {
      weightInKg = parseFloat(weight) * 0.453592; // Convert pounds to kg
    } else {
      weightInKg = parseFloat(weight); // Already in kg
    }

    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));

    // Determine the category and health risk based on BMI
    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
      setHealthRisk('Malnutrition risk');
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      setCategory('Normal weight');
      setHealthRisk('Low risk');
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      setCategory('Overweight');
      setHealthRisk('Enhanced risk');
    } else if (calculatedBmi >= 30 && calculatedBmi <= 34.9) {
      setCategory('Moderately obese');
      setHealthRisk('Medium risk');
    } else if (calculatedBmi >= 35 && calculatedBmi <= 39.9) {
      setCategory('Severely obese');
      setHealthRisk('High risk');
    } else {
      setCategory('Very severely obese');
      setHealthRisk('Very high risk');
    }

    // Calculate normal weight range
    const minNormalWeightKg = 18.5 * heightInMeters * heightInMeters; // in kg
    const maxNormalWeightKg = 24.9 * heightInMeters * heightInMeters; // in kg

    // Convert the normal weight range to the selected unit
    if (weightUnit === 'Pounds') {
      const minNormalWeight = minNormalWeightKg / 0.453592; // Convert kg to pounds
      const maxNormalWeight = maxNormalWeightKg / 0.453592; // Convert kg to pounds
      setNormalWeightRange(`${minNormalWeight.toFixed(2)} - ${maxNormalWeight.toFixed(2)} lbs`);
      setDisplayWeight(`${weight} lbs`); // Display weight in pounds
    } else {
      setNormalWeightRange(`${minNormalWeightKg.toFixed(2)} - ${maxNormalWeightKg.toFixed(2)} kg`);
      setDisplayWeight(`${weight} kg`); // Display weight in kg
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={calculateBMI}>
        <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            min="2"
            max="120"
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-gray-700">Height (Feet & Inches):</label>
          <div className="flex space-x-4">
            <input
              type="number"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              placeholder="Feet"
              className="w-1/2 px-4 py-2 border rounded-md"
            />
            <input
              type="number"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              placeholder="Inches"
              className="w-1/2 px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-gray-700">Weight:</label>
          <div className="flex space-x-4">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Weight in ${weightUnit}`}
              className="w-1/2 px-4 py-2 border rounded-md"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="w-1/2 px-4 py-2 border rounded-md"
            >
              <option value="Pounds">Pounds</option>
              <option value="Kilograms">Kilograms</option>
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md"
        >
          Calculate BMI
        </button>

        {/* Display Results */}
        {bmi && (
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">BMI Result</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-bold text-gray-700">BMI:</p>
                <p className="text-lg">{bmi}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-700">Category:</p>
                <p className="text-lg">{category}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-700">Health Risk:</p>
                <p className="text-lg">{healthRisk}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-700">Normal BMI Range:</p>
                <p className="text-lg">18.5 - 24.9</p>
              </div>
              <div className="col-span-2">
                <p className="text-lg font-bold text-gray-700">Your Weight:</p>
                <p className="text-lg">{displayWeight}</p>
              </div>
              <div className="col-span-2">
                <p className="text-lg font-bold text-gray-700">Your Normal Weight Range:</p>
                <p className="text-lg">{normalWeightRange}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Bmi;
