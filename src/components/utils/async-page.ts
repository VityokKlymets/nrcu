import $ from "jquery"
import axios from "axios"

interface ILink {
  element: HTMLAnchorElement
  href: string
}
type Events = "pageloaded"

export default class AsyncPage {
  private links: ILink[]
  private containerRoot: JQuery<HTMLElement>
  private rootId: string

  constructor(rootId: string) {
    this.links = this.init()
    this.rootId = rootId
    this.containerRoot = $(`#${rootId}`)

    const event = document.createEvent("Event")
    const type: Events = "pageloaded"
    event.initEvent(type, true, true)

    this.addEventListener("pageloaded", () => {
      this.links = this.init()
    })
    
    window.addEventListener("popstate",async (event: PopStateEvent) => {
      const href = window.location.pathname
      await this.loadPage(href)
    })
  }

  private init(): ILink[] {
    const result: ILink[] = []

    document.querySelectorAll("a").forEach(element => {
      const href = $(element).attr("href") || ""

      element.addEventListener("click", (e: Event) => {
        e.preventDefault()
        this.loadPage(href)
      })

      result.push({
        element,
        href
      })
    })

    return result
  }

  private async loadPage(href: string,resetScroll = true) {
    const responce = await axios.get(href)

    const contentType: string = responce.headers["content-type"]

    if (/text\/html/.test(contentType)) {
      const data: string = responce.data
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

      const html = $.parseHTML(body,document,true)

      const root = html.find((value: HTMLElement) => {
        return value.id == this.rootId
      })
      if (!root) throw new Error("root container not found")

      this.containerRoot.html($(root).html())
      
      window.history.pushState(null, title, href)
      
      if(resetScroll){
        window.scrollTo(0,0)
      }

      this.dispatchEvent("pageloaded")
      
    } else {
      throw new Error("Invalid responce")
    }
  }
  public addEventListener(type: Events, callback) {
    document.addEventListener(type, callback)
  }
  private dispatchEvent(type: Events) {
    document.dispatchEvent(new Event(type))
  }
}
