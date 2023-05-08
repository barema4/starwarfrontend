import React, { useState, useEffect, useContext  } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { UserContext } from '../utils/UserContext';

const SEARCH_USER_QUERY = gql`
  query SearchUser($name: String!) {
    searchUser(name: $name) {
      name
      height
      mass
      gender
      homeworld
    }
  }
`;

const SearchUser: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { users } = useContext(UserContext);
  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);

  const navigate = useNavigate()

  const filteredUsers = users.filter((user) => {
    return  user.name.includes(name)
  }
  );

  const { loading, error, data } = useQuery(SEARCH_USER_QUERY, {
    variables: { name },
  });

  useEffect(() => {
    if (data && data.searchUser) {
      setSearchedUsers(data.searchUser);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleBack = () => {
    navigate('/',);
  };

  return (
    <div>
      <h1>Search Results</h1>
      <h1>Search Results</h1>
      {filteredUsers.length === 0 ? (
        <p>No results found.</p>
      ) : (
        filteredUsers.map((user: any) => (
          <div key={user.name}>
            <h3>{user.name}</h3>
            <p>Height: {user.height}</p>
            <p>Mass: {user.mass}</p>
            <p>Gender: {user.gender}</p>
            <p>HomeWorld: {user.homeworld}</p>
          </div>
        ))
      )}
       <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default SearchUser;

