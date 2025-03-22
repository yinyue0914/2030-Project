(
    () => {
        let counter = 0
        let dropdowns = document.querySelectorAll('div.row select');
        // function setCopyRightYear() {
        //     const copy = document.querySelector('footer>kbd>span')
        //     copy.textContent = new Date().getFullYear()
        // }
        const setCopyRightYear = () => {
            const copy = document.querySelector('footer>kbd>span')
            copy.textContent = new Date().getFullYear()
        }
        const changeBackgroundColor= () =>{
            let colors =['AliceBlue', 'Aquamarine', 'DarkSalmon']
            const cols = document.querySelectorAll('div.row>div[class^="col"]')
            cols.forEach((col,index) => col.style.backgroundColor = colors[index])    
        }

        // const changeBackgroundColor = () => {
        //     let first = document.getElementById('first')
        //     first.style.backgroundColor = "AliceBlue"
        //     let second = document.getElementById('second')
        //     second.style.backgroundColor = "Aquamarine"
        //     let third = document.getElementById('third')
        //     third.style.backgroundColor = "DarkSalmon"
        // }
        const setValues = () => {
            // querySelector('select') only selects first one
            // div.row>select ==> wrong
            // > == direct child, this is wrong bc select is in a div of the div.row (grandchild)
            // div.row select
            // SPACE == decsendent
            // let dropdowns = document.querySelectorAll('div.row select');
            // for(let i=0; i<dropdowns.length; i++)

            dropdowns.forEach((dropdown, index) => {
                for (let i = 0; i < 256; ++i) {
                    let option = document.createElement('option');
                    option.text = option.value = i
                    dropdown.appendChild(option)
                }
            });
        }

        const displayColor = (value) => {
            const style = ['bg-success','bg-warning','bg-danger']
            let table, tbody, tr
            let rgb = [];
            let hexdecimal = [];

            dropdowns.forEach(dropdown => rgb.push(Number(dropdown.value)));
            // rgb to hexdecimal
            // Number('123').toString(16);
            rgb.forEach(value => hexdecimal.push(value.toString(16).toUpperCase()));

            let data = []

            data.push(`(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
            data.push(`#${hexdecimal[0]}${hexdecimal[1]}${hexdecimal[2]}`)
            data.push(`#${hexdecimal[0]}${hexdecimal[1]}${hexdecimal[2]}`)

            table = document.getElementById("output")
            tbody = document.createElement("tbody")
            tr = document.createElement("tr")
            console.log(tr.classList)
            for (let i = 0; i < data.length; ++i) {
                let td = document.createElement("td")
                td.setAttribute("class",`text-center h2 ${style[i]}`)
                console.info(td.classList)
                if (i != data.length-1) {
                    let cell = document.createTextNode(data[i]);
                    td.appendChild(cell);
                }else {
                    td.setAttribute('class', 'rounded-pill');
                    td.style.backgroundColor = data[i];
                }
                tr.appendChild(td)
            }
            tbody.appendChild(tr)
            table.appendChild(tbody)
        }
    
        window.onload = () => {
            setCopyRightYear()
            setValues()
            document.querySelector('#change').onclick = changeBackgroundColor
            dropdowns.forEach(dropdown => dropdown.onchange = displayColor);
        }
    }
)()