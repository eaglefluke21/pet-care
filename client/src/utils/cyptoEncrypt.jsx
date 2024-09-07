async function cryptoEncrypt() {
  const apiUrl = import.meta.env.VITE_API_URL;
    
    const url = `${apiUrl}/users/getEncryptkey`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch encryption key: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('checking how data is structured', data);
      const key = data.msgkey; 
      console.log('crypto ecnrypt recived key', key);
      return key;
  
    } catch (error) {
      console.error('Error fetching or using key:', error);
     
    }
  }


  export default cryptoEncrypt;