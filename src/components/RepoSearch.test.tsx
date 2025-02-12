import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RepoSearch from "./RepoSearch";
import { vi } from "vitest";

const mockStore = configureStore([]);

const store = mockStore({
  repos: {
    repos: [],
    loading: false,
    error: null,
  },
});

describe("RepoSearch", () => {
  it("renders input and button elements", () => {
    render(
      <Provider store={store}>
        <RepoSearch />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument(); // Check for input presence
    expect(screen.getByText("Search")).toBeInTheDocument(); // Check for button presence
  });

  it("updates the username state when input changes", () => {
    render(
      <Provider store={store}>
        <RepoSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter username") as HTMLInputElement; // Get input field
    fireEvent.change(input, { target: { value: "octocat" } }); // Simulate input change
    expect(input.value).toBe("octocat"); // Check if input value is updated
  });

  it("dispatches fetchRepos when search button is clicked", async () => {
    const dispatch = vi.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={store}>
        <RepoSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter username"); // Get input field
    fireEvent.change(input, { target: { value: "octocat" } }); // Change input value
    const button = screen.getByText("Search"); // Get search button
    fireEvent.click(button); // Simulate button click

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for any asynchronous operations

    expect(dispatch).toHaveBeenCalled(); // Check if dispatch was called
  });
});
