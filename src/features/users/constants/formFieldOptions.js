/*
I've established a number of constant variables that reflect the specifications and limitations of the API 'randomuser.me' These would
need to be updated in the future to reflect the changes that happen within the API. Another approach is pulling these pieces of data from 
the API if endpoints for that functionality exists. But having these details hardcoded does help us avoid making more API calls which can slow down
load speeds on page and diminish user experience
*/

export const GENDER_OPTIONS = ['Male', 'Female'];
export const NATIONALITY_OPTIONS = [
  'AU',
  'BR',
  'CA',
  'CH',
  'DE',
  'DK',
  'ES',
  'FI',
  'FR',
  'GB',
  'IE',
  'IN',
  'IR',
  'MX',
  'NL',
  'NO',
  'NZ',
  'RS',
  'TR',
  'UA',
  'US',
];
export const NUMBER_OF_USERS_SIZE_LIMIT_LOWERBOUND = 1;
export const NUMBER_OF_USERS_SIZE_LIMIT_UPPERBOUND = 5000;
export const BASE_URL = 'https://randomuser.me/api/';
export const PAGE_SIZE = 10;
