const legalEntity = './legalentity.json'
const pharmacies = './pharmacy.json'

const tbody = document.querySelector('tbody')
const contentHead = document.querySelector('.content__head')
const firstColumnName = document.querySelector('#firstColumnName')
const FIRST_STEP_HEADER = '1: Select Legal Entity'
const FIRST_COLUMN_NAME_STEP_1 = 'Legal Entity'
const divContent = document.querySelector('.content')

document.addEventListener('DOMContentLoaded', () => {
    contentHead.innerHTML = FIRST_STEP_HEADER

    fetch(legalEntity)
        .then(response => response.json())
        .then(entities => showEntities(entities))
        .then(() => onEntitiesClickHandler())
    
})
    
function showEntities(entities) {
    firstColumnName.innerHTML = FIRST_COLUMN_NAME_STEP_1
    
    for (let entity of entities) {
        const tr = document.createElement('tr')
        const name = document.createElement('td')
        const address = document.createElement('td')
        const city = document.createElement('td')
        const country = document.createElement('td')

        name.textContent = entity.legalEntityName
        address.textContent = entity.address1 + ' ' + entity.address2
        city.textContent = entity.city
        country.textContent = entity.country

        tr.append(name)
        tr.append(address)
        tr.append(city)
        tr.append(country)
        tr.setAttribute('data-id', entity.legalEntityID)
        tr.setAttribute('data-name', entity.legalEntityName)
        tr.classList.add('row')
        tr.firstChild.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;&nbsp;')

        tbody.append(tr)
        
    }    
}

function onEntitiesClickHandler() {

    const rows = document.querySelectorAll('.row')

    for (let row of rows) {
        row.onclick = function() {
            for (let children of rows) {
                children.classList.remove('active')
            }
            this.classList.toggle('active')
            
            const legalEntityID = +this.dataset.id
            const legalEntityName = this.dataset.name
            selectEntity(pharmacies, legalEntityID, legalEntityName)

        }
    }

}

function onPharmacyClickHandler() {

    const rows = document.querySelectorAll('.row')
    
    for (let row of rows) {
        row.onclick = function() {
            this.classList.toggle('active')
        }
    }
    
    choosePharmacies()
}

function choosePharmacies() {
    const selectButton = document.querySelector('.content__button')
    
    selectButton.addEventListener('click', () => {
        const activeRows = document.querySelectorAll('.row.active')

        for (let row of activeRows) {
            console.log('Active rows:', row.dataset.id);
        }
    })
}

function selectEntity(pharmacies, legalEntityID, legalEntityName) {
    const SECOND_STEP_HEADER = '2: Select Pharmacies'
    const selectButton = document.querySelector('.content__button')
    const label = document.querySelector('#entityName')

    selectButton.addEventListener('click', () => {
        const backButton = document.querySelector('.content__button-back')

        if (legalEntityID === 0 || legalEntityID === undefined) {
            return
        }

        contentHead.innerHTML = SECOND_STEP_HEADER
        selectButton.innerHTML = 'Enter Contract Terms'
        fetch(pharmacies)
            .then(response => response.json())
            .then(pharmacy => showPharmacies(pharmacy, legalEntityID))
            .then(() => onPharmacyClickHandler())
        
        label.innerHTML = `for ${legalEntityName}`
        if (!backButton) {
            addBackButton()
        }
    })

}

function showPharmacies(pharmacy, legalEntityID) {
    FIRST_COLUMN_NAME_STEP_2 = 'Pharmacy'
    firstColumnName.innerHTML = FIRST_COLUMN_NAME_STEP_2
    tbody.innerHTML = ''
    
    for (let pharm of pharmacy) {

        if (pharm.legalEntityID === legalEntityID) {
            const tr = document.createElement('tr')
            const name = document.createElement('td')
            const address = document.createElement('td')
            const city = document.createElement('td')
            const country = document.createElement('td')

            name.textContent = pharm.pharmaName
            address.textContent = pharm.address_1 + ' ' + pharm.address_2
            city.textContent = pharm.city
            country.textContent = pharm.country

            tr.append(name)
            tr.append(address)
            tr.append(city)
            tr.append(country)
            tr.setAttribute('data-id', pharm.pharmaID)
            tr.classList.add('row')
            tr.firstChild.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;&nbsp;')
            
            tbody.append(tr)
        }
    }

}

function addBackButton() {
    const backButton = document.createElement('button')
    backButton.classList.add('content__button-back')
    backButton.innerText = 'Back'

    divContent.append(backButton)
}


