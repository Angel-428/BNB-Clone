const fs = require("fs");
const path = require("path");

const withCSS = require("@zeit/next-css");

const getSketchArray = () => {
  const sketchArray = [];

  const sketchDirectory = path.join(process.cwd(), "src/sketches");
  const yearFolders = fs
    .readdirSync(sketchDirectory)
    .filter((folderName) => folderName.length === 2);

  yearFolders.forEach((yearFolder) => {
    const yearDirectory = path.join(
      process.cwd(),
      `src/sketches/${yearFolder}`
    );
    const monthFolders = fs
      .readdirSync(yearDirectory)
      .filter((folderName) => folderName.length === 2);

    monthFolders.forEach((monthFolder) => {
      const monthDirectory = path.join(
        process.cwd(),
        `src/sketches/${yearFolder}/${monthFolder}`
      );

      const sketches = fs
        .readdirSync(monthDirectory)
        .filter((sketchFileName) => sketchFileName.length === 10);

      sketches.forEach((sketch) => {
        const sketchId = sketch.substr(0, 6);
        const isValidSketchId = RegExp(/^[0-9]{6}$/).test(sketchId);

        if (isValidSketchId) sketchArray.push(sketchId);
      });
    });
  });

  return sketchArray.reverse();
};

module.exports = withCSS({
  async exportPathMap() {
    // <---- Here it is the configuration I added
    let sketchsPages = {};

    getSketchArray().forEach((sketchId) => {
      sketchsPages = {
        ...sketchsPages,
        [`/${sketchId}`]: { page: "/[sketch]" },
      };
    });

    return sketchsPages;
  },
});
