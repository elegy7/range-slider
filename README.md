## Preview

## Usage

```html
<input type="text" id="range-slider" />
```

```js
rangeIniter({
    el: '#range-slider',
    range: [16, 80],
    value: [18, 60],
    width: 480,
    onChange(val) {
        console.log('val', val)
    }
})
```
