const checkboxes = Array.from(document.querySelectorAll('[data-toggle]'))

const updateElements = (toggle, checked) => {
    let elements = Array.from(document.querySelectorAll(`[data-${toggle}]`))
    for (const el of elements) {
        el.innerHTML = (checked ? el.dataset?.checked : el.dataset?.unchecked) || ""
    }
}

for (const checkbox of checkboxes) {
    let checked = checkbox.checked
    updateElements(checkbox.dataset.toggle, checked)
    checkbox.addEventListener('change', (e) => {
        updateElements(e.target?.dataset?.toggle, e.target?.checked)
    })
}