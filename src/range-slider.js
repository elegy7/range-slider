export default function rangeIniter(config) {
    const onChange = config.onChange || function () { }
    // 进度条长度
    const width = config.width
    // 范围值
    const range = config.range[1] - config.range[0]
    // 左边的点距离原点的值
    const lLeft = width * ((config.value[0] - config.range[0]) / range)
    // 右边的点距离原点的值
    const rLeft = width * ((config.value[1] - config.range[0]) / range)
    // 高亮线的宽度
    const lineWidth = width * ((config.value[1] - config.value[0]) / range)
    const elString =
        `<div class="range-slider" style="width: ${width}px;">` +
        `<div class="inner-left" style="left: ${lLeft}px;"><span class="count">${config.value[0]}</span></div>` +
        `<div class="inner-right" style="left: ${rLeft}px;"><span class="count">${config.value[1]}</span></div>` +
        `<div class="inner-line" style="width: ${lineWidth}px; left: ${lLeft + 10}px;"></div>` +
        '</div>'
    const $el = document.querySelector(config.el)
    const $input = $el
    const $div = document.createElement('div')
    $div.innerHTML = elString
    $input.style.display = 'none'
    $input.after($div)

    const $rangeSlider = $div.querySelector('.range-slider')
    $input.value = config.value[0] + '-' + config.value[1]
    onChange(config.value[0] + '-' + config.value[1])
    let className, left, $activity, $line, event
    $rangeSlider.addEventListener('mousedown', evt => {
        event = evt
        className = event.target.classList.value
        if (['inner-left', 'inner-right'].indexOf(className) === -1) return
        $activity = $rangeSlider.querySelector('.' + className)
        $line = $rangeSlider.querySelector('.inner-line')
        left = parseInt($activity.style.left)

        document.addEventListener('mousemove', onMousemove)
    })
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMousemove)
    })

    function onMousemove(e) {
        const y = e.pageX - event.pageX
        const offset = left + y
        const lLeft = parseInt($rangeSlider.querySelector('.inner-left').style.left)
        const rLeft = parseInt($rangeSlider.querySelector('.inner-right').style.left)
        if ((offset < 0 || offset >= rLeft - 10) && className === 'inner-left') return
        if ((offset > width || offset <= lLeft + 10) && className === 'inner-right') return
        $activity.style.left = offset + 'px'
        // 根据移动百分比计算数值
        const value = Math.ceil((80 - 16) * (offset / width) + 16)
        $activity.querySelector('.count').innerHTML = value
        if (className === 'inner-left') {
            config.value[0] = value
            // 高亮线的宽度
            const lineWidth = width * ((config.value[1] - config.value[0]) / range)
            $line.style.left = (offset + 10) + 'px'
            $line.style.width = lineWidth + 'px'
        } else {
            config.value[1] = value
            // 高亮线的宽度
            const lineWidth = width * ((config.value[1] - config.value[0]) / range)
            $line.style.width = lineWidth + 'px'
        }
        onChange(config.value[0] + '-' + config.value[1])
    }
}
