import extendLink from "./libs/extendLink.mjs";
import fs from 'fs';

const urls = fs.readFileSync('./auditDomains.csv', 'utf8').split('\n');

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
fs.writeFileSync('./auditUrls.csv', ``);
fs.appendFileSync('./auditUrls.csv', `Domain, Link\n`);
for (const url of urls){
    console.log(`Extend ${url}`);
    const extendedUrl = await extendLink(url);
    fs.appendFileSync('./auditUrls.csv', `${url}, https://${url}\n`);
    for(const link of shuffle(extendedUrl).slice(0, 15)){
        fs.appendFileSync('./auditUrls.csv', `${url}, ${link}\n`);
    }
}