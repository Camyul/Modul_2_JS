/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
    let count = 0;
    let Course = {
        init: function(title, presentations) {
            validateTitle(title);
            validatePresentations(presentations);
            count = presentations.length;

            this.title = title;
            this.presentations = presentations;
            this.students = [];
            this.generatedID = getID();

            return this;
        },
        addStudent: function(name) {
            validateStName(name);

            let names = name.split(' '),
                id = this.generatedID();

            this.students.push({
                firstName: names[0],
                lastName: names[1],
                id,
                homeworks: [0],
                examResults: 0,
                topScore: 0

            });
            return id;
        },
        getAllStudents: function() {
            //deep copy ---- WORK !!!
            /* return this.students.map(st => {
                 return {
                     firstname: st.firstName,
                     lastname: st.lastName,
                     id: st.id
                 };
             });*/

            let allStudents = [];

            this.students.forEach(function(student) {
                allStudents.push({
                    firstname: student.firstName,
                    lastname: student.lastName,
                    id: student.id
                })
            });
            return allStudents;
        },
        submitHomework: function(studentID, homeworkID) {
            validateID(studentID);
            validateID(homeworkID);

            studentID = +studentID;
            homeworkID = +homeworkID;

            if (studentID < 1 || studentID > this.students.length) {
                throw new Error('Invalid student ID!');
            }
            if (homeworkID < 1 || homeworkID > this.presentations.length) {
                throw new Error('Invalid homework ID!');
            }

            let currSt = this.students[studentID - 1];
            if (currSt.homeworks.indexOf(homeworkID) === -1) {
                currSt.homeworks.push(homeworkID);
            }

            return this;
        },
        pushExamResults: function(results) {

            if (!results) {
                throw new Error('Result not exist');
            }
            if (!Array.isArray(results)) {
                throw new Error('Result must be in array');
            }

            if (results.length !== this.students.length) {
                throw new Error('Hvanah li vi');
            }

            for (let j = 0, len = results.length; j < len; j += 1) {
                let currStID = results[j].StudentID,
                    currStScore = results[j].score;

                validateID(currStID);

                if (!Number(currStScore) && !isFinite(currStScore)) {
                    throw new Error('Student score must be a valid number!');
                }

                if (currStID < 1 || currStID > this.students.length) {
                    throw new Error('Invalid student ID!');
                }
                if (this.students[currStID - 1].examResults !== 0) {
                    throw new Error('This student have score!');
                }

                this.students[currStID - 1].examResults = currStScore;
            }
            return this;
        },
        getTopStudents: function() {
            let topSt = [],
                topTenSt = [];

            topSt = getAllStudents();
            for (let i = 0, len = topSt.length; i < len; i += 1) {
                topSt[i].topScore = (0.75 * topSt[i].score) + (0.25 * (topSt[i].homeworks.length / count))
            }
            topSt.sort(st => st.topScore);
            for (let i = 0; i < 10; i += 1) {
                topTenSt[i].push(topSt[i]);
            }
            return topTenSt;
        }
    };

    function validateID(id) {
        if (!id) {
            throw new Error('Id connot be empty');
        }
        if (id % 1 !== 0) {
            throw new Error('Id must be integer');
        }
        if (Number.isNaN(id)) {
            throw new Error('Id must be number');
        }
    }

    function validatePresentations(pres) {
        if (!pres) {
            throw new Error('presentations not exist');
        } else if (pres.length === 0) {
            throw new Error('Presentations cannot be empty array!');
        }
        pres.forEach(t => validateTitle(t));
    }

    function validateTitle(title) {
        let reg = RegExp(/\s\s/);
        if (reg.test(title)) {
            throw new Error('Title do not have consecutive spaces');
        }

        if (title[0] === ' ') {
            throw new Error('Title do not start with spaces');
        }

        if (title[title.length - 1] === ' ') {
            throw new Error('Title do not start with spaces');
        }
        if (title === '' || title === null) {
            throw new Error('Title cannon be empty or null');
        }
    }

    function validateStName(fullName) {


        if (!fullName) {
            throw new Error('Names cannot be empty');
        } else if (typeof fullName !== 'string') {
            throw new Error('Invalid student name type');
        }
        let splitedName = fullName.split(' ');
        if (splitedName.length !== 2) {
            throw new Error('Must exactly two names');
        }
        for (let i = 0, len = splitedName.length; i < len; i += 1) {
            if (!(/\b[A-Z]\b|\b[A-Z][a-z]+\b/.test(splitedName[i]))) {
                throw new Error('Wrong Name');
            }
        }

        /*splitedName.forEach(function(name) {
            let char = name.charAt(0);
            if (char == char.toLowerCase()) {
                throw new Error('First letter must be capital');
            }
            for (let i = 1, len = name.length; i < len; i += 1) {
                char = name.charAt(i);
                if (char == char.toUpperCase()) {
                    throw new Error('Only first letter must be capital');
                }
            }
        });*/
    }



    function getID() {
        var count = 0;

        return function() {
            return ++count;
        }
    }

    return Course;
}


module.exports = solve;