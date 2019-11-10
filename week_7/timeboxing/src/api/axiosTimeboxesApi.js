import axios from 'axios';

const axiosTimeboxesApi = (baseURL = 'http://localhost:4000/timeboxes/') => {
     const timeboxesApi = {
          getAllTimeboxes: async function (accessToken) {
               const response = await axios.get(baseURL, { headers: { Authorization: `Bearer ${accessToken}`} });
               const timeboxes = response.data;
               return timeboxes;
          },
          getTimeboxesByFullTextSearch: async function (string, accessToken) {
               const newBaseUrl = `${baseURL}?q=${string}`;
               const response = await axios.get(newBaseUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
               const timeboxes = response.data;
               console.log(timeboxes, string);
               return timeboxes;
          },
          addTimebox: async function (timeboxToAdd, accessToken) {
               const response = await axios.post(baseURL, timeboxToAdd, { headers: { Authorization: `Bearer ${accessToken}` } });
               const addedTimebox = response.data;
               return addedTimebox;
          },
          replaceTimebox: async function (timeboxToReplace, accessToken) {
               if (!timeboxToReplace.id) {
                    throw new Error("id dont exist");
               }
               const response = await axios.put(`${baseURL}/${timeboxToReplace.id}`, timeboxToReplace, { headers: { Authorization: `Bearer ${accessToken}` } });
               const replaceTimebox = response.data;
               return replaceTimebox;
          },
          removeTimebox: async function (timeboxToRemove, accessToken) {
               if (!timeboxToRemove.id) {
                    throw new Error("id dont exist");
               }
               const response = await axios.delete(`${baseURL}/${timeboxToRemove.id}`, { headers: { Authorization: `Bearer ${accessToken}` }, timeboxToRemove });
               const removeTimebox = response.data;
               return removeTimebox;
          },
          partiallyUpdateTimebox: async function (timeboxToUpdate, accessToken) {
               if (!timeboxToUpdate.id) {
                    throw new Error("id dont exist");
               }
               const response = await axios.patch(`${baseURL}/${timeboxToUpdate.id}`, timeboxToUpdate, { headers: { Authorization: `Bearer ${accessToken}` } });
               const updateTimebox = response.data;
               console.log('axios patch running');
               return updateTimebox;
          }
     }
     return timeboxesApi;
}
export default axiosTimeboxesApi;

