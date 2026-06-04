import axios from 'axios';

const BASE_URL = 'https://6a21586bb1d0aaf32b4f4284.mockapi.io';

export const fetchSports = async () => {
  const response = await axios.get(`${BASE_URL}/disciplines`);
  return response.data;
};