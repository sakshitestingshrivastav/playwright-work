export  function generateRandomString (length:number):string{
 const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

export function generateNumber(length:number){
    let result = []
    for(let i=0;i<length;i++){
        let num = Math.floor(Math.random()*10)
        console.log(num)
        result[i]=num
    }
        return result.join("")
}

export function generateBoolean(){
    let num = Math.floor(Math.random()*2)
    if(num===1){
        return true
    }
    else{
        return false
    }
}

export function reverseString(name:string){
return name.split("").reverse().join("")
}

export function palindrome(name:string){
    let reversed = name.split("").reverse().join("")
        return name=== reversed
}

export function randomEmail(){
    let characters = 'abcdefghijklmnopqrstuvwxyz'
    let result = ""
    for(let i=0;i<5;i++){
        let num = Math.floor(Math.random()*characters.length)
        result += characters[num]
    }
    return `${result}@gmail.com`
}

export function sumOfAllNumbers(num:number[]){
let newNum = num.reduce((acc:number,cur:number)=> acc+cur,0)
return newNum
}

export function filterEvenNumber(num:number[]){
    let filteredNum = num.filter((n)=>n%2===0)
    return filteredNum
}

export function findLargest(num:number[]){
    let largest = 0
    for(let i of num){
        if(largest<num[i]){
            largest = num[i]
        }
    }
    return largest
}

export function findSmallest(num:number[]){
    let smallest = num[0]
    for(let i of num){
        if(smallest>i){
            smallest = i
        }
    }
    return smallest
}

export function validEmail(email: string): boolean {
    let atIndex = email.indexOf("@")
    let dotIndex = email.lastIndexOf(".")

    // must contain exactly one @
    if (atIndex === -1 || email.indexOf("@", atIndex + 1) !== -1) {
        return false
    }

    // @ should not be first or last
    if (atIndex === 0 || atIndex === email.length - 1) {
        return false
    }

    // must contain dot after @
    if (dotIndex === -1 || dotIndex < atIndex) {
        return false
    }

    // dot should not be immediately after @
    if (dotIndex === atIndex + 1) {
        return false
    }

    // dot should not be last character
    if (dotIndex === email.length - 1) {
        return false
    }

    return true
}

export function truncate(name:string){
    let arr = name.split("")
    if (name.length > 4){
    return arr.splice(0,5).join("") + "..."
    }
    else{
    return name
    }
}

export function trimString(name:string){
    return name.trim()
}

export function checkStringHasAllNumber(name:string){
    let arr = name.split("")
    for( let i of arr){
        if(typeof i === "number"){
            return true
        }
        else{
            return false
        }
    }
}
