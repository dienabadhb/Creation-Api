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
    try {
      const payload = data.data !== undefined ? data.data : data;
      const isCollection = Array.isArray(payload);
      const rootName = getResourceName(req, isCollection);

      const format = req.query.format || formatConfig.defaultFormat;

      if (format === "xml") {
        const xmlObj = isCollection
          ? { [rootName]: { item: payload } } 
          : { [rootName]: payload };          

        return res
          .type("application/xml")
          .send(create(xmlObj).end({ prettyPrint: formatConfig.xmlIndent }));
      }

      if (format === "csv") {
        if (!isCollection) {
          return res.status(400).json({
            errors: { message: "CSV export requires a collection" },
          });
        }

        return res
          .type("text/csv")
          .send(
            stringify(payload, {
              header: true,
              delimiter: formatConfig.csvDelimiter,
            })
          );
      }

      return res.json({ ...data, data: payload });
    } catch (err) {
      next(err);
    }
  };

  next();
};