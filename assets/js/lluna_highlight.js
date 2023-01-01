// HIGHLIGHT LLUNA CODE

// Define styles
const STYLE = [
    // the 's' flag let's match across lines
    [/^,,,.*,,,/gs, "color: var(--purple-lighter)"],
    [/^,.*/g, "color: var(--purple-lighter); font-style: italic"],
    [/^'([^']|\\')*'/g, "font-style: italic"],
    [/^-?(\d+|\d*\.\d+)[\d\._]*/g, "font-weight: bold"],
    [/^[!#$%&*+\-\./:<=>?@\\^|~_]+/g, "font-weight: bold; color: var(--orange)"],
    [/^[a-z]\S+/g, ""],
];

// Iterate elements with 'language-lluna' class
const elementsToHighlight = document.getElementsByClassName("language-lluna");
for (let e of elementsToHighlight) {
    e.innerHTML = highlight(e.textContent);
}

// Syntax highlight
function highlight(code) {
    let result = "";

    while (code.length > 0) {
        for (let t of STYLE) {
            let regex = t[0];
            let style = t[1];

            if ((found = regex.exec(code) !== null)) {
                let text = code.slice(0, regex.lastIndex);

                result += `<span style="${style}">${text}</span>`;
                console.log(text);

                code = code.slice(regex.lastIndex);
                regex.lastIndex = 0;
                break;
            }
        }
        result += code[0];
        code = code.slice(1);
    }

    return result;
}
