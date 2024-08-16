const sliders = Array.from(document.querySelectorAll('[data-select]'))


const updateSliderElements = (slider, selected) => {
    let elements = Array.from(document.querySelectorAll(`[data-${slider}]`))
    for (const el of elements) {
        el.innerHTML = el.dataset[selected] || ""
    }
}

for (const slider of sliders) {

    const updateSelection = () => {
        let selected = Array.from(slider.querySelectorAll(`input[name=${slider.dataset.select}]`)).filter(s => s.checked).map(s => s.value)[0]
        if (!selected) return
        updateSliderElements(slider.dataset.select, selected)
    }

    updateSelection()

    slider.addEventListener('change', (e) => {
        updateSelection()
    })
}