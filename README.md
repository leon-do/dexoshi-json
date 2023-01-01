# Dexoshi JSON

Format images, json files and metadata.json to upload to IPFS

`npm i`

move all raw images to `rawImgs`

remove example files

```bash
rm ./editedImgs/*
rm ./json/*
```

update index.js

```javascript
const METADATA_CID = "ipfs://bafybeie7bjhof6patydr7i6nv5cj4tbujz2t3ahazxaie5rvyjdnduoq4m";
const GATEWAY = "https://nftstorage.link/ipfs/bafybeicp7ku5ls4e2mab42lobr3a7vviuzus26v3kz5vjjbkdcfvcsu5om";
const EXTERNAL_URL = "https://twitter.com/dexoshi";
```

`node index.js`
