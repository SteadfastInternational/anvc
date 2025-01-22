export interface Variation {
  color: string;
  colorCode: string;
  price: number; // Price specific to the color variation
}

export interface ProductType {
  id: string;
  category: string;
  type: string;
  name: string;
  tag: string;
  new: boolean;
  sale: boolean;
  rate: number;
  price: number; 
  watt: number;
  weight: number;
  bodyColor: string;
  availableQuantity: number;
  quantity: number;
  quantityPurchase: number;
  variation: Variation[]; // Array of color variations, each with a price
  thumbImage: Array<string>;
  images: Array<string>;
  description: string;
  action: string;
  slug: string;
  activeColor: string; // The currently displayed color variation
  selectedColor: string; // The color selected by the user
}
