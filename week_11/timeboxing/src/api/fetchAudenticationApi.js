const baseURL = 'http://localhost:4000';

const fetchAudenticationApi = {
     login: async function(credencials) {
          const response = await makeRequest(`${baseURL}/login`, "POST", credencials);
          const result = await response.json();
          return result;
     }
}


async function makeRequest(url, method, body) {
     const jsonBody = body ? JSON.stringify(body) : undefined;
     const response = await window.fetch(url, {
          method,
          headers: {
               "Content-Type": "application/json"
          },
          body: jsonBody
     });
     if (!response.ok) {
          throw new Error("serwer nie odpowiada");
     }
     return response;
}

export default fetchAudenticationApi;