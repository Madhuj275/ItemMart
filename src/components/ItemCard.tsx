
import React from 'react';
import { Item } from '../types/item';

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-blue-600 font-medium capitalize">
          {item.type}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
