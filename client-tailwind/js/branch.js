const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/branch')

        const data = await response.json()

        let table = document.getElementById('table')
        let thead = document.createElement('thead')
        let tr = document.createElement('tr');
        let th = document.createElement('th')
        let col = document.createTextNode('Branch Id');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Address');
        th.appendChild(col)
        th.classList.add('py-3')
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('City');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Name');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('State');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Zip Code');
        th.appendChild(col)

        tr.classList.add('bg-gray-300')
        tr.classList.add('border')
        tr.appendChild(th)

        thead.appendChild(tr)

        table.appendChild(thead)

        let tbody = document.createElement('tbody')

        for (var x in data) {

            let columns = Object.values(data[x]).length
            let row = Object.values(data[x])
            tr = document.createElement('tr')
            tr.classList.add('hover:bg-gray-100')
            tr.classList.add('border')
            for (var i = 0; i < columns; i++) {
                var td = document.createElement('td')
                var cellContent = document.createTextNode(row[i])
                td.appendChild(cellContent)
                td.classList.add('text-center')
                td.classList.add('py-3')
                tr.appendChild(td)
            }

            tbody.appendChild(tr)
        }

        table.appendChild(tbody)

    } catch (error) {
        console.error(error)
    }
}

getData()