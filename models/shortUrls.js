const shortId = require('shortid')

class ShortUrl {
    /**
     * @typedef {object} entity
     * @property {string} full
     * @property {string} short
     * @property {number} clicks
     *
     * @typedef {entity[]} storage
     */
    storage = []

    /**
     * @param {string} full
     * @return {void}
     */
    create = (full) => {
        if (this.storage.filter(url => url.full === full).pop()) {
            return;
        }
        this.storage.push({ full, short: shortId.generate(full), clicks: 0 });
    }

    /**
     * @returns {storage}
     */
    fetchAll = () => this.storage;

    /**
     * @param {string} short
     * @returns {entity}
     */
    findOne = short => this.storage.filter(url => url.short === short).pop();

    /**
     * @param {string} short
     * @return {void}
     */
    incrementClicks = short => {
        const url = this.findOne(short);
        if (url) {
            url.clicks++;
        }
    };
}

module.exports = ShortUrl;
