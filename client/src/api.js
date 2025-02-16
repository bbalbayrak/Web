import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data.data;

    return products.map((product) => ({
      ...product,
      technicaldrawingurl: product.technicalDrawingUrl,
      guideUrl: product.guideUrl,
    }));
    
  } catch (error) {
    // console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (product, technicalDrawingFile, guideFile) => {
  try {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });
    
    if (technicalDrawingFile) {
      formData.append("technicaldrawingurl", technicalDrawingFile);
    }
    if (guideFile) {
      formData.append("guideurl", guideFile);
    }
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    // console.error("Error adding product:", error);
    throw error;
  }
};


export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, updatedProduct);
    return response.data.data;
  } catch (error) {
    // console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    // console.error('Error deleting product:', error);
    throw error;
  }
};

export const searchByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, { params: { name } });
    return response.data.data;
  } catch (error) {
    // console.error('Error searching products by name:', error);
    throw error;
  }
};

