(() => {
    dropdowns = document.querySelectorAll('select');
    let grayMode = false;

    const setCopyRightYear = () => {
        const copy = document.querySelector('footer>div>kbd');
        copy.innerHTML = `&copy; <span id="copyrightYear">${new Date().getFullYear()}</span> Mourad Bouguerra. All Rights Reserved.`;
    };

    const setCMYKValues = () => {
        dropdowns.forEach((dropdown) => {
            for (let i = 0; i <= 100; ++i) { // CMYK values range from 0 to 100
                let option = document.createElement('option');
                option.text = option.value = i;
                dropdown.appendChild(option);
            }
        });
    };

    const computeRGBValues = (cmyk) => {
        let c = cmyk[0] / 100;
        let m = cmyk[1] / 100;
        let y = cmyk[2] / 100;
        let k = cmyk[3] / 100;

        let r = 255 * (1 - c) * (1 - k);
        let g = 255 * (1 - m) * (1 - k);
        let b = 255 * (1 - y) * (1 - k);

        return [Math.round(r), Math.round(g), Math.round(b)];
    };

    const computeHexadecimalRGB = (rgb) => {
        return rgb.map(value => value.toString(16).toUpperCase().padStart(2, '0'));
    };

    const formatColorValues = (cmyk, rgb, hexdecimal) => {
        let dividedCMYK = cmyk.map(value => (value / 100).toFixed(2));
    
        return {
            cmykFormatted: `(${dividedCMYK[0]}, ${dividedCMYK[1]}, ${dividedCMYK[2]}, ${dividedCMYK[3]})`,
            rgbFormatted: `(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            hexFormatted: `#${hexdecimal[0]}${hexdecimal[1]}${hexdecimal[2]}`
        };
    };
    

    const displayColorInformation = () => {
        const style = ['bg-dark', 'bg-dark', 'bg-dark', ''];
        let table = document.getElementById("output");
        let tbody = document.createElement("tbody");
        let tr = document.createElement("tr");

        let cmyk = Array.from(dropdowns).map(dropdown => Number(dropdown.value));

        let rgb = computeRGBValues(cmyk);
        let hexdecimal = computeHexadecimalRGB(rgb);

        let {cmykFormatted, rgbFormatted, hexFormatted} = formatColorValues(cmyk, rgb, hexdecimal);

        let data = [cmykFormatted, rgbFormatted, hexFormatted, hexFormatted];

        for(let i = 0; i<data.length; ++i) {
            let td = document.createElement("td");
            td.setAttribute("class", `text-center h2 ${style[i % style.length]}`);
            console.log("data val: " + data[i]);

            if(i !== data.length - 1) {
                td.textContent = data[i];
            }else{
                td.classList.add('rounded-pill');
                td.style.backgroundColor = data[i];
            }
            console.log(td);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
        table.appendChild(tbody);
    };

    const clearTable = () => {
        const table = document.getElementById("output");
        if(table) table.innerHTML = "";
    };

    const displayBasicColors = () => {
        console.log("Now calculating on normal CMYK scale");
        grayMode = false;
    };

    const displayGrayColors = () => {
        console.log("Now calculating on greyscale");
        grayMode = true;
    };

    const displaySelectedColors = () => {
        console.log("Displaying selected colors");
    };

    window.onload = () => {
        setCopyRightYear();
        setCMYKValues();
        dropdowns.forEach(dropdown => dropdown.onchange = displayColorInformation);

        document.getElementById("basicColors").onclick = displayBasicColors;
        document.getElementById("grayColors").onclick = displayGrayColors;
        document.getElementById("selectedColor").onclick = displaySelectedColors;
        document.getElementById("clearColors").onclick = clearTable;
    };
})();
