/**
 * 计算给定文本在特定字体下的渲染宽度
 * @param text 要测量的文本
 * @param font 文本字体
 * @returns 包含文字的实际宽度和通过 measureText 获取的宽度
 */
function getTextRenderWidthByCanvas(text: string, font: { size: number, family?: string }) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx!.font = `${font.size}px ${font.family ?? 'PingFangSC-Medium'}`
  const metrics = ctx!.measureText(text)
  // ! actualBoundingBoxLeft + actualBoundingBoxRight的和计算出来的宽度比直接用width获取出来的通常要大一点，但是更准确。原因是slanted/italic文字斜体等原因。
  const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight)
  canvas.remove()
  return { actual, width: ctx!.measureText(text).width }
}

/** 是否开启了硬件加速 */
export async function hardwareAccelerate() {
  if (VideoDecoder) {
    const { supported = true } = await VideoDecoder.isConfigSupported({ "codec": "avc1.42001E", "hardwareAcceleration": "prefer-hardware" })
    return supported
  } else {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        return !/SwiftShader/gi.test(renderer);
      }
    }
    return false;
  }
}
