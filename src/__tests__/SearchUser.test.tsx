import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { UserContext } from "../utils/UserContext";
import SearchUser, { SEARCH_USER_QUERY } from "../components/SearchUser";

// Mocked user data
const users = [
  {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    gender: "male",
    homeworld: "Tatooine",
  },
];
const setUsers = jest.fn();
const setCurrentPage = jest.fn();
// Mock the context value
const mockContextValue = {
  users,
  setUsers,
  currentPage: 1,
   setCurrentPage
};

// Mock the route parameter
const mockRouteParam = {
  name: "Luke",
};

// Mock the GraphQL query response
const mockQueryResponse = {
  data: {
    searchUser: users,
  },
};

const mocks = [
  {
    request: {
      query: SEARCH_USER_QUERY,
      variables: {
        name: mockRouteParam.name,
      },
    },
    result: mockQueryResponse,
  },
];

describe("SearchUser component", () => {
  it("renders user details correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/${mockRouteParam.name}`]}>
          <UserContext.Provider value={mockContextValue}>
            <Routes>
            <Route path="/:name" Component={SearchUser}>
            </Route>
            </Routes>
          </UserContext.Provider>
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Assertions
    expect(screen.getByText("Personal Details")).toBeInTheDocument();
    expect(screen.getByText("Name :")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Height :")).toBeInTheDocument();
    expect(screen.getByText("172")).toBeInTheDocument();
    expect(screen.getByText("Mass :")).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
    expect(screen.getByText("Gender :")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("HomeWorld :")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
  });

})

