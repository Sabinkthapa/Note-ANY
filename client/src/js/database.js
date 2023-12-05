import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//  export function to use as a post to the database
export const putDb = async (content) =>{
  console.error('putDb not implemented',content);
  const jateDb = await openDB('jate',1); //create a database connection and version we want to use
  const tx = jateDb.transaction('jate','readwrite');//create new transaction and specify the database and data privileges
  const store =tx.objectStore('jate');
  const request = store.add({id:1, value:content});
  const result = await request;
  console.log('Data saved to the database', result);
} 


//export a function we will use to Get all from the database
export const getDb = async () => {
  const jateDb = await openDB('jate',1);
  const tx = jateDb.transaction('jate','readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result =await request;
  console.log('data read from database',result);
  return result.value;
};
initdb();
