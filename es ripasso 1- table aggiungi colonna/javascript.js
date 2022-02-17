window.addEventListener('load', () => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "data.json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var obj = JSON.parse(this.responseText)
            main(obj)

        } else {
            console.log("Error: " + xhr.status);
        }
    }
    xhr.send();
});

main = (obj) => {
    creaTabella(obj)
}

creaTabella = (obj) => {
    let table = document.createElement("table")
    ordini.appendChild(table)
    inserisciIntestazione(table, obj)
    for (key in obj)
        inserisciRighe(key, table, obj)
}

inserisciIntestazione = (table, obj) => {
    let row = document.createElement("tr"),
        titleTot = document.createElement("th")

    table.appendChild(row)
    for (i in obj[0])
        if (obj[0].hasOwnProperty(i)) {
            let tHead = document.createElement("th")
            table.appendChild(tHead)
            tHead.innerHTML = i
        }
    table.appendChild(titleTot).innerText = "totale"
    titleTot.style.display = "none"

    add.addEventListener("click",addElement = ()=>{
        titleTot.style.display="block"
    })
    remove.addEventListener("click",removeElement = ()=>{
        titleTot.style.display="none"
    })
}

inserisciRighe = (key, table, obj) => {
    let tot = 0,
        row = document.createElement("tr"),
        ul = document.createElement("ul"),
        cellTot = document.createElement("td")

    table.appendChild(row)
    for (j in obj[key]) {
        let cell = document.createElement("td")
        row.appendChild(cell)
        row.appendChild(cellTot)
        if (Array.isArray(obj[key][j])) {
            for (i in obj[key][j]) {
                let li = document.createElement("li"),
                    count = 0
                cell.appendChild(ul)
                ul.appendChild(li)
                for (u in obj[key][j][i]) {
                    count++
                    switch (count) {
                        case 1: {
                            li.textContent += obj[key][j][i][u] + ": "
                            break
                        }
                        case 2: {
                            li.textContent += obj[key][j][i][u] + "; "
                            break
                        }

                        case 3: {
                            li.textContent += "quantità: " + obj[key][j][i][u] + "; "
                            break
                        }

                        case 4: {
                            li.textContent += "prezzo totale: " + obj[key][j][i][u] + " "
                            tot+=obj[key][j][i][u]
                            break
                        }

                        default: {
                            li.textContent += " " + obj[key][j][i][u]
                            break
                        }

                    }
                }
            }
        } else cell.innerText = obj[key][j]
    }
    cellTot.style.display="none"
    //cellTot.style.position="static"
    cellTot.innerHTML= tot

    add.addEventListener("click",addElement = ()=>{
        cellTot.style.display="block"
    })
    remove.addEventListener("click",removeElement = ()=>{
        cellTot.style.display="none"
    })
}
