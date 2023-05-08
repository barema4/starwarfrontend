import React,{useState, useContext, useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link} from 'react-router-dom';
import { UserContext } from '../utils/UserContext';

const ALL_USERS_QUERY = gql`
  query AllUsers($page: Int!) {
    allUsers(page: $page) {
      results {
        name
        height
        mass
      }
      count
    }
  }
`;

const Home: React.FC = () => {

  const { users, setUsers } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { loading, error, data } = useQuery(ALL_USERS_QUERY, {
    variables: { page: currentPage },
    onCompleted: (data) => {
      if (data.allUsers) {
        setUsers(data.allUsers.results);
        setTotalPages(Math.ceil(data.allUsers.count / 10));
      }
    },
  });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSetUsers = () => {
    if (data && data.allUsers) {
      setUsers(data.allUsers.results);
    }
  }

  useEffect(() => {
    handleSetUsers()
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Star Wars Characters</h1>
      {data.allUsers.results.map((user: any) => (
       <Link to={`${user.name}`}>
        <div key={user.name}>
          <h3>{user.name}</h3>
        </div>
       </Link> 
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
