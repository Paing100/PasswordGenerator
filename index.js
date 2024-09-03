

const button = document.getElementById('button');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numberCheckbox = document.getElementById('numbers');
const symbolCheckbox = document.getElementById('symbols');
const passwordOutput = document.getElementById('password');
const lengthInput = document.getElementById('length');
const lengthRange = document.getElementById('lengthRange');

const imageButton = document.getElementById("copy");
const message = document.getElementById('message');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47).concat(
                            arrayFromLowToHigh(58, 64)).concat(
                            arrayFromLowToHigh(91,96).concat(
                            arrayFromLowToHigh(123,126)
                        ));

lengthInput.addEventListener('input', syncCharacter);
lengthRange.addEventListener('input', syncCharacter);

function syncCharacter(e){
     const value = e.target.value;
     lengthInput.value = value;
     lengthtRange.value = value;
}

function generatePassword(){
    try{
        message.textContent = "";

        const includeLowerCase = lowercaseCheckbox.checked;
        const includeUpperCase = uppercaseCheckbox.checked;
        const includeNumbers = numberCheckbox.checked;
        const includeSymbols = symbolCheckbox.checked;
        const length = parseInt(lengthInput.value); 

        let allowChars = [];
        let password = [];
        if (includeLowerCase) allowChars = allowChars.concat(LOWERCASE_CHAR_CODES);
        if (includeUpperCase) allowChars = allowChars.concat(UPPERCASE_CHAR_CODES);
        if (includeNumbers) allowChars = allowChars.concat(NUMBER_CHAR_CODES);
        if (includeSymbols) allowChars = allowChars.concat(SYMBOL_CHAR_CODES);

        if (isNaN(length) || length <= 4){
            message.textContent = '(password length must be at least 5)';
            return;
        }

        if (allowChars.length === 0){
            message.textContent = '(At least 1 set of character needs to be selected)';
            return;
        }
        
        for(let i = 0; i < length; i++){
            const randomIndex = allowChars[Math.floor(Math.random() * allowChars.length)];
            password.push(String.fromCharCode(randomIndex));
        }

        console.log(password);
        passwordOutput.value = password.join('');    
    }catch(error){
        console.error(error);
    }
}

imageButton.addEventListener('click', (e) => {
    const password = passwordOutput.value;
    if (passwordOutput.value.length === 0){
        return;
    }
    e.preventDefault();

    passwordOutput.select();  
    navigator.clipboard.writeText(passwordOutput.value);
    passwordOutput.value = password;
});


function arrayFromLowToHigh(low, high){
    const result = [];
    for(let i = low; i <= high; i++){
        result.push(i);
    }
    return result;
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    generatePassword();
});


