

const fetchTimeboxesApi = (baseURL = 'http://localhost:5000/timeboxes/') => {
     const timeboxesApi = {
          getAllTimeboxes: async function () {
               const response = await makeRequest(baseURL, "GET"); 
               const timeboxes = await response.json();
               return timeboxes;
          },
          addTimebox: async function (timeboxToAdd) {
               const response = await makeRequest(baseURL, "POST", timeboxToAdd); 
               const addedTimebox = await response.json();
               return addedTimebox;
          },
          replaceTimebox: async function (timeboxToReplace) {
               if (!timeboxToReplace.id) {
                    throw new Error("id dont exist");
               }
               const response = await makeRequest(`${baseURL}${timeboxToReplace.id}`, "PUT", timeboxToReplace);
               const replaceTimebox = await response.json();
               return replaceTimebox;
          },
          removeTimebox: async function (timeboxToRemove) {
               if (!timeboxToRemove.id) {
                    throw new Error("id dont exist");
               }
               const response = await makeRequest(`${baseURL}${timeboxToRemove.id}`, "DELETE", timeboxToRemove);
               const removeTimebox = await response.json();
               return removeTimebox;
          }
     }
     return timeboxesApi;
}
export default fetchTimeboxesApi;

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