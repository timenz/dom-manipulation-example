const str = `
<html>
<body>
<div>
<h2>Test aja</h2>
<p>Menimbang keputusan <a href="https://example.com">test</a> kemudian menimbang sesuatu <a href="https://test.com">timbang</a></p> 
</div>
</body>
</html>
`

const heats = [
  {
    link: 'https://example.com',
    linkId: 'foo',
    visit: 20
  },
  {
    link: 'https://test.com',
    linkId: 'bar',
    visit: 25
  }
]

const domparser = new DOMParser()

const doc = domparser.parseFromString(str, 'text/html')

const overlayTpl = (val) => {
  const div = document.createElement('span')
  div.className = 'overlay'
  div.textContent = 'visit: ' + val
  return div
}

doc.body.querySelectorAll('a').forEach(element => {
  const href = element.getAttribute('href')
  const heatItem = heats.find(item => item.link === href) || null
  if (heatItem === null) return
  console.log(heatItem)
  const span = document.createElement('span')
  const cell = element.cloneNode(true)
  span.style.position = 'relative'
  span.append(cell)
  span.append(overlayTpl(heatItem.visit))
  element.replaceWith(span)
})

const ife = document.getElementById('iframe')
if (ife !== null) {
  const srcdoc = `
  <html>
  <head>
  <style>
  .overlay {
    position: absolute;
    left: 0;
    top: 20px;
    display: block;
    background: rgba(0,0,0,0.1);
    padding: 4px 8px;
  }
  </style>
  </head>
  <body>${doc.body.innerHTML}</body>
  </html>`
  ife.setAttribute('srcdoc', srcdoc)
}
