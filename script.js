"use strict"
const range = document.getElementById("change-bckg-color");

const secTwo = document.querySelector(".sec_two");
const screen = document.querySelector("#screen");

const theme = document.getElementById("theme");
const screenBackground = document.getElementById("screen-background");

// const mineNumber = document.querySelector("[num]");
// console.log('mineNumber: ', mineNumber);

// const firstTheme = () =>{
//      // change HTML background
//      let firstHtmlClass = htmlBackground.classList[0];
//      htmlBackground.classList.remove(firstHtmlClass);
//      htmlBackground.classList.add("second-theme-html-background");
// }
// const secondTheme = () => {
//       // change HTML background
//       let firstHtmlClass = htmlBackground.classList[0];
//       htmlBackground.classList.remove(firstHtmlClass);
//       htmlBackground.classList.add("second-theme-html-background");

//       // change SCREEN background
//       let firstScreenClass = screenBackground.classList[0];
//       screenBackground.classList.remove(firstScreenClass);
//       screenBackground.classList.add("second-theme-screen-background");
      
//       // change EQUAL buttons background
//       let firstEqualClass = screenBackground.classList[0];
//       equal.classList.remove(firstEqualClass);
//       equal.classList.add("second-theme-equal-background");
      
//       // change DELETE and RESET buttons background
//       let firstDeleteClass = deleteButton.classList[0];
//       const allFirstDeleteClass = document.querySelectorAll("."+firstDeleteClass)
//       allFirstDeleteClass.forEach(element => {
//           let replacedClassList = element.className.replace(firstDeleteClass, 'second-theme-del-reset-background')
//           element.className = replacedClassList;
          
//       });

//       // change RANGE and KEYBOARD background
//       let firstRangeClass = range.classList[0];
//       const allFirstRangeClass = document.querySelectorAll("." + firstRangeClass);
//       allFirstRangeClass.forEach(element => {
//           let replacedClassList = element.className.replace(firstRangeClass, 'second-theme-range_keyboard-background')
//           element.className = replacedClassList;
//       });

//       // change WHITE buttons background
//       let firstWhiteButtonClass = whiteButton.classList[0];
//       const allFirstWhiteButtonClass = document.querySelectorAll("." + firstWhiteButtonClass);
//       allFirstWhiteButtonClass.forEach(element => {
//           let replacedClassList = element.className.replace(firstWhiteButtonClass, 'second-theme-white-button-background')
//           element.className = replacedClassList;
//       });
      
//       // change Black Colors 
//       let firstBlackColorClass = blackColor.classList[1];
//       const allFirstBlackColorClass = document.querySelectorAll("." + firstBlackColorClass);

//       allFirstBlackColorClass.forEach(element => {
//           let replacedClassList = element.className.replace(firstBlackColorClass, 'second-theme-black-color')
//           element.className = replacedClassList;
//       });
//       // change Helper Black Colors for up side of keyboard
//       let firstHelperBlackColorClass = helperBlackColor.classList[0];
//       const allHelperBlackColorClass = document.querySelectorAll("." + firstHelperBlackColorClass);


//       allHelperBlackColorClass.forEach(element => {
//           let replacedHelperClassList = element.className.replace(firstHelperBlackColorClass, 'helper-black-color')
//           element.className = replacedHelperClassList;
//       });
// }
range.addEventListener("input", () => {
    if(range.value == "0"){
        // firstTheme();
        theme.href = 'first-theme-style.css'
    }else if(range.value == "30"){
        // secondTheme();
        theme.href = 'second-theme-style .css'
    }else if(range.value == "60"){
        theme.href = 'third-theme-style.css'
    }
})

let num = "";
let minusStart = "";
let result = "";

// Comma separation logic for whole and fractional numbers.
const formatNumberWithCommas = (num) => {
    const [integerPart, decimalPart] = num.toString().split(".");
    // Format the integer part with commas every three digits from the beginning
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // If there's a decimal part, concatenate it with the formatted integer part
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}
//  RESET
const reset = () =>{
    while (screenBackground.hasChildNodes()) {
        screenBackground.removeChild(screenBackground.firstChild);
      }
}


secTwo.addEventListener("click", event => {
    if(screenBackground.getAttribute("reset") == "reseted" && event.target.textContent >= 0){
        reset();
        screenBackground.removeAttribute('reset');
        result = "";
    }else{
        //When after equality we want to perform mathematical operations on the obtained result.
        screenBackground.removeAttribute('reset');
        result = "";
    }
    if(event.target.classList[1] != "sec_two"){
        if(screenBackground.lastElementChild == null && event.target.textContent == "-"){
            let createdSpan = document.createElement("span");
            createdSpan.setAttribute("arithmetic", "operator");
            createdSpan.textContent = event.target.textContent;
            screenBackground.appendChild(createdSpan);
        }
        if(event.target.getAttribute("num") == "mine-num"){
            // To create a new span after addition, subtraction, division or multiplication.
            if(screenBackground.lastElementChild == null ||
               screenBackground.lastElementChild.textContent == "+" ||
               screenBackground.lastElementChild.textContent == "-" ||
               screenBackground.lastElementChild.textContent == "x" || 
               screenBackground.lastElementChild.textContent == "/"){
                if(event.target.textContent != "."){
                    let createdSpan = document.createElement("span");
                        createdSpan.setAttribute("num", "added-num");
                        createdSpan.textContent = event.target.textContent;
                        screenBackground.appendChild(createdSpan);
                        num = event.target.textContent;
                    }
                }else{
                    // If a point is clicked, it will appear on the screen.
                    if(event.target.textContent == "."){
                        // If a dot is already written or an arithmetic operator is written, nothing should happen, do not write a dot.
                        if(screenBackground.lastElementChild.getAttribute("arithmetic") == "operator" || screenBackground.lastElementChild.getAttribute("point") == "pointed"){
                            // continue;
                        }else{
                        num += event.target.textContent;
                        // I add an ID called Closed to remember the element that ends with a dot, because the arithmetic operator cannot be written after the dot.
                        screenBackground.lastElementChild.id = "closed"
                        // I add an attribute named "pointed" to mark the element in which a point is used, so that the point cannot be used twice.
                        screenBackground.lastElementChild.setAttribute("point", "pointed");
                        screenBackground.lastElementChild.textContent = num;
                    }
                }else{
                    num += event.target.textContent;
                    screenBackground.lastElementChild.removeAttribute('id');
                    screenBackground.lastElementChild.textContent = formatNumberWithCommas(num);
                }
            }
            
        }
        // I check whether the element has an id named "closed" (that is, whether the text of the element ends with a dot).
        if(screenBackground.lastElementChild.id != "closed"){
            // If the arithmetic operator is clicked according to the logic of adding and replacing the arithmetic operator, the one that was clicked last will remain.
            if(screenBackground.lastElementChild.getAttribute("num") == "added-num" || screenBackground.lastElementChild.getAttribute("arithmetic") == "operator"){
                if(event.target.textContent == "-" ||
                   event.target.textContent == "+" ||
                   event.target.textContent == "x" || 
                   event.target.textContent == "/"){
                    if(screenBackground.lastElementChild.textContent == "+" || 
                       screenBackground.lastElementChild.textContent == "-" || 
                       screenBackground.lastElementChild.textContent == "x" ||
                       screenBackground.lastElementChild.textContent == "/" ){
                        screenBackground.lastElementChild.textContent = event.target.textContent;
                    }else{
                        let createdSpan = document.createElement("span");
                        createdSpan.className = "test";
                        createdSpan.textContent = event.target.textContent;
                        createdSpan.setAttribute("arithmetic", "operator");
                        // I mark the span element with the "multiplicationed" attribute in Rommel's text content X (multiplication) because I can easily find the time of equality and replace it with the * operator.
                        if(event.target.textContent == "x"){
                            createdSpan.setAttribute("multiplication", "multiplicationed");
                        }
                        screenBackground.appendChild(createdSpan);
                    }
                }
            }
        }
        // DEL When the delete button is clicked
        if(event.target.textContent == "DEL"){
            if(screenBackground.lastElementChild.getAttribute("num") == "added-num"){
                if(screenBackground.lastElementChild.textContent.length > 1){
                    num = screenBackground.lastElementChild.textContent;
                    num = num.slice(0, -1);
                    screenBackground.lastElementChild.textContent = num;
                }else if(screenBackground.lastElementChild.textContent.length == 1){
                    screenBackground.lastElementChild.remove();
                }
                if(screenBackground.lastElementChild.textContent[screenBackground.lastElementChild.textContent.length-1] == ","){
                    num = screenBackground.lastElementChild.textContent;
                    num = num.slice(0, -1);
                    screenBackground.lastElementChild.textContent = num;  
                }
            }
            else if(screenBackground.lastElementChild.getAttribute("arithmetic") == "operator"){
                screenBackground.lastElementChild.remove();
            }
        }
        // RESET Button
        if(event.target.textContent == "RESET"){
            reset();
        }
        // equal (=) button
        if(event.target.textContent == "="){
            for(let i = 0; i < screenBackground.children.length; i++){
                if(screenBackground.children[i].textContent == "x"){
                    result += "*";
                }else{
                    result += screenBackground.children[i].textContent;
                }
            }
            reset();
            let createdSpan = document.createElement("span");
            let isFloat = formatNumberWithCommas(math.evaluate(result.replaceAll(",","")));
            if(isFloat.indexOf(".") != -1){
                createdSpan.setAttribute("point", "pointed");
                createdSpan.textContent = isFloat;
            }else{
                createdSpan.textContent = isFloat;
            }
            createdSpan.setAttribute("num", "added-num");
            screenBackground.appendChild(createdSpan);
            // Automatically delete everything after equalizing.
            screenBackground.setAttribute("reset", "reseted");
        }
        
    }
    // To show the end of the scroll and not the beginning as it is by default
    screenBackground.scrollLeft = screenBackground.scrollWidth;
});
