async function fetchData(url, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  if (finalOptions.body && typeof finalOptions.body === "object") {
    finalOptions.body = JSON.stringify(finalOptions.body);
  }
  
  try {
    const response = await fetch(url, finalOptions);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erreur HTTP: ${response.status}`, { cause: errorData });
    }
  
    return await response.json();
  } catch (error) {
    console.error("Erreur dans fetchCustom:", error);
    throw error;
  }
}
  
export default fetchData;
  