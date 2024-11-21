import React from "react";

interface CartItemProps {
  id: number;
  product: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  product,
  price,
  quantity,
  image,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src={image}
          alt={product}
          className="w-20 h-20 object-cover mr-4"
        />
        <div>
          <h4 className="font-bold">{product}</h4>
          <p>${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={() => onQuantityChange(id, quantity - 1)}>-</button>
        <span className="mx-2">{quantity}</span>
        <button onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
        <button onClick={() => onRemove(id)} className="ml-4 text-red-500">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
