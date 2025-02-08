import {
  NUMBER_OF_USERS_SIZE_LIMIT_LOWERBOUND,
  NUMBER_OF_USERS_SIZE_LIMIT_UPPERBOUND,
} from '../features/users/constants/formFieldOptions';
/*
A file to manage the validation of the different API parameters used in the forms on the UsersPage 
*/

//Not likely to be invalid since we do handle Genders with selectable options,not text. But better to be safe than sorry
export const validateGenders = (genders) => {
  return Array.isArray(genders) ? null : 'Gender must be an array.';
};
//same reasoning as validateGenders
export const validateNationalities = (nationalities) => {
  return Array.isArray(nationalities) ? null : 'Nationality must be an array.';
};

//Slightly looser control over this form fields value. We want to ensure it's a number, and it's between our acceptable limits
export const validateNumberOfUsers = (numberOfUsers) => {
  if (!Number.isInteger(Number(numberOfUsers)))
    return 'Number of users must be an integer.';
  if (
    numberOfUsers < NUMBER_OF_USERS_SIZE_LIMIT_LOWERBOUND ||
    numberOfUsers > NUMBER_OF_USERS_SIZE_LIMIT_UPPERBOUND
  )
    return `Number of users must be between ${NUMBER_OF_USERS_SIZE_LIMIT_LOWERBOUND} and ${NUMBER_OF_USERS_SIZE_LIMIT_UPPERBOUND}.`;

  return null;
};

//Just checking that page is a positive integer
export const validatePage = (page) => {
  return Number.isInteger(Number(page)) && page > 0
    ? null
    : 'Page must be a positive integer.';
};
// ✅ Wrapper function that calls all individual functions
export const validateFormFilters = (
  genders,
  nationalities,
  numberOfUsers,
  page
) => {
  const errors = [
    //We can combine all the errors into a thorough message. This is to be a bit more user-friendly
    validateGenders(genders),
    validateNationalities(nationalities),
    validateNumberOfUsers(numberOfUsers),
    validatePage(page),
  ].filter(Boolean); // Removes `null` values
  return errors.length ? errors.join(' ') : null;
};
