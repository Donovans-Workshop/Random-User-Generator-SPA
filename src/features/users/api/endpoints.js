import { BASE_URL, PAGE_SIZE } from '../constants/formFieldOptions';
import axios from 'axios';

/*
A file to hold the endpoints associated with the UsersPage. getUsers is dynamically creating the endpoint
based on the queryable values of genders, nationalities, number of users, and what page # was passed in. Opted for using
an approach utilizing 'URLSearchParams' because it is a native method understood by all browsers, meaning
it might help other developers familiar with the method understand the code quicker. Reinviting the wheel is only more necessary
for customization, a true optimization, or a need to avoid reliance on a dependency(i.e. someone else's invention of the wheel, shared
as a installable module)
*/
export const apiEndpoints = {
  getUsers: async (genders, nationalities, numberOfUsers, page) => {
    const params = new URLSearchParams();

    if (genders.length)
      params.append('gender', genders.join(',').toLowerCase());
    if (nationalities.length) params.append('nat', nationalities.join(','));

    if (numberOfUsers > 0) {
      if (PAGE_SIZE <= numberOfUsers)
        params.append('results', PAGE_SIZE.toString());
      else params.append('results', numberOfUsers.toString());
    }

    params.append('page', page.toString());

    const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    return response.data.results;
  },
};
