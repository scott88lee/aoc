function readData(test) {
  const path = require('path')
  const fileName = test ? path.join(__dirname, '/data/d5test.txt') : path.join(__dirname, '/data/d5.txt')
  const data = require('fs').readFileSync(fileName, 'utf-8')

  let rules = []
  let pages = []

  let arr = data.split('\n')
  .map(
    (line) => {
    if (line.includes('|')) {
      rules.push(line)
    }
    if (line.includes(',')) {
      pages.push(line)
    }
  })
  pages = pages.map((page) => page.split(','))

  return [rules, pages]
}

let [rules, pages] = readData()

function main(rules, pages) {
  let total = 0
  let total2 = 0
  for (let page of pages) {
    if (validPage(page, rules)) {
      total += parseInt(getMiddleElement(page))
    } else {
      total2 += parseInt(getMiddleElement(fixPage(page, rules)))
    }
  }
  console.log(total2)
  return total
}

function getMiddleElement(page) {
  // if page.length is odd, return the middle element
  if (page.length % 2 !== 0) {
    const middleIndex = Math.floor(page.length / 2)
    return page[middleIndex]
  }
  return 0;
}

function pageViolation(rule, page) {
  const [before, after] = rule.split('|')
  if (page.indexOf(before) >= 0 && page.indexOf(after) >= 0) {
    if (page.indexOf(before) > page.indexOf(after)) {
      return true
    }
  }
}

function validPage(page, rules) {
  for (const rule of rules) {
    if (pageViolation(rule, page)) {
      return false
    }
  }
  return true
}

function fixPage(page, rules) {
  for (const rule of rules) {
    if (pageViolation(rule, page)) {
      // find the index of the violation
      const [before, after] = rule.split('|')
      const beforeIndex = page.indexOf(before)
      const afterIndex = page.indexOf(after)
      // swap the elements
      page[beforeIndex] = after
      page[afterIndex] = before
      // check if the page is valid
      if (validPage(page, rules)) {
        return page
      }
    }
  }
  if (validPage(page, rules)) {
    return page
  }
  return fixPage(page, rules)
}

console.log(main(rules, pages))

module.exports = { 
  getMiddleElement,
  pageViolation,
  readData,
  main 
}