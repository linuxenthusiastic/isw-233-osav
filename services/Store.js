import Storage from './Storage.js'

const Store = {
  menu: null,
  cart: Storage.load("cart") ?? [],
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "menu") {
      window.dispatchEvent(new Event("appmenuchange"));
    }
    if (property == "cart") {
      Storage.save("cart",value);
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
});

export default proxiedStore;
