
import React, { useState } from 'react';
import { Item } from '../types/item';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import Navbar from '../components/Navbar';

// Static items to start with
const staticItems: Item[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    type: 'shirt',
    description: 'A comfortable and versatile cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    coverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Denim Jeans',
    type: 'pant',
    description: 'Premium quality denim jeans with a modern slim fit. Durable construction with classic styling that never goes out of fashion.',
    coverImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Running Sneakers',
    type: 'shoes',
    description: 'Lightweight running sneakers designed for performance and comfort. Features advanced cushioning and breathable mesh upper.',
    coverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Basketball',
    type: 'sports gear',
    description: 'Professional grade basketball suitable for indoor and outdoor play. Official size and weight with excellent grip and durability.',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=400&fit=crop'
    ]
  }
];

const ViewItems = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  // Get items from localStorage or use static items
  const [items] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('items');
    const userItems = savedItems ? JSON.parse(savedItems) : [];
    return [...staticItems, ...userItems];
  });

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">View Items</h1>
          <p className="text-gray-600">Browse through our collection of items</p>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H1" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Get started by adding your first item!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ViewItems;
