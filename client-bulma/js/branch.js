const url = 'http://localhost:3000/api/branch'

const getData = async () => {
    try {
        const response = await fetch(url)

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
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Actions');
        th.appendChild(col)

        tr.appendChild(th)

        thead.appendChild(tr)

        table.appendChild(thead)

        let tbody = document.createElement('tbody')

        for (var x in data) {

            let columns = Object.values(data[x]).length
            let row = Object.values(data[x])
            tr = document.createElement('tr')

            for (var i = 0; i < columns; i++) {
                var td = document.createElement('td')
                var cellContent = document.createTextNode(row[i])
                td.appendChild(cellContent)
                tr.appendChild(td)
            }

            var td = document.createElement('td')
            var actions = document.createElement('div')
            actions.classList.add('has-text-centered')
            actions.innerHTML += `<a href="#" id="edit-${row[0]}" class="pr-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg></a>`
            actions.innerHTML += `<a href="#" id="delete-${row[0]}"><svg xmlns="http://www.w3.org/2000/svg" width="25" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg></a>`
            td.appendChild(actions)
            tr.appendChild(td)

            tbody.appendChild(tr)
        }

        table.appendChild(tbody)

    } catch (error) {
        console.error(error)
    }
}

getData()

let addButton = document.getElementById('addBranch')

addButton.addEventListener('click', openModal);

let branchModal = document.getElementById('branchModal')

function openModal() {
    branchModal.classList.add('is-active')
}

let closeButton = document.getElementById('close')

closeButton.addEventListener('click', closeModal)

function closeModal() {
    branchModal.classList.remove('is-active')
}

let cancelButton = document.getElementById('cancel')

cancelButton.addEventListener('click', closeModal)

let saveButton = document.getElementById('save')

saveButton.addEventListener('click', saveData)

async function saveData() {
    try {
        var data = {
            address: document.getElementById('branch_address').value,
            city: document.getElementById('branch_city').value,
            name: document.getElementById('branch_name').value,
            state: document.getElementById('branch_state').value,
            zipCode: document.getElementById('branch_zipcode').value
        }

        const request = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        closeModal()

        if (request.ok) {
            document.getElementById('branch_address').value = '';
            document.getElementById('branch_city').value = '';
            document.getElementById('branch_name').value = '';
            document.getElementById('branch_state').value = '';
            document.getElementById('branch_zipcode').value = '';

            document.getElementById('notification').classList.remove('hidden')
            document.getElementById('notification').classList.add('is-info')
            document.getElementById('notification').classList.add('notification-style')
            document.getElementById('notification').classList.add('notification-animation')
            document.getElementById("notification").innerHTML = "Save changes!";
        } else {
            document.getElementById('notification').classList.remove('hidden')
            document.getElementById('notification').classList.add('is-danger')
            document.getElementById('notification').classList.add('notification-style')
            document.getElementById('notification').classList.add('notification-animation')
            document.getElementById("notification").innerHTML = "Can't save changes, try later.";
        }

    } catch (error) {
        console.error(error)
    }
}

let notification = document.getElementById('notification')

notification.addEventListener('animationend', closeNotification)

function closeNotification() {
    document.getElementById('notification').classList.remove('notification-style')
    document.getElementById('notification').classList.remove('notification-animation')
    document.getElementById('notification').classList.add('hidden')
}