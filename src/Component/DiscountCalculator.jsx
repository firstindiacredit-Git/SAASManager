import React, { useState } from 'react';
import { Back } from './back';

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountAmount, setDiscountAmount] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);

  const calculateDiscount = (e) => {
    e.preventDefault();
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (!isNaN(price) && !isNaN(discount) && discount >= 0 && discount <= 100) {
      const discountValue = (price * discount) / 100;
      const finalValue = price - discountValue;
      setDiscountAmount(discountValue);
      setFinalPrice(finalValue);
    } else {
      alert('Please enter valid inputs. Discount percentage must be between 0 and 100.');
      setDiscountAmount(null);
      setFinalPrice(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <Back/>
      <h2 className="text-2xl font-bold text-center mb-4">Discount Calculator</h2>
      <form onSubmit={calculateDiscount} className="space-y-4">
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium">Original Price</label>
          <input
            id="originalPrice"
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter the original price"
          />
        </div>
        <div>
          <label htmlFor="discountPercentage" className="block text-sm font-medium">Discount Percentage</label>
          <input
            id="discountPercentage"
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter the discount percentage"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate
        </button>
      </form>
      {discountAmount !== null && finalPrice !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          <p>
            Discount Amount: <strong>{discountAmount.toFixed(2)}</strong>
          </p>
          <p>
            Final Price After Discount: <strong>{finalPrice.toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscountCalculator;
