import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"; // configure Enzyme to work with React17
configure({ adapter: new Adapter() });

// install it via npm (npm i @wojtekmaj/enzyme-adapter-react-17).
// You will need to install enzyme along with an Adapter corresponding to the version of react (or other UI Component library) you are using (React 17).
// Add to package.json below Jest:
// "setupFiles":[
//  "./tools/testSetup.js"  (jest'll run this file)
// ],
