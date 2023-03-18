// import { removeMarkdown, highlight } from "./search.js"

const removeMarkdown1 = (
  markdown,
  options = {
    listUnicodeChar: false,
    stripListLeaders: true,
    gfm: true,
    useImgAltText: false,
    preserveLinks: false,
  },
) => {
  let output = markdown || ""
  output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, "")

  try {
    if (options.stripListLeaders) {
      if (options.listUnicodeChar)
        output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + " $1")
      else output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1")
    }
    if (options.gfm) {
      output = output
        .replace(/\n={2,}/g, "\n")
        .replace(/~{3}.*\n/g, "")
        .replace(/~~/g, "")
        .replace(/`{3}.*\n/g, "")
    }
    if (options.preserveLinks) {
      output = output.replace(/\[(.*?)\][\[\(](.*?)[\]\)]/g, "$1 ($2)")
    }
    output = output
      .replace(/<[^>]*>/g, "")
      .replace(/^[=\-]{2,}\s*$/g, "")
      .replace(/\[\^.+?\](\: .*?$)?/g, "")
      .replace(/(#{1,6})\s+(.+)\1?/g, "<b>$2</b>")
      .replace(/\s{0,2}\[.*?\]: .*?$/g, "")
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? "$1" : "")
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
      .replace(/^\s{0,3}>\s?/g, "")
      .replace(/(^|\n)\s{0,3}>\s?/g, "\n\n")
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "")
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
      .replace(/(`{3,})(.*?)\1/gm, "$2")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\n{2,}/g, "\n\n")
  } catch (e) {
    console.error(e)
    return markdown
  }
  return output
}

const highlight1 = (content, term) => {
  const highlightWindow = 50

  // try to find direct match first
  const directMatchIdx = content.indexOf(term)
  if (directMatchIdx !== -1) {
    const h = highlightWindow / 2
    const before = content.substring(0, directMatchIdx).split(" ").slice(-h)
    const after = content
      .substring(directMatchIdx + term.length, content.length - 1)
      .split(" ")
      .slice(0, h)
    return (
      (before.length == h ? `...${before.join(" ")}` : before.join(" ")) +
      `<span class="search-highlight">${term}</span>` +
      after.join(" ")
    )
  }

  const tokenizedTerm = term.split(/\s+/).filter((t) => t !== "")
  const splitText = content.split(/\s+/).filter((t) => t !== "")
  const includesCheck = (token) =>
    tokenizedTerm.some((term) => token.toLowerCase().startsWith(term.toLowerCase()))

  const occurrencesIndices = splitText.map(includesCheck)

  // calculate best index
  let bestSum = 0
  let bestIndex = 0
  for (let i = 0; i < Math.max(occurrencesIndices.length - highlightWindow, 0); i++) {
    const window = occurrencesIndices.slice(i, i + highlightWindow)
    const windowSum = window.reduce((total, cur) => total + cur, 0)
    if (windowSum >= bestSum) {
      bestSum = windowSum
      bestIndex = i
    }
  }

  const startIndex = Math.max(bestIndex - highlightWindow, 0)
  const endIndex = Math.min(startIndex + 2 * highlightWindow, splitText.length)
  const mappedText = splitText
    .slice(startIndex, endIndex)
    .map((token) => {
      if (includesCheck(token)) {
        return `<span class="search-highlight">${token}</span>`
      }
      return token
    })
    .join(" ")
    .replaceAll('</span> <span class="search-highlight">', " ")
  return `${startIndex === 0 ? "" : "..."}${mappedText}${
    endIndex === splitText.length ? "" : "..."
  }`
}

function htmlToElement(html) {
  const template = document.createElement("template")
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild
}

function initPopover(baseURL, useContextualBacklinks, renderLatex) {
  const basePath = baseURL.replace(window.location.origin, "")
  fetchData.then(({ content }) => {
    const links = [...document.getElementsByClassName("internal-link")]
    links
      .filter((li) => li.dataset.src || (li.dataset.idx && useContextualBacklinks))
      .forEach((li) => {
        var el
        if (li.dataset.ctx) {
          const linkDest = content[li.dataset.src]
          const popoverElement = `<p class="backlink-context">
    ${highlight1(removeMarkdown1(linkDest.content), li.dataset.ctx)}
</p>`
          el = htmlToElement(popoverElement)
        } else {
          const linkDest = content[li.dataset.src.replace(/\/$/g, "").replace(basePath, "")]
          if (linkDest) {
            const tagWithHashtags = linkDest.tags.map((tag) => `#${tag}`).join(" ")
            const popoverElement = `<div class="popover">
            <h3 class="popoverTitle" data-title=${linkDest.title}>${linkDest.title}</h3>
            <p class="linkTag" data-tag=${tagWithHashtags}>${tagWithHashtags}</p>
            <p>${removeMarkdown1(linkDest.content).split(" ", 50).join(" ")}...</p>
            <p class="meta">${new Date(linkDest.lastmodified).toLocaleDateString()}</p>
            </div>`
            el = htmlToElement(popoverElement)
          }
        }

        if (el) {
          li.appendChild(el)
          if (renderLatex) {
            renderMathInElement(el, {
              delimiters: [
                { left: "$$", right: "$$", display: false },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: false },
              ],
              throwOnError: false,
            })
          }
          li.addEventListener("mouseover", () => {
            el.classList.add("visible")
          })
          li.addEventListener("mouseout", () => {
            el.classList.remove("visible")
          })
        }
      })
  })
}
