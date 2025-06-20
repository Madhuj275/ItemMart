
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Item } from '../types/item';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ item, isOpen, onClose }: ItemModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!isOpen) return null;

  const allImages = [item.coverImage, ...item.additionalImages];

  const handleEnquire = () => {
    toast({
      title: "Enquiry Submitted!",
      description: `We've received your enquiry for "${item.name}". We'll get back to you soon!`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${item.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {allImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Item Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Type</h3>
                <p className="text-blue-600 font-medium capitalize text-lg">{item.type}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleEnquire}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
