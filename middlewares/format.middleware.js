import { create } from "xmlbuilder2";
import { stringify } from "csv-stringify/sync";
import formatConfig from "../config/format.js";

function getResourceName(req, isCollection) {
  const base = req.path.split("/").filter(Boolean).pop();
  if (!base) return "data";
  if (!isCollection && base.endsWith("s")) return base.slice(0, -1);
  return base;
}

export default (req, res, next) => {
  res.sendFormatted = (data) => {
    const format = req.query.format || formatConfig.defaultFormat;
    const isCollection = Array.isArray(data.data);
    const rootName = getResourceName(req, isCollection);

    if (format === "xml") {
      return res.type("xml").send(
        create({ [rootName]: data.data }).end({ prettyPrint: formatConfig.xmlIndent })
      );
    }

    if (format === "csv") {
      return res.type("text/csv").send(
        stringify(data.data, { header: true, delimiter: formatConfig.csvDelimiter })
      );
    }

    return res.json(data);
  };
  next();
};

