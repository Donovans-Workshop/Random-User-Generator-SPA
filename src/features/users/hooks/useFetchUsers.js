import { useState } from 'react';
import { apiEndpoints } from '../api/endpoints';
import { validateFormFilters } from '../../../utils/validations';

/*
This is my custom hook for handling the API call to fetch users. We use a custom hook to help handle side effects and. Also, 
I've provided a solution that avoids relying on useEffect to trigger the fetch call to avoid unnecessary API calls
that can happen in less obvious scenarios when working with useEffects asynchronous behavior and the asynchronous functions being run
in its callback. 

*/
export const useFetchUsers = (searchParams) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchUsersData = async (reset = false) => {
    const { genders, nationalities, numberOfUsers } = searchParams;

    const currentPage = reset ? 1 : page;

    //validates the inputs from the form field. Even the ones greatly restricted by the settings of the field. Some
    //users might be idle enough to tinker with the code through browser's inspect tools
    const validationErrors = validateFormFilters(
      genders,
      nationalities,
      numberOfUsers,
      currentPage
    );

    //If there are errors, we will not proceed with the API call
    if (validationErrors) {
      setError(validationErrors);
      return;
    }

    //We will proceed with the API call
    setLoading(true);
    try {
      //We will call the API to get the users. The result will be paginated. Future design will allow for choice of pagination
      const response = await apiEndpoints.getUsers(
        genders,
        nationalities,
        numberOfUsers,
        currentPage
      );

      //If this is a new search, we use our response, otherwise, we combine our old users with the newly added ones("like a lazy load through pagination")
      const newUsers = reset ? response : [...users, ...response];

      setUsers(newUsers.slice(0, numberOfUsers)); //returns the users. also slices off the excess entries from the last pagination API Call

      setPage(reset ? 1 : (prevPage) => prevPage + 1);
      setError(null);
    } catch (err) {
      setError(`Error retrieving data: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  //handles the load more users button's behavior. This is an attempt at makeshift "pagination"
  const handleLoadMore = () => {
    if (users.length >= searchParams.numberOfUsers) {
      return;
    }
    const scrollY = window.scrollY;

    fetchUsersData();

    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 100); //was trying to scroll back down to the list after the page-rerender
  };

  return { users, loading, error, fetchUsersData, handleLoadMore };
};
