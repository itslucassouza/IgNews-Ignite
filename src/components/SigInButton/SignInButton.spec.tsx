import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";
import { SigInButton } from ".";

jest.mock("next-auth/client");

describe("SignIn Component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SigInButton />);
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SigInButton />);
    expect(screen.getByText("John doe")).toBeInTheDocument();
  });
});
