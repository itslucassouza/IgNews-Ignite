import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { SubscribleButton } from ".";

jest.mock("next/router");
jest.mock("next-auth/client");

describe("SubscribleButton Component", () => {
  it("renders correctly ", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);
    render(<SubscribleButton />);
    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticate", () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribleButton />);

    const subscribleButton = screen.getByText("Subscribe Now");
    fireEvent.click(subscribleButton);

    //verificando se foi chamado
    expect(signInMocked).toHaveBeenCalled();
  });

  //   it("redirects to posts when user already has a subscription", () => {
  //     const useRouterMocked = mocked(useRouter);
  //     const useSessionMocked = mocked(useSession);
  //     const pushMocked = jest.fn();

  //     useSessionMocked.mockReturnValueOnce([
  //       {
  //         user: {
  //           name: "John doe",
  //           email: "john.doe@example.com",
  //         },
  //         activeSubscription: "fake-active-subscription",
  //         expires: "fake-expires",
  //       },
  //       false,
  //     ]);

  //     useRouterMocked.mockReturnValueOnce({
  //       push: pushMocked,
  //     } as any);

  //     render(<SubscribleButton />);

  //     const subscribleButton = screen.getByText("Subscribe Now");
  //     fireEvent.click(subscribleButton);

  //     expect(pushMocked).toHaveBeenCalledWith("/posts");
  //   });
});
