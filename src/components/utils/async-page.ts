import $ from "jquery"
import axios from "axios"

interface ILinkItem {
  element: HTMLAnchorElement
  href: string
}
interface ILink {
  [hash: string]: ILinkItem
}
interface IParseResult {
  title: string
  root: JQuery.Node
}
type Events = "pageloaded" | "pageloading"

export default class AsyncPage {
  private links: ILink = {}
  private containerRoot: JQuery<HTMLElement>
  private rootId: string

  constructor(rootId: string) {
    this.init()
    this.rootId = rootId
    this.containerRoot = $(`#${rootId}`)
    window.location.hash = '#'
    const pageloaded = document.createEvent("Event")
    const pageloadedType: Events = "pageloaded"
    pageloaded.initEvent(pageloadedType, true, true)

    const pageloading = document.createEvent("Event")
    const pageloadingType: Events = "pageloading"
    pageloading.initEvent(pageloadingType, true, true)

    this.addEventListener("pageloaded", () => {
      this.init()
    })
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash
      this.loadPage(window.location.hash.slice(1))
    })
  }

  private init() {
    document.querySelectorAll("a").forEach(element => {
      const $element = $(element)
      const href = $element.attr("href") || ""
      const { origin } = window.location

      if (!href || /^#/.test(href) || (/http|https/.test(href) && !new RegExp(origin).test(href))) {
        return
      }

      const hash = `#${href}`
      $element.attr("href", hash)

      this.links[hash] = {
        href,
        element
      }
    })
  }

  private parsePage(data: string): IParseResult {
    const startIndex = data.indexOf("<body>")
    const endIndex = data.lastIndexOf("</body>")
    if (!startIndex || !endIndex) {
      throw new Error("Invalid html")
    }

    const title = data.substring(
      data.indexOf("<title>") + "<title>".length,
      data.indexOf("</title>")
    )

    const body = data.substring(startIndex + 6, endIndex)

    const html = $.parseHTML(body, document, true)

    const root = html.find((value: HTMLElement) => {
      return value.id == this.rootId
    })

    return {
      root,
      title
    }
  }

  private async loadPage(href: string, resetScroll = true) {
    this.dispatchEvent("pageloading")
    const responce = await axios.get(href)
    const contentType: string = responce.headers["content-type"]

    if (!new RegExp(/text\/html/).test(contentType)) {
      throw new Error("Invalid responce")
    }

    const data: string = responce.data
    const { root, title } = this.parsePage(data)

    document.title = title ? title : document.title
 
    if (!root) {
      throw new Error("root container not found")
    }

    this.containerRoot.html($(root).html())

    if (resetScroll) {
      window.scrollTo(0, 0)
    }
    this.dispatchEvent("pageloaded")
  }

  public addEventListener(type: Events, callback) {
    document.addEventListener(type, callback)
  }

  private dispatchEvent(type: Events) {
    document.dispatchEvent(new Event(type))
  }
}
