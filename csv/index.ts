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
