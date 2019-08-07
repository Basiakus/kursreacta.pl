import axios from 'axios';

const axiosTimeboxesApi = (baseURL = 'http://localhost:4000/timeboxes/') => {
     const timeboxesApi = {
          getAllTimeboxes: async function () {
               const response = await axios.get(baseURL);
               const timeboxes = response.data;
               return timeboxes;
          },
          addTimebox: async function (timeboxToAdd) {
               const response = await axios.post(baseURL, timeboxToAdd);
               const addedTimebox = response.data;
               return addedTimebox;
          },
          replaceTimebox: async function (timeboxToReplace) {
               if (!timeboxToReplace.id) {
                    throw new Error("id dont exist");
               }
               const response = await axios.put(`${baseURL}/${timeboxToReplace.id}`, timeboxToReplace);
               const replaceTimebox = response.data;
               return replaceTimebox;
          },
          removeTimebox: async function (timeboxToRemove) {
               if (!timeboxToRemove.id) {
                    throw new Error("id dont exist");
               }
               const response = await axios.delete(`${baseURL}/${timeboxToRemove.id}`, timeboxToRemove);
               const removeTimebox = response.data;
               return removeTimebox;
          }
     }
     return timeboxesApi;
}
export default axiosTimeboxesApi;

