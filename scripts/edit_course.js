"use strict"

window.onload = () => {

    //console.log("heyy")


    // this allows us to get the urlParams to get the variables in the url
    const urlParams = new URLSearchParams(location.search);
    //we can accrss the indicial params by calling the .get on the variable that holds the 
    console.log(urlParams.get("courseid"))



    /*
    //requesting by name
    //console.log(urlParams.get("name"))
    //can then put name=xyz on browser and it shows on console
    */

    if (urlParams.has("courseid")) {

        //if we have a course id, display it's details
        displayCourseDetails(urlParams.get("courseid"))




        const deleteCourseButton = document.querySelector("#deleteCourseButton")

        deleteCourseButton.addEventListener("click", (event) => deleteTheCourse(event, urlParams.get("courseid")));



    } else {

        //let them know we didn't have a valid course id and send them back to courses
        alert("no valid course id");
        window.location.href = "./index.html";

    }



}

async function displayCourseDetails(courseId) {

    //get the course details 
    let courseDetails = await getCourseDetails(courseId);

    console.log(courseDetails);

    let courseDetailsDiv = document.querySelector("#courseDetails");
    //JSON stringify 
    //courseDetailsDiv.innerHTML = JSON.stringify(courseDetails);
    //or...

    courseDetailsDiv.innerHTML =
        `
<div>Course ID: ${courseDetails.id}</div>
<div>Course Name: ${courseDetails.courseName}</div>
<div>Instructor: ${courseDetails.instructor}</div>
<div>Number of Days: ${courseDetails.numDays}</div>
`
}

async function getCourseDetails(courseId) {

    try {
        //use fetch to get the details for the specific course
        let response = await fetch("http://localhost:8081/api/courses/" + courseId);
        //deal with the response to get the data

        let data = (await response).json();

        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err)


    }

}


//CRUD: (D)elete a comment
const deleteTheCourse = async (event, courseId) => {

    event.preventDefault();

    //try catch for error handling
    try {

        //make a fetch (DELETE) request to remove a comment in the API
        let response = await fetch("http://localhost:8081/api/courses/" + courseId,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {
            window.location.href = "./index.html"
        }


    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}