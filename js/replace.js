import fs from 'fs';

// fetch the ranks dir

const ranks = fs.readdirSync('./src/ranks');

const emptyCJSContent = `
module.exports = {
  pat_str: '',
  special_tokens: {},
  bpe_ranks: '',
};
`;

const emptyESMContent = `
export default {
  pat_str: '',
  special_tokens: {},
  bpe_ranks: '',
};
`;

// replace the ranks with the lite ranks
ranks
    .filter((rank) => rank.endsWith('.cjs') || rank.endsWith('.js'))
    .forEach((rank) => {
        const fullPath = `./src/ranks/${rank}`;
        if (rank.endsWith('.cjs')) {
            fs.writeFileSync(fullPath, emptyCJSContent);
        } else if (rank.endsWith('.js')) {
            fs.writeFileSync(fullPath, emptyESMContent);
        }
    });

ranks.filter((rank) => rank.endsWith('.json') || rank.endsWith('.tiktoken'))
    .forEach((rank) => {
        const fullPath = `./src/ranks/${rank}`;
        fs.rmSync(fullPath);
    });

