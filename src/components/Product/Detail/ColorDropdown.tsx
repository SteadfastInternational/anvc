import React, { useState, useEffect } from "react";
import { ProductType } from "../../../type/ProductType"; // Adjust the import path as necessary

// Define the props for the ColorDropdown component
interface ColorDropdownProps {
  product: ProductType; // Full product details
  activeColor: string; // Currently selected color (color name or code)
  onColorSelect: (color: string) => void; // Callback for color selection
}

const ColorDropdown: React.FC<ColorDropdownProps> = ({ product, activeColor, onColorSelect }) => {
  // State to manage the price update when the color changes
  const [currentPrice, setCurrentPrice] = useState<number>(product.price); // Initialize with default price

  // Handle color selection change
  const handleColorSelect = (colorCode: string) => {
    onColorSelect(colorCode); // Update activeColor in parent component

    // Find the selected color's price
    const selectedVariation = product.variation.find(
      (variation) => variation.colorCode === colorCode
    );

    // Update the price based on the selected color if available
    if (selectedVariation) {
      setCurrentPrice(selectedVariation.price); // Directly use the price from the selected variation
    } else {
      setCurrentPrice(product.price); // fallback to default price if no matching color found
    }
  };

  return (
    <div>
      <select
        value={activeColor} // The selected color will be shown here
        onChange={(e) => handleColorSelect(e.target.value)} // Update color on change
        style={{
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #ccc", // Simple border
          borderRadius: "4px", // Slight rounding
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        <option value="" disabled>
          Select a Size
        </option> 
        {product.variation.map((variation) => (
          <option key={variation.colorCode} value={variation.colorCode}>
            {variation.color}
          </option>
        ))}
      </select>

      {/* Display current price */}
      
    </div>
  );
};

export default ColorDropdown;
