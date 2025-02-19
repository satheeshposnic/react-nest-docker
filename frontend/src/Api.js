const API_BASE_URL = "http://localhost:5000";
//const API_BASE_URL = process.env.NODE_ENV === "production" ? "/api" : "http://backend:5000";


const Api = {
  getSales: async () => {
    const response = await fetch(`${API_BASE_URL}/sales`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    });
    return response.json();
  },
};

export default Api;
