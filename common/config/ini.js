const fs = require('fs');
const ini = require('ini');
const mustache = require('mustache');

const $ = {};
module.exports = $;

$.readFile = async (path) => {
    const text = fs.readFileSync(path, 'utf-8');
    const rendered = mustache.render(text, process.env);
    return ini.parse(rendered);
};