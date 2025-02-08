import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material';

/*
The presentation component for handling the User List. Utilizes MaterialUI's table wrappers because they utilize the space of the viewport better in my opinion
*/
const UserList = ({ users, handleRowClick, handleLoadMore }) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile Picture</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(user)}
              style={{ cursor: 'pointer' }}>
              <TableCell>
                <img
                  src={user.picture.medium}
                  alt='Profile'
                  style={{ borderRadius: '50%' }}
                />
              </TableCell>
              <TableCell>
                {user.name.first} {user.name.last}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.nat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button
      variant='contained'
      color='secondary'
      onClick={handleLoadMore}
      style={{ marginTop: '10px' }}>
      Load More
    </Button>
  </>
);

export default UserList;
