const Storage = {
    save(key, value) {
        localStorage.setItem(key,JSON.stringify(value));
    },
  
    remove(key) {
        localStorage.removeItem(key);
    },
  
    load(key) {
        return JSON.parse(localStorage.getItem(key));
    }
  }

export default Storage;