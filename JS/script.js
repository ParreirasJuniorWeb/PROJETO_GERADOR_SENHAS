// Seleção de Elementos no Objeto DOM 
// para manipulação via JavaScript

const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades 

const openCloseGeneratorButton = document.querySelector("#open-generate-password");

const generatorPasswordContainer = document.querySelector("#generate-options");

const lengthInput = document.querySelector("#length");

const lettersInput = document.querySelector("#letters");

const numbersInput = document.querySelector("#numbers");

const symbolsInput = document.querySelector("#symbols");

const copyPasswordButton = document.querySelector("#copy-password")

// Funções 

// Letras, Números e Símbolos para formar uma senha

const getLetterLowerCase = () => {

    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
    );
};

const getLetterUpperrCase = () => {

    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 65
    );
};

const getNumber = () => {
    
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {

    const Symbols = "(){}[]=<>/,.!@#$%&*+-";

    const indexRandom = Math.floor(
        Math.random() * Symbols.length
    );
    
    return Symbols[indexRandom];

};

const generatePassword = (
    getLetterLowerCase, 
    getLetterUpperrCase,
    getNumber, 
    getSymbol
) => {

    let password = "";

    // Segunda versão

    const passwordLength = +lengthInput.value;

    const generators = [];

    if(lettersInput.checked) {

        generators.push(
            getLetterLowerCase,
            getLetterUpperrCase
        );
    }

    if(numbersInput.checked) {

        generators.push(getNumber);
    }

    if(symbolsInput.checked) {

        generators.push(getSymbol);
    }

    // Validação dos campos marcados pelo usuário 

    if(generators.length === 0) {
        return  Toastify({
            text: "Marque alguma das opções para gerar sua senha.",
            duration: 3000,
            destination: "#",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #e53c3cff, #df8f26ff)",
            }
            }).showToast();;
    }

    // Loop que gera a nova senha
    for(i = 0; i < passwordLength; i = i + generators.length) {

        generators.forEach(() => {

            const randomValue = generators[
                Math.floor(
                    Math.random() * generators.length
                )
            ]();

            password += randomValue;
        });
    }

    password = password.slice(0, passwordLength);
    // .slice() para remover os últimos elementos do Array/lista

    generatedPasswordElement.style.display = "block";
    
    generatedPasswordElement.querySelector("h4").textContent = password;

};

// Eventos 

generatePasswordButton.addEventListener("click", () => {

    generatePassword(
        getLetterLowerCase,
        getLetterUpperrCase,
        getNumber,
        getSymbol
    );
    
});

openCloseGeneratorButton.addEventListener("click", () => {

    setTimeout(() => {
        generatorPasswordContainer.classList.toggle("hide");
    }, 200);

});

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {

        copyPasswordButton.innerText = "Senha copiada!";

        setTimeout(() => {

            copyPasswordButton.innerText = "Copiar senha";

        }, 1000);
    });
});