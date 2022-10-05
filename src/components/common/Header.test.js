import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom"; // cuz Header expects to run as a child of React Router & receives its props; not needed for shallow cuz it's not actually rendering the component

// with shallow render can search for the React compon tag (NavLink)
// searching on the JSX, a DOM it's not created
it("contains 3 NavLinks with shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// with mount, a full DOM is created in memory using JSDOM behind the scenes. NavLinks are transformed into <a> in the DOM. You search for the final rendered HTML. Use React Router's memoryrouter for testing since Header expects to have React Router's props passed in.
it("contains 3 anchor tags via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(numAnchors).toEqual(3);
});
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
