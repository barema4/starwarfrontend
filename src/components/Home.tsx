import React,{useState, useContext, useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link} from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import styled from 'styled-components';

const ALL_USERS_QUERY = gql`
  query AllUsers($page: Int!) {
    allUsers(page: $page) {
      results {
        name
        height
        mass
        gender
        homeworld
      }
      count
    }
  }
`;


interface people {
  name: string
  height: number
  mass: number
  gender: string
  homeworld: string
  allUsers:{
    results: []
    count: number
  }
  
}
const Home: React.FC = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const { setUsers, currentPage, setCurrentPage } = useContext(UserContext);

  const { loading, error, data } = useQuery(ALL_USERS_QUERY, {
    variables: { page: currentPage },
    onCompleted: (data:people) => {
      if (data.allUsers) {
        setUsers(data.allUsers.results);
        setTotalPages(Math.ceil(data.allUsers.count / 10));
      }
    },
  });

  useEffect(() => {
    const handleSetUsers = () => {
      if (data && data.allUsers) {
        setUsers(data.allUsers.results);
      }
    }
    handleSetUsers()
  }, [data, setUsers])
  
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



  if (error) return <p>Error: {error.message}</p>;

const Title = styled.h1`
    font-size: 4.5em;
    text-align: center;
    color: white;
    @media screen and (max-width: 380px) {
        font-size: 2.5em;
    }
`;

const Button = styled.button`
  background: "palevioletred";
  color: "palevioletred";
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid cornflowerblue;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

const Data = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin: 20px;

    @media screen and (max-width: 380px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin: 7px;
      }

`

const DataWrapper = styled.div`
    border: 1px solid cadetblue;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    background: darkblue;
    color: white;
`


  return (
    <div className="flex flex-col h-screen justify-center items-center bg-blue-400">
      <Title>List of People</Title>
      {loading? (<div>Loading ...</div>) : <Data>
      {data?.allUsers.results.map((user: people) => (
       <Link to={`${user.name}`}>
        <DataWrapper key={user.name}>
          <div>{user.name}</div>
        </DataWrapper>
       </Link> 
      ))}

      </Data>

      }
      <Container>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Container>
    </div>
  );
};

export default Home;
