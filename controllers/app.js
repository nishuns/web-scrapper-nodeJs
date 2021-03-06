const scrapper = require("../utils/scrapper");
const scrapify = require("../utils/parse.scrapify");

/**
 *  @description api for application Name
 *  @method GET /app/title
 */
exports.create = async (req, res) => {
  console.log(req.body);
  const link = req.body.link;
  try {
    const htmlData = await scrapper(link);
    const scrappedData = scrapify(htmlData);
    if (scrappedData.length > 0) {
      // const data = await Scrap.collection.insert(scrappedData);
      res
        .status(200)
        .send({ message: "URL scrapped Successfully", data: {} });
    } else res.status(404).send("Cannot scrap this URL");
  } catch (error) {
    console.log(error);
    res.status(404).send("error");
  }
};

/**
 *  @description api for view all scrapped data
 *  @method GET /
 */
exports.viewAll = (req, res) => {
  const keys = myCache.keys();
  const arrayStructure = [];
  keys.map((each) => {
    const json = myCache.get(each);
    arrayStructure.push({ code: each, ...json });
  });
  if (arrayStructure.length > 0) {
    res
      .status(200)
      .send({ message: "Complete scrapped data", data: arrayStructure });
  } else {
    res.status(400).send({ message: "data not found", data: [] });
  }
};

/**
 *  @description api for view scrapped data
 *  @method GET /
 */
exports.view = (req, res) => {
  const code = req.params.code;
  const arrayStructure = [];
  const json = myCache.get(code);
  arrayStructure.push({ code: code, ...json });
  if (arrayStructure.length > 0) {
    res
      .status(200)
      .send({ message: "Requested scrapped data", data: arrayStructure });
  } else {
    res.status(400).send({ message: "data not found", data: [] });
  }
};
