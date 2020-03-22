const requestUrl = './legalentity.json'
const tbody = document.querySelector('tbody')
const request = new XMLHttpRequest()

request.open('GET', requestUrl)
request.responseType = 'json'
request.send()

request.onload = () => {
    const entities = request.response
    showEntities(entities)
    onTableClickHandler()
}

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
        tr.firstChild.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp; ')

        tbody.appendChild(tr)
        
    }    
}

function onTableClickHandler() {
    const rows = document.querySelectorAll('.row')

    for (let row of rows) {
        row.onclick = function() {
            this.classList.toggle('active')
            // this.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i>')
            // this.firstChild.insertAdjacentHTML('afterbegin', '<i class="fa fa-check" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp; ')
            
        }
    }
    
    
    
        
}