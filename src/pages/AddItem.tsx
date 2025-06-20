
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Item } from '../types/item';
import Navbar from '../components/Navbar';
import { Plus, X } from 'lucide-react';

const AddItem = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: ['']
  });

  const itemTypes = [
    'shirt',
    'pant',
    'shoes',
    'sports gear',
    'accessories',
    'electronics',
    'books',
    'other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdditionalImageChange = (index: number, value: string) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.additionalImages.length > 1) {
      const newImages = formData.additionalImages.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        additionalImages: newImages
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.type || !formData.description || !formData.coverImage) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      // Create new item
      const newItem: Item = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        description: formData.description,
        coverImage: formData.coverImage,
        additionalImages: formData.additionalImages.filter(img => img.trim() !== '')
      };

      // Save to localStorage
      const existingItems = localStorage.getItem('items');
      const items = existingItems ? JSON.parse(existingItems) : [];
      items.push(newItem);
      localStorage.setItem('items', JSON.stringify(items));

      // Show success message
      toast({
        title: "Success!",
        description: "Item successfully added",
      });

      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: '',
        additionalImages: ['']
      });

      // Navigate to view items after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">Fill in the details to add a new item to your collection</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Item Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Item Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  {itemTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Item Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Item Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your item in detail"
                rows={4}
                required
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL *</Label>
              <Input
                id="coverImage"
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.coverImage && (
                <div className="mt-2">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-32 h-32 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div className="space-y-2">
              <Label>Additional Images</Label>
              {formData.additionalImages.map((image, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    type="url"
                    value={image}
                    onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                    placeholder="https://example.com/additional-image.jpg"
                    className="flex-1"
                  />
                  {formData.additionalImages.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImageField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageField}
                className="flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Another Image</span>
              </Button>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Adding Item...' : 'Add Item'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
