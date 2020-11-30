import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

export class LinkScraper {
    async extractLinks (url) {
        const text = await this._getText(url)

        const dom = new JSDOM(text)

        const links = Array.from(dom.window.document.querySelectorAll('a[href^="http://"], a[href^="https://"]'))
            .map(anchor => anchor.href)
            .sort()

            return [...new Set(links)]
    }

    async _getText (url) {
        const response = await fetch(url)
        return response.text()
    }
}