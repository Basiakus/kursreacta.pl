import uuid from 'uuid';
const timeboxes = [
     {
          "id": "1",
          "title": "Week 1 introduction",
          "totalTimeInMinutes": 25,
          "flag": "blue"
     },
     {
          "id": "2",
          "title": "week 2 componens of react",
          "totalTimeInMinutes": 35,
          "flag": "blue"
     },
     {
          "id": "3",
          "title": "week 3 lists and forms",
          "totalTimeInMinutes": 30,
          "flag": "Blue"
     }
]
const findIndexByAnId = (id) => {
     const result = timeboxes.findIndex((timebox) => timebox.id == id);
     if (result < 0) {
          throw new Error('timebox o danym id nie stnieje')
     }
     return result;
}

const wait = (ms = 1000) => {
     return new Promise((resolve) => setTimeout(resolve, ms));
}

const fakeTimeboxesApi = {
     getAllTimeboxes: async function () {
          //throw new Error('coś nie tak');
          await wait(3000);
          console.log('get all', timeboxes);
          return [...timeboxes];
     },
     addTimebox: async function (timeboxToAdd) {
          await wait(1000);
          const addedTimebox = { ...timeboxToAdd, id: uuid.v4() };
          timeboxes.push(addedTimebox);
          console.log('post', timeboxes);
          return addedTimebox;
     },
     replaceTimebox: async function (timeboxToReplace) {
          if (!timeboxToReplace.id) {
               throw new Error('timebox nie ma id');
          }
          await wait(1000);
          const index = findIndexByAnId(timeboxToReplace.id);
          const ReplacedTimebox = { ...timeboxToReplace };
          timeboxes[index] = ReplacedTimebox;
          console.log('put', timeboxes);
          return ReplacedTimebox;
     },
     removeTimebox: async function (timeboxToRemove) {
          if (!timeboxToRemove.id) {
               throw new Error('timebox nie ma id');
          }
          await wait(1000);
          const index = findIndexByAnId(timeboxToRemove.id);
          timeboxes.splice(index, 1);
          console.log('delete', timeboxes);
     }
}

export default fakeTimeboxesApi;