export default function isLegalParent(editor) {
    return !editor.value.blocks.some(i => {
        return [
            "unordered-list",
            "ordered-list",
            "list-item",
            "list-item-child"
        ].includes(i.type)
    })
}