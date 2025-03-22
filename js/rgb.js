(() => {
    dropdowns = document.querySelectorAll('select');
    let grayMode = false;

    const setCopyRightYear = () => {
        const copy = document.querySelector('footer>div>kbd');
        copy.innerHTML = `&copy; <span id="copyrightYear">${new Date().getFullYear()}</span> Mourad Bouguerra. All Rights Reserved.`;
    };

    const setRGBValues = () => {
        dropdowns.forEach((dropdown) => {
            for (let i = 0; i < 256; ++i) {
                let option = document.createElement('option');
                option.text = option.value = i;
                dropdown.appendChild(option);
            }
        });
    };

    const computeFloatingPointRGB = (rgb) => {
        return rgb.map(value => (value / 255).toFixed(2));
    };

    const computeHexadecimalRGB = (rgb) => {
        return rgb.map(value => value.toString(16).toUpperCase().padStart(2, '0'));
    };

    const computeGrayScale = (rgb) => {
        let gray = Math.round(0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]);
        return [gray, gray, gray];
    };

    const formatRGB = (rgb, floatingRGB, hexdecimal) => {
        return{
            rgbFormatted: `(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            hexFormatted: `#${hexdecimal[0]}${hexdecimal[1]}${hexdecimal[2]}`,
            floatingRGBFormatted: `(${floatingRGB[0]}, ${floatingRGB[1]}, ${floatingRGB[2]})`
        };
    };

    const displayColorInformation = () => {
        const style = ['bg-success', 'bg-warning', ''];
        let table = document.getElementById("output");
        let tbody = document.createElement("tbody");
        let tr = document.createElement("tr");

        let rgb = Array.from(dropdowns).map(dropdown => Number(dropdown.value));

        if(grayMode) {
            rgb = computeGrayScale(rgb);
        }

        let floatingRGB = computeFloatingPointRGB(rgb);
        let hexdecimal = computeHexadecimalRGB(rgb);

        let {rgbFormatted, hexFormatted, floatingRGBFormatted} = formatRGB(rgb, floatingRGB, hexdecimal);

        let data=[];
        if(grayMode) {
            data = [floatingRGBFormatted, hexFormatted, hexFormatted];
        }else{
            data = [rgbFormatted, hexFormatted, hexFormatted];
        }

        for(let i = 0; i < data.length; ++i) {
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
        console.log("Now calculating on normal rgb scale");
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
        // console.log("dropdowns found: " + dropdowns.length);
        setRGBValues();
        dropdowns.forEach(dropdown => dropdown.onchange = displayColorInformation);

        document.getElementById("basicColors").onclick = displayBasicColors;
        document.getElementById("grayColors").onclick = displayGrayColors;
        document.getElementById("selectedColor").onclick = displaySelectedColors;
        document.getElementById("clearColors").onclick = clearTable;
    };
})();
