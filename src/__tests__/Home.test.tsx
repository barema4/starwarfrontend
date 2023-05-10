import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { UserContext } from "../utils/UserContext";
import Home, { ALL_USERS_QUERY } from "../components/Home";

const mockUsers = [
  {
    name: "Anakin Skywalker",
    gender: "male",
  },
  {
    name: "Wilhuff Tarkin",
    gender: "male",
  },
];

const mocks = [
  {
    request: {
      query: ALL_USERS_QUERY,
      variables: { page: 1 },
    },
    result: {
      data: {
        allUsers: {
          results: mockUsers,
          count: mockUsers.length,
        },
      },
    },
    loading: false,
  },
];

describe("Home", () => {
  it("should call setCurrentPage when previous button is clicked", async () => {
    const setUsers = jest.fn();
    const setCurrentPage = jest.fn();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserContext.Provider
          value={{
            setUsers,
            currentPage: 2,
            setCurrentPage,
            users: [],
          }}
        >
          <Home />
        </UserContext.Provider>
      </MockedProvider>
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("should display loading message while data is loading", () => {
    const setUsers = jest.fn();
    const setCurrentPage = jest.fn();
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserContext.Provider
          value={{
            setUsers,
            currentPage: 1,
            setCurrentPage,
            users: [],
          }}
        >
          <Home />
        </UserContext.Provider>
      </MockedProvider>
    );
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
  });
});
