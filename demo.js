import './range-slider/range-slider.css'
import rangeIniter from './range-slider/range-slider.js'

rangeIniter({
	el: '#range-slider',
	range: [16, 80],
	value: [18, 60],
	width: 480,
	onChange(val) {
		console.log('val', val)
	}
})
