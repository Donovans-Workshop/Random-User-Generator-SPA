import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api/';

export const fetchUsers = async (
  genders,
  nationalities,
  numberOfUsers,
  page
) => {
  const params = new URLSearchParams();

  if (genders.length) params.append('gender', genders.join(',').toLowerCase());
  if (nationalities.length) params.append('nat', nationalities.join(','));
  params.append('results', numberOfUsers.toString());
  params.append('page', page.toString());

  const response = await axios.get(`${BASE_URL}?${params.toString()}`);
  return response.data.results;
};
