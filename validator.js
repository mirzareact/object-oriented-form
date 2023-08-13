class Validator{
    constructor(config){
        this.elementsConfig = config
        this.errors = {}

        this.generateErrorObject()
        this.inputListener()
    }
    generateErrorObject(){

        for(let field  in this.elementsConfig){
            this.errors[field] = []
        }
    }
    inputListener(){
        let inputSelector = this.elementsConfig

        for(let field in inputSelector){
            let el = document.querySelector(`input[name="${field}"]`)
            el.addEventListener("input", this.validate.bind(this))
        }
    }

    validate(e){
        let elFields = this.elementsConfig

        let field = e.target

        let fieldName = field.getAttribute("name")
        let fieldValue = field.value

        this.errors[fieldName] = []

        if(elFields[fieldName].required){
            if(fieldValue === ""){
                this.errors[FieldName].push("Field is empty")
            }
        }
        if(elFields[fieldName].email){
            if(!this.validateEmail(fieldValue)){
                this.errors[fieldName].push("Email is incorrect")
            }
        }

        if (fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength){
            this.errors[fieldName].push(`The field must have the minimum of ${elFields[fieldName].minlength} characters and the max of ${elFields[fieldName].maxlength} characters`)
        }

        if (elFields[fieldName].matching){
            let matchingEL = document.querySelector(`input[name="${elFields[fieldName].matching}"]`)

            if (fieldValue !== matchingEL.value ){
                this.errors[fieldName].push("Password are not matching")
            }
            if(this.errors[fieldName].length === 0){
                this.errors[fieldName] = []
                this.errors[elFields[fieldName].matching] = []
            }
        }
        this.populateErrors(this.errors)

    }

    populateErrors(errors){
        for(const elem of document.querySelectorAll("ul")){
            elem.remove()
        }

        for(let key of Object.keys(errors)){
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement
            let errorsElement = document.createElement("ul")
            parentElement.appendChild(errorsElement)

            errors[key].forEach(error => {
                let li = document.createElement("li")
                li.innerText = error

                errorsElement.appendChild(li)
            })
        }
    }

    validateEmail(email){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true
        } else{
            return false
        }

    }
}