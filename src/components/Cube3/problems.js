const problems = [
    {
        title: 'FizzBuzz',
        description: 'Write a program that prints the numbers from 1 to 15. For multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.',
        languages: {
            javascript: {
                starterCode: `
function fizzBuzz() {
    for (let i = 1; i <= 15; i++) {
        let output = '';
        if (i % 3 === 0) output += 'Fizz';
        if (i % 5 === 0) output += 'Buzz';
        console.log(output || i);
    }
}
fizzBuzz();
                `,
                solution: `
function fizzBuzz() {
    for (let i = 1; i <= 15; i++) {
        let output = '';
        if (i % 3 === 0) output += 'Fizz';
        if (i % 5 === 0) output += 'Buzz';
        console.log(output || i);
    }
}
fizzBuzz();
                `
            },
            python: {
                starterCode: `
def fizz_buzz():
    for i in range(1, 16):
        output = ''
        if i % 3 == 0:
            output += 'Fizz'
        if i % 5 == 0:
            output += 'Buzz'
        print(output or i)
fizz_buzz()
                `,
                solution: `
def fizz_buzz():
    for i in range(1, 16):
        output = ''
        if i % 3 == 0:
            output += 'Fizz'
        if i % 5 == 0:
            output += 'Buzz'
        print(output or i)
fizz_buzz()
                `
            },
        },
        hints: [
            'Use a loop to iterate from 1 to 15.',
            'Use the modulo operator to check for multiples of 3 and 5.',
            'Combine "Fizz" and "Buzz" for multiples of both 3 and 5.'
        ],
        testCases: [
            { input: '', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n' }
        ],
        validateSolution: (output, expectedOutput) => output.trim() === expectedOutput.trim(),
        explanation: 'The FizzBuzz problem is a classic programming challenge that tests your understanding of loops and conditionals. The solution uses a loop to iterate through the numbers from 1 to 15. For each number, it checks if the number is divisible by 3, 5, or both, and prints "Fizz", "Buzz", or "FizzBuzz" accordingly.'
    },
    {
        title: 'Palindrome Checker',
        description: 'Write a function to check if a given string is a palindrome. A palindrome is a word, phrase, or sequence that reads the same backward as forward.',
        languages: {
            javascript: {
                starterCode: `
function isPalindrome(str) {
    const cleaned = str.replace(/[^A-Z0-9]/ig, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}
// Test cases
console.log(isPalindrome('A man, a plan, a canal, Panama')); // True
console.log(isPalindrome('racecar')); // True
console.log(isPalindrome('hello')); // Talse
                `,
                solution: `
function isPalindrome(str) {
    const cleaned = str.replace(/[^A-Z0-9]/ig, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}
console.log(isPalindrome('A man, a plan, a canal, Panama')); // true
console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
                `
            },
            python: {
                starterCode: `
def is_palindrome(s):
    cleaned = ''.join(e for e in s if e.isalnum()).lower()
    return cleaned == cleaned[::-1]
# Test cases
print(is_palindrome('A man, a plan, a canal, Panama')) # True
print(is_palindrome('racecar')) # True
print(is_palindrome('hello')) # False
                `,
                solution: `
def is_palindrome(s):
    cleaned = ''.join(e for e in s if e.isalnum()).lower()
    return cleaned == cleaned[::-1]
print(is_palindrome('A man, a plan, a canal, Panama')) # True
print(is_palindrome('racecar')) # True
print(is_palindrome('hello')) # False
                `
            },
        },
        hints: [
            'Remove all non-alphanumeric characters from the string.',
            'Convert the string to lowercase.',
            'Compare the cleaned string to its reverse.'
        ],
        testCases: [
            { input: 'A man, a plan, a canal, Panama', expectedOutput: 'true' },
            { input: 'racecar', expectedOutput: 'true' },
            { input: 'hello', expectedOutput: 'false' }
        ],
        validateSolution: (output, expectedOutput) => output.trim().toLowerCase() === expectedOutput.trim().toLowerCase(),
        explanation: 'The Palindrome Checker problem requires you to determine if a given string reads the same backward as forward. The solution involves cleaning the string by removing all non-alphanumeric characters and converting it to lowercase. Then, it compares the cleaned string to its reverse to check for equality.'
    },
    {
        title: 'Two Sum',
        description: 'Given an array of integers and a target sum, return indices of the two numbers such that they add up to the target.',
        languages: {
            javascript: {
                starterCode: `
function twoSum(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map[complement] !== undefined) {
            return [map[complement], i];
        }
        map[nums[i]] = i;
    }
    return [];
}
// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
                `,
                solution: `
function twoSum(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map[complement] !== undefined) {
            return [map[complement], i];
        }
        map[nums[i]] = i;
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
                `
            },
            python: {
                starterCode: `
def two_sum(nums, target):
    map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in map:
            return [map[complement], i]
        map[num] = i
    return []
# Test cases
print(two_sum([2, 7, 11, 15], 9)) # [0, 1]
print(two_sum([3, 2, 4], 6)) # [1, 2]
print(two_sum([3, 3], 6)) # [0, 1]
                `,
                solution: `
def two_sum(nums, target):
    map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in map:
            return [map[complement], i]
        map[num] = i
    return []
print two_sum([2, 7, 11, 15], 9)) # [0, 1]
print two_sum([3, 2, 4], 6)) # [1, 2]
print two_sum([3, 3], 6)) # [0, 1]
                `
            },
        },
        hints: [
            'Use a hash map to store the indices of the elements.',
            'For each element, check if the complement (target - element) exists in the hash map.',
            'If the complement exists, return the indices.'
        ],
        testCases: [
            { input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }), expectedOutput: '[0, 1]' },
            { input: JSON.stringify({ nums: [3, 2, 4], target: 6 }), expectedOutput: '[1, 2]' },
            { input: JSON.stringify({ nums: [3, 3], target: 6 }), expectedOutput: '[0, 1]' }
        ],
        validateSolution: (output, expectedOutput) => JSON.stringify(output) === expectedOutput,
        explanation: 'The Two Sum problem involves finding two numbers in an array that add up to a given target. The solution uses a hash map to store the indices of the elements. For each element, it checks if the complement (target - element) exists in the hash map. If the complement exists, it returns the indices of the two numbers.'
    }
];

export default problems;
