// calling variables link to ids in HTML or dom element
const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");

const randomFunc = {
  lower: getRandomlower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// generate event of clicking check box or length of password
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  passwordEl.innerHTML = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbols
  );
});

//generate password function
function generatePassword(length, lower, upper, number, symbol) {
  let genPassword = "";

  const typeCount = lower + upper + number + symbol;

  /* console.log("typeCount:", typeCount); */

  // filter out the uncheck types
  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  /* console.log("typeArr: ", typeArr); */

  if (typeCount === 0) {
    return "";
  }


  // create a looping for the length of password for each selectted type and added final password return

  for (let i = 0; i < length; i += typeCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      
   /*    console.log("funcName: ", funcName); */

      genPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = genPassword.slice(0, length);

  return finalPassword;

}


// functioning random letter & number, symbols using Sting.fromCharCode
function getRandomlower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!#$%&*(){}[]?@^~";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
