/**
 * 下载csv
 * @param title 表头
 * @param name 下载文件名称
 */
function downloadCsv(title: string[], name: string) {
  const tableRows = [title]
  const csvString = `data:application/vnd.ms-excel;charset=utf-8,\uFEFF${encodeURIComponent(tableRows.map((d) => d.join(',')).join('\r\n'))}`
  const link = document.createElement('a')
  link.href = csvString
  link.download = name
  link.click()
  link.remove()
}

function downloadTemplate(csvHeader: string[], name: string) {
  const a = document.createElement('a')
  const blob = new Blob([csvHeader.join(',')], { type: 'text/csv' })
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
}

/**
 * 解析csv从文件
 * @param file 要解析的问题件
 * @returns 
 */
async function parseCsvFromFile(file: File) {
  return new Promise(resolve => {
    const fr = new FileReader()
    fr.readAsText(file)
    fr.onload = (ev) => {
      const content = ev.target!.result as string
      if (content) {
        const result = content.split(content.includes('\r') ? '\r\n' : '\n').slice(1).filter((v) => Boolean(v))
        const fmtContent = result.map((v) => v.split(','))
        resolve(fmtContent)
      }
    }
  })
}

function importCsv() {
  window.showOpenFilePicker({
    types: [
      {
        description: 'CSV',
        accept: { 'text/csv': ['.csv'] },
      },
    ],
  }).then(async (fileHandle) => {
    if (fileHandle.length) {
      const file = fileHandle[0]
      const blob = new Blob([await file.getFile()], { type: 'text/csv' })
      blob.text().then((text) => {
        const list = parseCsv(text)
        console.log('list', list)
        // TODO
      })
    }
  }).catch(e => console.warn(e))
}

function parseCsv(text: string) {
  return text.split('\n').slice(1).filter(v => v.trim() !== '').map((v) => {
    const cols = v.split(',')
    return {
      uname: cols[0],
      date: cols[1]
    }
  })
}
