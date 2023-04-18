import axios from 'axios';

const API_URL = 'http://localhost:3001/products';

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    const products = response.data.data;

    return products.map((product) => ({
      ...product,
      technicaldrawingurl: product.technicalDrawingUrl,
      guideUrl: product.guideUrl,
    }));
    
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const formData = new FormData();

    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        formData.append(key, product[key]);
      }
    }

    const response = await axios.post(API_URL, formData);
    return response.data.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};


export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const searchByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { name } });
    return response.data.data;
  } catch (error) {
    console.error('Error searching products by name:', error);
    throw error;
  }
};
