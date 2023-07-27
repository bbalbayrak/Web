const API_URL = process.env.API_URL

export const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`Kullanıcı oluşturma hatası: ${response.statusText}`);
      }
  
      const data = await response.json();
      // console.log('Kullanıcı başarıyla oluşturuldu:', data);
      return data;
    } catch (error) {
      // console.error('Kullanıcı oluşturulamadı:', error);
      throw error;
    }
  };

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/allusers`);
  
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
  
    return await response.json();
  };