class SessionStorage {
  constructor() {
    this.myStorage = window.sessionStorage;
  }
  get(name, parse) {
    const item = this.myStorage.getItem(name);
    return parse ? JSON.parse(item) : item;
  }
  set(name, value) {
    return this.myStorage.setItem(name, JSON.stringify(value));
  }
}

export default new SessionStorage();
