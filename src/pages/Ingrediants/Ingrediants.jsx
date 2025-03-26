import React, { useState, useEffect } from "react";
import { 
  useGetfoodQuery, 
  useGetcatQuery, 
  useGetIngredientsByFoodQuery,
  useDeleteIngredientMutation,
  useUpdateIngredientMutation,
  useAddingredientMutation
} from "../../features/Data/dataApiSlice";
import { useSelector } from "react-redux";
import { Spinner, useToast, Alert, AlertIcon } from "@chakra-ui/react";

export const Ingrediants = () => {
  const token = useSelector((state) => state.auth.token);
  const toast = useToast();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // API queries
  const { 
    data: categories = [], 
    isLoading: isCategoryLoading, 
    error: categoryError 
  } = useGetcatQuery(token);

  const { 
    data: foods = [], 
    isLoading: isFoodLoading, 
    error: foodError 
  } = useGetfoodQuery(
    { token, id: selectedCategory },
    { skip: !selectedCategory }
  );

  const { 
    data: ingredients = [], 
    isLoading: isIngredientsLoading,
    error: ingredientsError,
    refetch: refetchIngredients
  } = useGetIngredientsByFoodQuery(
    { token, foodId: selectedFood },
    { skip: !selectedFood }
  );

  const [deleteIngredient, { isLoading: isDeleting }] = useDeleteIngredientMutation();
  const [updateIngredient, { isLoading: isUpdating }] = useUpdateIngredientMutation();
  const [addIngredient, { isLoading: isAdding }] = useAddingredientMutation();

  // Automatically select the first category if available
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  // Reset form when food changes
  useEffect(() => {
    if (selectedFood) {
      resetForm();
      refetchIngredients();
    }
  }, [selectedFood]);

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCategory || !selectedFood || !ingredientName) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const ingredientData = {
        foodId: selectedFood,
        name: ingredientName
      };

      if (editingId) {
        // Update existing ingredient
        await updateIngredient({ 
          token, 
          id: editingId, 
          updatedData: ingredientData 
        }).unwrap();
        
        toast({
          title: "Success",
          description: "Ingredient updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Add new ingredient
        await addIngredient({
          token,
          credentials: ingredientData
        }).unwrap();
        
        toast({
          title: "Success",
          description: "Ingredient added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      // Reset form and refresh data
      resetForm();
      refetchIngredients();
    } catch (error) {
      toast({
        title: "Error",
        description: error.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle edit action
  const handleEdit = (ingredient) => {
    setIngredientName(ingredient.name);
    setEditingId(ingredient.id);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteIngredient({ token, id }).unwrap();
      toast({
        title: "Success",
        description: "Ingredient deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetchIngredients();
    } catch (error) {
      toast({
        title: "Error",
        description: error.data?.message || "Failed to delete ingredient",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setIngredientName("");
    setEditingId(null);
  };

  // Loading state
  const isLoading = isCategoryLoading || isFoodLoading || isIngredientsLoading || isAdding || isUpdating || isDeleting;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Food Ingredient Management</h2>

        {/* Error Handling */}
        {categoryError && (
          <Alert status="error" mb-4>
            <AlertIcon />
            Failed to load categories: {categoryError.message}
          </Alert>
        )}
        {foodError && (
          <Alert status="error" mb-4>
            <AlertIcon />
            Failed to load foods: {foodError.message}
          </Alert>
        )}
        {ingredientsError && (
          <Alert status="error" mb-4>
            <AlertIcon />
            Failed to load ingredients: {ingredientsError.message}
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Form */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Ingredient" : "Add New Ingredient"}
            </h3>
            
            <form onSubmit={handleSubmit}>
              {/* Category Select */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Food Select */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Food</label>
                <select
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedCategory || isLoading}
                >
                  <option value="">Select a food</option>
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ingredient Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ingredient Name</label>
                <input
                  type="text"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ingredient name"
                  disabled={isLoading || !selectedFood}
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isLoading || !selectedFood}
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : editingId ? (
                    "Update Ingredient"
                  ) : (
                    "Add Ingredient"
                  )}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column - Ingredients List */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {selectedFood ? `Ingredients for ${foods.find(f => f.id === selectedFood)?.name || 'selected food'}` : 'Select a food to view ingredients'}
            </h3>
            
            {!selectedFood ? (
              <p className="text-gray-500 text-center">Please select a food to view its ingredients</p>
            ) : isIngredientsLoading ? (
              <div className="flex justify-center">
                <Spinner size="lg" />
              </div>
            ) : ingredients.length === 0 ? (
              <p className="text-gray-500 text-center">No ingredients found for this food</p>
            ) : (
              <div className="space-y-2">
                {ingredients.map((ingredient) => (
                  <div 
                    key={ingredient.id} 
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div>
                      <p className="font-medium">{ingredient.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(ingredient)}
                        className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ingredient.id)}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {isDeleting ? <Spinner size="sm" /> : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};