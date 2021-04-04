export const saveToken = (data) => localStorage.setItem('userToken', data);

export const getToken = () => localStorage.getItem('userToken');

export const claerToken = () => localStorage.removeItem('userToken');
