"use strict"

window.onload = () => {
    //make sure we're working

    console.log("hii");

    //console.log(getCourses() )

    populateTable();

}

async function populateTable() {
    //get the courses from the API
    let courses = await getCourses();

    //for bow lets just see if we got the courses
    //console.log(courses);

    let tbody = document.querySelector("#courseTableBody")
    //loop over all the courses and work with a single course
    courses.forEach((course) => {

        //call a function to build the row
        //pass it where the row goes (tbody)
        //pass it what foes in the row (data/course)

        buildRow(tbody, course)

    })


}
// function that takes a table body and some data and puts the data in the table body
function buildRow(someTableBody, someData) {

    //create the row for the table
    let row = someTableBody.insertRow();

    //create the cell for the department
    let departmentCell = row.insertCell();

    //put the relevant course data in the 
    departmentCell.innerHTML = someData.dept;

    let courseNumberCell = row.insertCell();

    courseNumberCell.innerHTML = someData.courseNum;

    let courseNameCell = row.insertCell();

    courseNameCell.innerHTML = someData.courseName;

    let courseDetailsCell = row.insertCell();

    courseDetailsCell.innerHTML = `<a href="./details.html?courseid=${someData.id}">Show Details</a>`;

    // create cell for admin stuff
    let adminStuffCell = row.insertCell();

    adminStuffCell.innerHTML = `
    <a href="./edit_course.html?courseid=${someData.id}">Edit Course</a> &nbsp; &nbsp;
    <a href="./delete_course.html?courseid=${someData.id}">Delete Course</a>;
    `;


}



async function getCourses() {

    //try these things and if it doesn't work out, fall into the catch 
    try {
        let response = await fetch("http://localhost:8081/api/courses");
        let courses = await response.json();


        return courses
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}