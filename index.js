const fs = require("fs");

// images CID 
const IMAGE_CID = "bafybeiea3hbjmkupql6yk5m2m67dupummwva3oa227x6jig4663nfravti";
const EXTERNAL_URL = "https://twitter.com/dexoshi";

main();
async function main() {
  // combines all metadata
  let json = [];

  // get files from ./rawImgs
  const rawImgs = fs.readdirSync("./rawImgs");

  for (const index in rawImgs) {
    // get description and extension from file
    const [description, extension] = rawImgs[index].split(".");
    // get number with 0 padding
    const number = String(index).padStart(5, "0");

    // create json file
    const obj = {
      name: `${description} #${number}`,
      image: `ipfs://${IMAGE_CID}/${number}.${extension}`,
      gateway: `https://nftstorage.link/ipfs/${IMAGE_CID}/${number}.${extension}`,
      cacheImage: `https://raw.githubusercontent.com/leon-do/dexoshi-json/main/editedImgs/${number}.png`,
      description,
      external_url: EXTERNAL_URL,
      attributes: [
        {
          trait_type: "ID",
          value: number,
        },
        {
          trait_type: "Animal",
          value: description.split(" ").pop(),
        },
        {
          trait_type: "Name",
          value: description.split(" ")[0],
        },
      ],
    };
    // add to json array
    json.push(obj);
    // write json file
    fs.writeFileSync(`./json/${number}.json`, JSON.stringify(obj, null, 2));

    // copy image to ./imgs
    await fs.copyFileSync(`./rawImgs/${description}.${extension}`, `./editedImgs/${number}.${extension}`);
  }

  // write json file
  fs.writeFileSync("./json/_metadata.json", JSON.stringify(json, null, 2));
}
