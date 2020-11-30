/**
 * The application module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author "Daniel Persson <dp222jd@lnu.se>"
 * @version 1.0.0
 */

import fs from 'fs-extra'
import validator from 'validator'
import { LinkScraper } from './link-scraper.js'

/**
 * Encapsulates a Node application.
 */
export class Application {  
  /**
   *Creates an instance of Application.
   * @param {*} datasource
   * @param {*} urls
   * @memberof Application
   */
  constructor(dataSource, urls) {
    this._dataSource = dataSource
    this._urls = urls
  }

  /**
   * Gets the urls.
   *
   * @memberof Application
   * @returns {string[]} The URLs.
   */
  get urls () {
    return [...this._urls]
  }

  /**
   * Sets the urls that we are going to scrape links from.
   *
   * @memberof Application
   */
  set urls (values) {
    if(!values) {
      throw new Error('No url(s) were provided')
    }

    values.forEach(value => {
      if(!validator.isURL(value)) {
        throw new Error(`${value} is not a valid url!`)
      }
    })

    this._urls = [...values]
  }
  /**
   * Begins running the application.
   */
  async run () {
    const persistentLinksPromise = this._readPersistentLinks()

    const linkScraper = new LinkScraper()
    const scrapedLinksPromises = this._urls.map(url => linkScraper.extractLinks(url))

    const links = await Promise.all([persistentLinksPromise, ...scrapedLinksPromises])

    const linksSet = new Set([...links.flat()])

    await this._writePersistentLinks([...linksSet].sort())
  }

  async _readPersistentLinks () {
    return fs.readJson(this._dataSource).catch(error => [])
  }

  async _writePersistentLinks (links) {
      fs.writeJson(this._dataSource, links, { spaces: 4 })
  }
}
