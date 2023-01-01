const fs = require("fs");
const sharp = require("sharp");

const METADATA_CID = "ipfs://bafybeie7bjhof6patydr7i6nv5cj4tbujz2t3ahazxaie5rvyjdnduoq4m";
const GATEWAY = "https://nftstorage.link/ipfs/bafybeicp7ku5ls4e2mab42lobr3a7vviuzus26v3kz5vjjbkdcfvcsu5om";

main();
async function main() {
  // get files from ./rawImgs
  const rawImgs = fs.readdirSync("./rawImgs");

  for (const index in rawImgs) {
    // get description and extension from file
    const [description, extension] = rawImgs[index].split(".");
    // get number with 0 padding
    const number = String(index).padStart(5, "0");

    // create json file
    const json = {
      number: `${description} #${number}`,
      image: `${METADATA_CID}/${number}.${extension}`,
      gateway: `${GATEWAY}/${number}.${extension}`,
      description,
    };
    // write json file
    fs.writeFileSync(`./json/${number}.json`, JSON.stringify(json, null, 2));

    // edit image
    sharp(`./rawImgs/${rawImgs[index]}`)
      .composite([
        {
          input: Buffer.from('<svg><rect x="0" y="0" width="960" height="1568" rx="50" ry="50"/></svg>'),
          blend: "dest-in",
        },
      ])
      .toFile(`./editedImgs/${number}.${extension}`);
  }
}
