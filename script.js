// ========================================
// PASSWORD GENERATOR
// ========================================


// 1. Get elements from the HTML page

const passwordInput =
    document.getElementById("password");

const lengthInput =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercase =
    document.getElementById("uppercase");

const lowercase =
    document.getElementById("lowercase");

const numbers =
    document.getElementById("numbers");

const symbols =
    document.getElementById("symbols");

const generateButton =
    document.getElementById("generateButton");

const copyButton =
    document.getElementById("copyButton");

const message =
    document.getElementById("message");

const strengthText =
    document.getElementById("strengthText");

const strengthFill =
    document.getElementById("strengthFill");


// ========================================
// 2. Character collections
// ========================================

const characterSets = {

    uppercase:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    lowercase:
        "abcdefghijklmnopqrstuvwxyz",

    numbers:
        "0123456789",

    symbols:
        "!@#$%^&*()_+-=[]{}|;:,.<>?"

};


// ========================================
// 3. Get the characters selected by the user
// ========================================

function getSelectedCharacters() {

    let selectedCharacters = "";


    if (uppercase.checked) {

        selectedCharacters +=
            characterSets.uppercase;

    }


    if (lowercase.checked) {

        selectedCharacters +=
            characterSets.lowercase;

    }


    if (numbers.checked) {

        selectedCharacters +=
            characterSets.numbers;

    }


    if (symbols.checked) {

        selectedCharacters +=
            characterSets.symbols;

    }


    return selectedCharacters;
}


// ========================================
// 4. Generate the password
// ========================================

function generatePassword() {

    const length =
        Number(lengthInput.value);

    const characters =
        getSelectedCharacters();


    // Check whether the user selected
    // at least one character type

    if (characters.length === 0) {

        passwordInput.value = "";

        message.textContent =
            "Please select at least one option.";

        message.style.color =
            "#dc2626";

        return;
    }


    let password = "";


    // Generate random characters

    for (
        let i = 0;
        i < length;
        i++
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );


        password +=
            characters[randomIndex];

    }


    // Display the password

    passwordInput.value =
        password;


    message.textContent =
        "Password generated successfully.";

    message.style.color =
        "#16a34a";


    updateStrength();
}


// ========================================
// 5. Copy the password
// ========================================

function copyPassword() {

    if (passwordInput.value === "") {

        message.textContent =
            "Generate a password first.";

        message.style.color =
            "#dc2626";

        return;
    }


    navigator.clipboard.writeText(
        passwordInput.value
    );


    message.textContent =
        "Password copied to clipboard.";

    message.style.color =
        "#16a34a";
}


// ========================================
// 6. Update password length
// ========================================

lengthInput.addEventListener(
    "input",
    function () {

        lengthValue.textContent =
            lengthInput.value;

        updateStrength();

    }
);


// ========================================
// 7. Check password strength
// ========================================

function updateStrength() {

    const length =
        Number(lengthInput.value);


    let selectedOptions = 0;


    if (uppercase.checked) {

        selectedOptions++;

    }


    if (lowercase.checked) {

        selectedOptions++;

    }


    if (numbers.checked) {

        selectedOptions++;

    }


    if (symbols.checked) {

        selectedOptions++;

    }


    let score = 0;


    // Check password length

    if (length >= 8) {

        score++;

    }


    if (length >= 12) {

        score++;

    }


    if (length >= 16) {

        score++;

    }


    // Check character variety

    if (selectedOptions >= 2) {

        score++;

    }


    if (selectedOptions >= 4) {

        score++;

    }


    // Display strength

    if (score <= 2) {

        strengthText.textContent =
            "Weak";

        strengthFill.style.width =
            "30%";

        strengthFill.style.background =
            "#dc2626";

    }

    else if (score <= 4) {

        strengthText.textContent =
            "Medium";

        strengthFill.style.width =
            "60%";

        strengthFill.style.background =
            "#f59e0b";

    }

    else {

        strengthText.textContent =
            "Strong";

        strengthFill.style.width =
            "100%";

        strengthFill.style.background =
            "#16a34a";

    }

}


// ========================================
// 8. Connect the buttons
// ========================================

generateButton.addEventListener(
    "click",
    generatePassword
);


copyButton.addEventListener(
    "click",
    copyPassword
);


// ========================================
// 9. Update strength when options change
// ========================================

uppercase.addEventListener(
    "change",
    updateStrength
);

lowercase.addEventListener(
    "change",
    updateStrength
);

numbers.addEventListener(
    "change",
    updateStrength
);

symbols.addEventListener(
    "change",
    updateStrength
);


// ========================================
// 10. Generate the first password
// ========================================

generatePassword();