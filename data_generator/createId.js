const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writer = csvWriter();

const writeIdCsv = async () => {
  try {
    writer.pipe(fs.createWriteStream('./newrelic-id.csv'));
    for (let i = 1; i <= 10000; i += 1) {
      const randInt = await faker.random.number({
        min: 1,
        max: 10000000,
      });
      const dataObj = { id: randInt };
      writer.write(dataObj);
    }
    await writer.end();
    return console.log('done writing id!');
  } catch (e) {
    console.log(e);
    return e;
  }
};

writeIdCsv();
