import React from "react";
import { mount } from "enzyme";
import App from './App';

describe("React Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  test("render the title of Library", () => {
    expect(wrapper.find("Link").first().props().children).toContain("Library App");
  });

});