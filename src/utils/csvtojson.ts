import csv from "csvtojson";

async function csvtojson(filename: string) {
  const csvFilePath = `tmp/uploads/${filename}`;

  const jsonObj = await csv().fromFile(csvFilePath);

  return jsonObj;
}

export default csvtojson;
