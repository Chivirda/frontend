const legalEntity = './legalentity.json'
const pharmacies = './pharmacy.json'
const tbody = document.querySelector('tbody')
let legalEntityID = 0
    
function showEntities(entities) {
    
    console.log(entities);

    for (let i = 0; i < entities.length; i++) {
        const tr = document.createElement('tr')
        const name = document.createElement('td')
        const address = document.createElement('td')
        const city = document.createElement('td')
        const country = document.createElement('td')

        name.textContent = entities[i].legalEntityName
        address.textContent = entities[i].address1 + ' ' + entities[i].address2
        city.textContent = entities[i].city
        country.textContent = entities[i].country

        tr.appendChild(name)
        tr.appendChild(address)
        tr.appendChild(city)
        tr.appendChild(country)
        tr.setAttribute('data-id', entities[i].legalEntityID)
        tr.classList.add('row')
        tr.firstChild.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;&nbsp;')

        tbody.appendChild(tr)
        
    }    
}

function onTableClickHandler() {

    const rows = document.querySelectorAll('.row')

    for (let row of rows) {
        row.onclick = function() {
            this.classList.toggle('active')
            
            legalEntityID = this.dataset.id
            onSelectButtonHandler(pharmacies, legalEntityID)

        }
    }

}



function onSelectButtonHandler(pharmacies, legalEntityID) {
    console.log('Legal Entity ID:', legalEntityID);
    

    const selectButton = document.querySelector('.content__button')

    selectButton.addEventListener('click', () => {
        if (legalEntityID === 0 || legalEntityID === undefined) {
            return
        }

        fetch(pharmacies)
            .then(response => response.json())
            .then(pharmacy => showPharmacies(pharmacy))

    })

}

function showPharmacies(pharmacy, legalEntityID) {
    tbody.children.remove

    for (let i = 0; i < pharmacy.length; i++) {

        if (pharmacy.legalEntityID === legalEntityID) {
            const tr = document.createElement('tr')
            const name = document.createElement('td')
            const address = document.createElement('td')
            const city = document.createElement('td')
            const country = document.createElement('td')

            name.textContent = pharmacy[i].pharmaName
            address.textContent = pharmacy[i].address_1 + ' ' + pharmacy[i].address_2
            city.textContent = pharmacy[i].city
            country.textContent = pharmacy[i].country

            tr.appendChild(name)
            tr.appendChild(address)
            tr.appendChild(city)
            tr.appendChild(country)
            tr.setAttribute('data-id', pharmacy[i].pharmaID)
            tr.classList.add('row')
            tr.firstChild.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;&nbsp;')

            tbody.appendChild(tr)
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(legalEntity)
        .then(response => response.json())
        .then(entities => showEntities(entities))
        .then(() => onTableClickHandler())
    
})
