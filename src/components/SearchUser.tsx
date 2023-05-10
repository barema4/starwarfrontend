import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { UserContext } from "../utils/UserContext";
import styled from "styled-components";

export const SEARCH_USER_QUERY = gql`
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

interface userType {
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string;
}

const SearchUser: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { loading, error } = useQuery(SEARCH_USER_QUERY, {
    variables: { name },
  });

  const { users } = useContext(UserContext);

  const navigate = useNavigate();

  const filteredUsers = users.filter((user: userType) => {
    return user.name.includes(name || "");
  });

  if (error) return <p>Error: {error.message}</p>;

  const handleBack = () => {
    navigate("/");
  };

  const Title = styled.h1`
    font-size: 4.5em;
    text-align: center;
    color: white;
    @media screen and (max-width: 380px) {
      font-size: 2em;
    }
  `;

  const Content = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 21px;
    font-family: sans-serif;
    line-height: 60px;
    @media screen and (max-width: 380px) {
      font-size: 12px;
      line-height: 40px;
      justify-content: flex-start;
    }
  `;

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-blue-400 ">
      <Title>Personal Details</Title>
      {filteredUsers.length === 0 ? (
        <p>No results found.</p>
      ) : loading ? (
        <div>Loading ...</div>
      ) : (
        filteredUsers.map((user: userType) => (
          <div key={user.name}>
            <Content>
              <label>Name :</label>
              <div>{user.name}</div>
            </Content>
            <Content>
              <label>Height :</label>
              <div>{user.height}</div>
            </Content>
            <Content>
              <label>Mass :</label>
              <div>{user.mass}</div>
            </Content>
            <Content>
              <label>Gender :</label>
              <div>{user.gender}</div>
            </Content>

            <Content>
              <label>HomeWorld : </label>
              <div>{user.homeworld}</div>
            </Content>
          </div>
        ))
      )}
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center"
        onClick={handleBack}
      >
        Go Back
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchUser;
