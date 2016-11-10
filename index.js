
//constant templates for regular expressions processing...
//1st: check the whole line(regexp.test)
const urlRegTemplate = /^(((https?:)?(\/\/)?(www\.)?(\w+\.\w+\/))?|(\/\/)(\w+\.\w+\/)|(\w+\.\w+\/))@?\w+((\/\w+)?|([A-Za-z0-9 -_?=]+))$/;
//2nd: extract username in ordinary way
const matchForAccountName = /(https?:\/\/)?(www\.)?(\w+[^\/]{0,2}\w+\.\w+[^\/]{0,2}\w+?\/)?(\w+(\.\w+)?)/;
//3rd: extract username if string contains @-character
const matchForName = /(@\w+(\.\w+)?)/;

export default class UrlParser {
  constructor(input_string) {
    this.inputString = input_string;
    //prepare to parse
    this.testResult = urlRegTemplate.test(this.inputString);
  }
  //just parses input String into an array and gets account name
  parseInputStr() {
    if (!this.inputString.match(matchForName)) {
      return this.inputString.match(matchForAccountName)[4];
    }
    else {
      return this.inputString.match(matchForName)[1].slice(1);
    }
  }

  parse() {
    //return @username
    return this.testResult == true ? `@${this.parseInputStr()}` : `Invalid Input`;
  }
}

 // tests:
 // const testArray = [
 // 'https://telegram.me/skillbranch',
 // 'https://Telegram.me/skillbranch',
 // 'https://Telegram.mE/skillbranch',
 // 'https://Telegram.mE/skillBranch',
 // 'https://Telegram.mE/sKiLlBranch',
 // 'https://Telegram.mE/sKiLlBranch',
 // '//telegram.me/skillbranch',
 // 'skillbranch',
 // '@skillbranch',
 // 'https://vk.com/skillbranch',
 // 'http://vk.com/skillbranch',
 // 'vk.com/skillbranch',
 // 'vk.com/skillbranch?w=wall-435342535345_345345',
 // 'vk.com/skillbranch123/profile',
 // 'http://www.vk.com/durov',
 // 'http://www.vk.com/pavel.durov',
 // 'http://xn--80adtgbbrh1bc.xn--p1ai/pavel.durov',
 // 'https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750'
 // ];
 //
 // testArray.forEach((item)=>{let task = new UrlParser(item);console.log(task.parse());});
 //

