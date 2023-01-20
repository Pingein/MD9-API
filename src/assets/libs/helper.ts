
const createElement = (tagName:string, className:string,
                       innerHTML?:string, fn?:Function) => {
    let element = document.createElement(tagName)
    element.className = className

    if (innerHTML) {
        element.innerHTML = innerHTML
    }

    fn && element.addEventListener('click', fn())

    return element
}


const removeChildNodes = (parent_element: HTMLElement) => {
    let child_nodes = [...parent_element.childNodes]
    child_nodes.forEach((node) => {
        node.remove()
    })
}


// const createPageButton = (move:'prev'|'next') => {
//     let next_page_btn = createElement('div', 'page-btn next', '>')
        
//     next_page_btn.addEventListener('click', () => {
//         removeChildNodes(document.getElementById('card-container'))

//         fetch(info.next).then((response) => response.json())
//                         .then((data) => processData(data))
//     })
//     document.body.appendChild(next_page_btn)
// }


export { createElement, removeChildNodes }