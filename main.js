function reverseStr(str) {
  var charList = str.split("");
  var reverListChar = charList.reverse();
  var reverseStr = reverListChar.join("");
  return reverseStr;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  if (str === reverse) {
    return true;
  } else {
    return false;
  }
}

function convertDateToString(date) {
  var dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfdateFormats = getAllDateFormats(date);
  var flag = false;

  for (i = 0; i < listOfdateFormats.length; i++) {
    if (isPalindrome(listOfdateFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month += 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month += 1;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month += 1;
    }
  }

  if (month > 12) {
    month = 1;
    year += 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var count = 0;
  var nextDate = getNextDate(date);

  while (1) {
    count += 1;
    if (checkPalindromeForAllDateFormats(nextDate)) {
      break;
    } else {
      nextDate = getNextDate(nextDate);
    }
  }
  return [count, nextDate];
}

const birthdate = document.querySelector("#date-of-birth");
const checkButton = document.querySelector("#btn");
const outputBox = document.querySelector("#output-box");

checkButton.addEventListener("click", clickHandler);

function clickHandler() {
  var bdayStr = birthdate.value;

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      outputBox.innerHTML = "Yay your birthday is a Palindrome";
    } else {
      var [count, nextDate] = getNextPalindromeDate(date);
      outputBox.innerHTML = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days!`;
    }
  }
}
