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
    const payload = data.data !== undefined ? data.data : data;
    const format = req.query.format || formatConfig.defaultFormat;
    const isCollection = Array.isArray(payload);
    const rootName = getResourceName(req, isCollection);

    try {
      if (format === "xml") {
        return res.type("application/xml").send(
          create({ [rootName]: payload }).end({ prettyPrint: formatConfig.xmlIndent })
        );
      }

      if (format === "csv") {
        return res.type("text/csv").send(
          stringify(payload, { header: true, delimiter: formatConfig.csvDelimiter })
        );
      }

      return res.json({
        data: payload,
        links: data.links || undefined
      });
    } catch (err) {
      next(err);
    }
  };
  next();
};