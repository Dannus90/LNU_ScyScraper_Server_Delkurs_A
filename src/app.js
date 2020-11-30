/**
 * The starting point of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 1.0.0
 */

import { resolve } from 'path'
import { Application } from './application.js'

/**
 * The main function of the application.
 */
const main = async () => {
  try {
    // Parse the command-line (skip the first two arguments).
    const [,, path, ...urls] = process.argv

    // Get the absolute path to the data source.
    const dataSource = resolve(process.cwd(), path)

    // Begin to run the actual application.
    const application = new Application(dataSource, urls)
    await application.run()

    console.log(`Done writing links to '${dataSource}'.`)
  } catch (error) {
    console.error(error.message)
  }
}

main()
