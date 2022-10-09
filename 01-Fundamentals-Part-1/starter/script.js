// // 2nd smallest 

// let arr = [1,3,4,5,6];

// let min1 = Number.MAX_VALUE;
// let min = Number.MAX_VALUE;


// // min1 will be just behind min

// for(let i =0; i<arr.length;i++) {
//     if(min >=arr[i]) {
//         min1 = min;
//         min = arr[i]
//     } else if(min1 > arr[i]) {
//         min1 = arr[i];
//     }

// }

// console.log(min1);


// // frequency using objects

// // let str1 = "SSSSSTTPPQ";
// // let obj = {};

// // for(let i =0;i<str1.length;i++) {
// // if(obj[str1[i]]) {
// //     obj[str1[i]]+=1
// // } else {
// //     obj[str1[i]] = 1
// // }
// // }
// // let opString='';
// // for(let key in obj) {
// //     opString = opString + obj[key] + key;
// // }
// // console.log("Op string is ", opString);


// // unique strings 

// let str2= "aabc";
// let desiredLength = 2;
// const tupleSet = new Set();

// for(let i=0;i<str2.length - desiredLength + 1 ;i++) {
//     tupleSet.add(str2.substring(i, i+desiredLength));
// }

// // for(let i=0;i<str2.length;i++) {
// //     let uniqueString = '';
// //     for(let j =i;j<str2.length;j++) {
// //         uniqueString+=str2[j];
// //         if(uniqueString.length == desiredLength) {
// //             tupleSet.add(uniqueString);
// //             break;
// //         }
// //     }
// // }

// tupleSet.forEach(data => {
//     console.log(data);
// });

// console.log(tupleSet);



// //
// let str = 'aabbbbddcc';
// let obj = {};
// str.split('').forEach((currValue, position, arr) => {
//     console.log("arrrr is ",arr);
// if(obj[currValue]) {
// if(currValue === arr[position - 1]) {
// obj[currValue][1] = obj[currValue][1] + 1;
// }
// } else {
// obj[currValue] = [position, 1];
// }
// })
// console.log("object is ",obj);
// const result = [];
// for (const item in obj) {
// result.push({ char: item, position: obj[item][0], length: obj[item][1]})
// }

// console.log('result ',result);


// result.sort((a,b) => b.length - a.length);
// //result.sort();



// console.log('Result is ', result[0]);




// var input = [
//     [1, 2, 3, 4, 5, 6],
//     [7, 8, 9, 10, 11, 12],
//     [13, 14, 15, 16, 17, 18],
//     [19,20,21,22,23,24]
//   ];

  
//   let spiral = (mat) => {
//     if (mat.length && mat[0].length) {
//       mat[0].forEach((entry) => {
//       console.log("first print is ", entry);
//         console.log(entry);
//       });
//       mat.shift();
//       mat.forEach((item) => {
//       console.log("Popped item is ",item);
//         console.log(item.pop());
//       });
//       spiral(reverseMatrix(mat));
//     }
//     return;
//   };
  
//   let reverseMatrix = (mat) => {
//     mat.forEach((item) => {
//       item.reverse();
//     });
//     mat.reverse();
//     return mat;
//   };
  
//   console.log('Clockwise Order is:');
//   spiral(input);
  

// ArmStrong Number

// const lengthOfNumber = (number) => {
//     let length = 0;
//     while(number !=0) {
//         length++;
//         number = Math.floor(number / 10);
//     }
//     return length;
// }


// let number1 = 92727;
// let copyOfNumber1 = number1;
// const lengthOfNum = lengthOfNumber(number1);
// let sum = 0;

// while(number1 !=0) {
//     // let remainder = Math.floor(number1 %10);
//     sum = sum + ((Math.floor(number1 % 10) ** lengthOfNum));
//     number1 = number1/10;
// }

// if(copyOfNumber1 === sum ) {
//     console.log("ArmStrong number")
// } else {
//     console.log("Not an armstrong number");
// }


// form largest number with array inputs

// const compare = (x, y) => {
//         let xy = x.toString() + y.toString();
//         let yx = y.toString() + x.toString();

//         return (yx - xy); 
// }

// let arr = [1, 34, 3, 98, 9, 76, 45, 4];

// arr.sort(compare);
// let finalStr = '';
// for(let i =0;i<arr.length;i++) {
// finalStr+=arr[i];
// }
// console.log('final string ', finalStr);
console.log(Math.min.apply(null,[7,5]));



// Snow pack problem

// sol--> find max to the left and right of each array element and then take minimum of these two.
// after taking minimum , subtract it from the current element and add it to result


// const findTrappingWater = (arr) => {
//     let result = 0;
//     let n = arr.length;
//     // starting from 2nd element and ending it at 2nd last element
//     for(let i = 1;i<n-1;i++) {
//         // finding maximum element in left
//         let left = arr[i]
//         for(let j=0;j<i;j++) {
//             left = Math.max(left,arr[j]);
//         }
//         // finding maximum element in the right
//         let right = arr[i]
//         for(let j=i+1;j<n;j++) {
//             right = Math.max(right,arr[j]);
//         }

//         result = result + (Math.min(left,right) - arr[i]);

//     }

//     return result;
// }


// More efficient solution 

const findTrappingWater = (arr) => {
    let n = arr.length;

    let left = new Array(n);
    let right= new Array(n);
    let water = 0;
    left[0] = arr[0];
    right[n-1] = arr[n-1];
    for(let i = 1;i<n;i++) {
        left[i] = Math.max(left[i-1],arr[i]);
    }
    for(let i = n-2;i>=0;i--) {
        right[i] = Math.max(right[i+1],arr[i]);
    }

    for(let i=0;i<n;i++) {
        water = water + Math.min(left[i],right[i]) - arr[i];

    }

    return water;

}

////////////////

// let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
// let arr = [3, 0, 2, 0, 4]
let arr = [0, 1, 3, 0, 1, 2, 0,4, 2, 0, 3, 0]
const trappedWater = findTrappingWater(arr);

console.log("Trapped water is ",trappedWater);

// Power of another number

const checkPower = (x,y) => {
    let power = 1;

    if(x === 1) {
        return y === 1;
    }

    while(power < y) {
        power *=x;
    }

    return (power === y);
}

const result = checkPower(10,1);

console.log('Is power', result);

// Power of 10 

const powerOf10 = (num) => {
    while(num > 1) {
        if(num % 10 !=0) {
            return false;
        }
        num = num / 10;
    }
    return true;
}

const ans = powerOf10(1000);
console.log("Is power of 10", ans);

// Pangram String 

let str = "The quick brown fox jumps over the dog";
const strLength = str.length;

let max_chars = 26;

let charPresent = new Array(max_chars);
charPresent.fill(false);

let charsList = [];

for(let i = 0; i < strLength; i++)
{
  if ('A'.charCodeAt() <= str[i].charCodeAt() && str[i].charCodeAt() <= 'Z'.charCodeAt())
  charPresent[str[i].charCodeAt() - 'A'.charCodeAt()] = true;
  else if ('a'.charCodeAt() <= str[i].charCodeAt() && str[i].charCodeAt() <= 'z'.charCodeAt())
  charPresent[str[i].charCodeAt() - 'a'.charCodeAt()] = true;
}

for(let i = 0; i < 26; i++)
      {
        if (charPresent[i] == false)
        {
          charsList.push(String.fromCharCode(i + 'a'.charCodeAt()));
        }
      }


console.log(charPresent);
console.log(charsList);


// Atoi 
let str1 = "123";
let result1 = 0;
let sign = 1;
let i = 0;
if(str1[0] === '-') {
    sign = -1;
    i++;
}
  let strLength1= str1.length;
  for(; i < strLength1; i++)
  {
    result1 = result1*10 +str1[i].charCodeAt() - '0'.charCodeAt();
  }

console.log('Result is ', sign * result1 );



 