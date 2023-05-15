/**
 * Turns a phonenumber like +4542240440 into +45 42 24 04 40
 * @param {*} number Phonenumber
 */
const formatPhonenumber = (number) => {
    const countryCode = number.slice(0, 3);
    const phonePart = number.slice(3);
    
    let i = 0;
    let result = [];
    while (i < phonePart.length) {
      result.push(phonePart.substring(i, i + 2));
      i += 2;
    }
  
    return countryCode + " " + result.join(" ");
  } 

export default formatPhonenumber;