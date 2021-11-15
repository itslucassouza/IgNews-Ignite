import { render } from "@testing-library/react";
import { useRouter } from "next/dist/client/router";
import { ActiveLink } from ".";

jest.mock("next/dist/client/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("active link renders correctly", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );
    //se tem o texto
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("active link is receiving active class", () => {
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    //se tem a class
    expect(getByText("Home")).toHaveClass("active");
  });
});
