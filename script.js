let config = {
    "ime_prezime": {
        required: true,
        minlength: 3,
        maxlength: 50
    },
    "korisnicko_ime":{
        required: true,
        minlength: 5,
        maxlength: 50
    },
    "email": {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    "broj_telefona":{
        minlength: 9,
        maxlength: 50
    },
    "lozinka": {
        required: true,
        minlength: 8,
        maxlength: 25,
        matching: "ponovi_lozinku"
    },
    "ponovi_lozinku": {
        required: true,
        minlength: 8,
        maxlength: 25,
        matching: "lozinka"
    }
}
console.log(config);

let validator = new Validator(config)