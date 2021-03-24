export const saveData = (name, data) => localStorage.setItem(name, data);

export const getData = (name) => localStorage.getItem(name);

export const claerData = (name) => localStorage.removeItem(name);
