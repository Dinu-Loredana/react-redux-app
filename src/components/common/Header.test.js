import React from "react";
import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
// import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom"; // cuz Header expects to run as a child of React Router & receives its props; not needed for shallow cuz it's not actually rendering the component
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore.dev";
import "@testing-library/jest-dom";

// --coverage --watchAll

function renderHeader() {
  const store = configureStore();
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
}

describe("Header Component", () => {
  it("should display 3 links", () => {
    const wrapper = renderHeader();
    const links = wrapper.getAllByRole("link");
    expect(links.length).toEqual(3);
  });

  it("should display text and href properly", () => {
    const wrapper = renderHeader();
    const links = wrapper.getAllByRole("link");

    expect(links[0].textContent).toEqual("Home");
    expect(links[0].href).toContain("/");

    expect(links[1].textContent).toEqual("Courses");
    expect(links[1].href).toContain("/courses");

    expect(links[2].textContent).toEqual("About");
    expect(links[2].href).toContain("/about");
  });

  it("should have active class when is link is clicked", () => {
    const wrapper = renderHeader();
    const links = wrapper.getAllByRole("link");
    expect(links[0]).toHaveClass("active");
    expect(links[1]).not.toHaveClass("active");
    fireEvent.click(links[1]);
    expect(links[1]).toHaveClass("active");
  });
});

// it("contains 3 NavLinks with shallow", () => {
//   const numLinks = shallow(<Header />).find("NavLink");
//   console.log(numLinks.debug());
//   expect(numLinks.length).toEqual(3);
// });

// with mount, a full DOM is created in memory using JSDOM behind the scenes. NavLinks are transformed into <a> in the DOM. You search for the final rendered HTML. Use React Router's memoryrouter for testing since Header expects to have React Router's props passed in.
// it("contains 3 anchor tags via mount", () => {
//   const numAnchors = mount(
//     <MemoryRouter>
//       <Header />
//     </MemoryRouter>
//   ).find("a").length;
//   expect(numAnchors).toEqual(3);
// });

/*
2 ways to test React Components with Enzyme:
###shallow
- renders single component in isolation
- doesn't actually render the component; is searches the JSX code
- there is no DOM created
- faster to test it
###mount 
- renders compon with children
- creates more realistic test by rendering the compon and its children.
- a full DOM is created in memory using JSDOM behind the scenes. You search for the final rendered HTML ( NavLinks are transformed into <a> in the DOM.)
- requires a DOM (JSDOM).
https://enzymejs.github.io/enzyme/ 
*/
