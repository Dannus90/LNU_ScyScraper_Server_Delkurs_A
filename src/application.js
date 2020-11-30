/**
 * The application module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author "Daniel Persson <dp222jd@lnu.se>"
 * @version 1.0.0
 */

import fs from 'fs-extra'
import jsdom from 'jsdom'
import fetch from 'node-fetch'
import validator from 'validator'

/**
 * Encapsulates a Node application.
 */
export class Application {
  constructor(datasource = '', urls = []) {
    this._datasource = datasource
    this._urls = urls
  }
  /**
   * Begins running the application.
   */
  async run () {
    // Not developed yet.
    throw new Error('The method or operation is not implemented.')
  }
}
