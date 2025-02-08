import { useState, useEffect, useMemo } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import FilterForm from '../components/FilterForm';
import UserList from '../components/UserList';
import UserModal from '../components/UserModal';

const UsersPage = () => {
  const [genders, setGenders] = useState([]); //made it an array because it gives users multiple ways to request all genders. And more importantly, reduces the changes needed in the future if new genders are added and 'randomuser' lets you ask for multiple at once
  const [nationalities, setNationalities] = useState([]); //made it an array because 'randomuser' supports requesting multiple nationalities
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    genders: [],
    nationalities: [],
    numberOfUsers: 0,
  });

  const memoizedParams = useMemo(
    () => ({
      genders: [...genders], // Deep copy ensures stability
      nationalities: [...nationalities],
      numberOfUsers,
    }),
    [genders, nationalities, numberOfUsers]
  );

  const { users, loading, error, handleLoadMore, fetchUsersData } =
    useFetchUsers(memoizedParams);

  //Only want this useEffect to run once so I can give the user a little information
  // on the requirements of using the search through the helpful error message displayed
  useEffect(() => {
    fetchUsersData();
  }, []);

  //This ensures that my userData is reset every time the user hits the submit button. Typically, there would be concern as to whether
  //the searchParams are different, but "randomuser" is for generating new users, so we'll give this functionality some flexibility
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => ({
      ...prev,
      genders: [...genders],
      nationalities: [...nationalities],
      numberOfUsers,
    }));
    fetchUsersData(true);
  };

  //pops up the Modal to see the user information
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  //closes modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>D.A.W. Systems React Challenge: Random User Generator SPA</h2>
      <FilterForm
        {...{
          genders,
          setGenders,
          nationalities,
          setNationalities,
          numberOfUsers,
          setNumberOfUsers,
          handleSubmit,
        }}
      />
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserList
          users={users}
          handleRowClick={handleRowClick}
          handleLoadMore={handleLoadMore}
        />
      )}
      <UserModal
        open={isModalOpen}
        user={selectedUser}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UsersPage;
