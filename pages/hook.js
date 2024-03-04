import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from "next/head";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

const originalColors = [
    "#ff5f45",
    "#0798ec",
    "#fc6c7c",
    "#435b71",
    "orange",
    "blue",
    "purple",
    "yellow",
  ],
  originalPages = [
    { text: "Section 1" },
    { text: "Section 2" },
    { text: "Section 3" },
    { text: "Section 4" },
    { text: "Section 5" },
  ];

const Hooks = () => {
  const [sectionsColor, setsectionsColor] = useState([...originalColors]),
    [fullpages, setfullpages] = useState([...originalPages]);

  const onLeave = (origin, destination, direction) => {
      console.log("onLeave", { origin, destination, direction });
      // arguments are mapped in order of fullpage.js callback arguments do something
      // with the event
    },
    handleChangeColors = () => {
      const newColors =
        sectionsColor[0] === "yellow"
          ? [...originalColors]
          : ["yellow", "blue", "white"];
      return setsectionsColor(newColors);
    },
    handleAddSection = () => {
      const { length } = fullpages;
      fullpages.push({
        text: `section ${length + 1}`,
        id: Math.random(),
      });
      return setfullpages([...fullpages]);
    },
    handleRemoveSection = () => {
      const newPages = [...fullpages];
      newPages.pop();
      return setfullpages(newPages);
    },
    moveSectionDown = () => {
      return fullpage_api.moveSectionDown();
    };

  const Menu = () => (
    <div
      className="menu"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}
    >
      <ul className="actions">
        <li>
          <button onClick={handleAddSection}> Add Section </button>
          <button onClick={handleRemoveSection}> Remove Section </button>
          <button onClick={handleChangeColors}>
            {" "}
            Change background colors{" "}
          </button>
          <button onClick={moveSectionDown}> Move Section Down </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="App">
      <Head>
        <title>My styled page</title>
        <link href="/static/styles.css" rel="stylesheet" />
      </Head>
      <Menu />
      <ReactFullpage
        navigation
        pluginWrapper={pluginWrapper}
        onLeave={onLeave}
        scrollHorizontally={true}
        sectionsColor={sectionsColor}
        render={() =>
          console.log("render prop change") || (
            <ReactFullpage.Wrapper>
              {fullpages.map(({ text }) => (
                <div key={text} className="section">
                  <h1>{text}</h1>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )
        }
      />
    </div>
  );
};

export default Hooks;
