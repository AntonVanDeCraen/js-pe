const voornaam = document.getElementById('voornaam')
const naam = document.getElementById('naam')
const gebruikersnaam = document.getElementById('gebruikersnaam')
const adres = document.getElementById('adres')
const land = document.getElementById('land')
const provincie = document.getElementById('provincie')
const wachtwoord = document.getElementById('wachtwoord')
const herhalendwachtwoord = document.getElementById('herhalendwachtwoord')
const emailadres = document.getElementById('emailadres')
const formulier = document.getElementById('formulier')
const postcode = document.getElementById('postcode')
const voorwaarden = document.getElementById('voorwaarden')
const error = document.getElementById('error')
const betaling = document.getElementsByName('betaling')
const errormessage = document.getElementById('errormessage')
let errormessages = []

function checkEmptyField(veld, errormessage) {
    if (veld.value === '' || veld.value == null) {
        errormessages.push(errormessage)
    }

}


function validateEmail(emailadres) {
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailadres.value.match(re)) {
        return (true)
    }

    return (false)
}

function checkPC(veld) {
    if (postcode.value < 1000 || postcode.value > 10000) {
        errormessages.push("De waarde van postcode moet tussen 1000 en 9999 liggen")
    }
}

function validatePayment(){
    for (var i = 0; i < betaling.length; i++)
    {
        if (betaling[i].checked)
        {
            return betaling[i].value;
        }

    }
    errormessages.push("geen betalingswijze geselecteerd")
}



formulier.addEventListener("submit", function (event) {
    checkEmptyField(voornaam, 'Het veld ' + voornaam.id + ' is vereist')
    checkEmptyField(naam, 'Het veld ' + naam.id + ' is vereist')
    checkEmptyField(gebruikersnaam, 'Het veld ' + gebruikersnaam.id + ' is vereist')
    checkEmptyField(adres, 'Het veld ' + adres.id + ' is vereist')
    checkEmptyField(land, 'Het veld ' + land.id + ' is vereist')
    checkEmptyField(provincie, 'Het veld ' + provincie.id + ' is vereist')
    checkEmptyField(postcode, 'Het veld ' + postcode.id + ' is vereist')
    if (validateEmail(emailadres) == false) {
        errormessages.push("Je hebt een ongeldig email adres ingevoerd!")
    }

    checkEmptyField(wachtwoord, 'Het veld ' + wachtwoord.id + ' is vereist')
    checkEmptyField(herhalendwachtwoord, 'Het veld ' + herhalendwachtwoord.id + ' is vereist')
    if (wachtwoord.value.length < 8 || herhalendwachtwoord.value.length < 8) {

        errormessages.push("Wachtwoord moet langer zijn dan 7 karakters")
    }
    if (wachtwoord.value != herhalendwachtwoord.value) {
        errormessages.push("Wachtwoorden komen niet overeen")
    }

    checkPC(postcode)

    if (voorwaarden.checked == false) {
        errormessages.push("de algemene voorwaarden zijn nog niet geaccepteerd")
    }

    

    if (errormessages.length > 0) {
        //https://www.w3schools.com/jsref/event_preventdefault.asp
        document.getElementById('geregistreerd').className = "d-none"
        error.className += "d-block"
        errormessage.innerText = errormessages.join('\n')
        errormessages = []
    }
    else {
        document.getElementById('geregistreerd').className += "d-block"
        error.className = "d-none"
    }

    
    document.getElementById("betalingswijze").innerText = "Je betalingswijze is " + validatePayment()

    event.preventDefault()
});


