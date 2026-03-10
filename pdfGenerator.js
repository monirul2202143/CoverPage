const form = document.querySelector('form');
const dataDiv = document.getElementById('content');
const btnDiv = document.getElementById('btn');
const formDiv = document.getElementById('form');
const courseNo = document.getElementById('courseNo');
const courseTitle = document.getElementById('courseTitle');
const assignmentNo = document.getElementById('assignmentNo');
const assignmentTitle = document.getElementById('assignmentTitle');
const teacherName = document.getElementById('teacherName');
const date = document.getElementById('date');
const teacherDept = document.getElementById('teacherDept');
const departments = [
  'Civil Engineering',
  'Electrical and Electronic Engineering',
  'Mechanical Engineering',
  'Computer Science and Engineering',
  'Electronics and Communication Engineering',
  'Industrial and Production Engineering',
  'Ceramics and Metallurgical Engineering',
  'Urban and Regional Planning',
  'Mechatronics Engineering',
  'Architecture',
  'Electrical and Computer Engineering',
  'Chemical Engineering',
  'Building Engineering and Construction Management',
  'Material Science and Engineering'
];
const coverTypes = ['Assignment', 'Lab Report'];
// ---------------------------------------------------------------
const capitalizeWords = (str) => {
  return str
    .split(" ") // split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
    .join(" "); // join words back into a string
}
// --------------------------------------------------------------------
const upperCaseWords = (str) => {
  return str
    .split(" ") // split the string into words
    .map(word => word.toUpperCase()) // convert to uppercase
    .join(" "); // join words back into a string
}
// --------------------------------------------------------------------
const validRange = (r) => {
  return (
    (r >= 1 && r <= 181) ||
    (r >= 1001 && r <= 1181) ||
    (r >= 2001 && r <= 2181) ||
    (r >= 3001 && r <= 3181) ||
    (r >= 4001 && r <= 4060) ||
    (r >= 5001 && r <= 5060) ||
    (r >= 6001 && r <= 6060) ||
    (r >= 7001 && r <= 7060) ||
    (r >= 8001 && r <= 8060) ||
    (r >= 9001 && r <= 9030) ||
    (r >= 10001 && r <= 10061) ||
    (r >= 11001 && r <= 11030) ||
    (r >= 12001 && r <= 12030) ||
    (r >= 13001 && r <= 13060)
  );
}
// --------------------------------------------------------------
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting
  dataDiv.style.display = 'block'; // Show the data div
  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;
  const a = Math.floor(roll / 1000);
  const deptCode = a % 100;
  const session = Math.floor(a / 100);
  const range = Math.floor(roll % 100000);
  let section, heading, number;
  // let assignmentType=0;
  const assignmentType = document.querySelector('input[name="section"]:checked').value;
  if (assignmentType == 0) {
    heading = "Assignment Title";
    number = "Assignment No";
  }
  else if(assignmentType == 1){
    heading="Experiment Name";
    number="Experiment No";
  }
  if ((range >= 1 && range <= 60) ||
      (range >= 1001 && range <= 1060) ||
      (range >= 2001 && range <= 2060) ||
      (range >= 3001 && range <= 3060)) {
      section = 'A';
    }
    else if ((range >= 61 && range <= 120) ||
      (range >= 1061 && range <= 1120) ||
      (range >= 2061 && range <= 2120) ||
      (range >= 3061 && range <= 3120)) {
      section = 'B';
    }
    else if ((range >= 121 && range <= 181) ||
      (range >= 1121 && range <= 1181) ||
      (range >= 2121 && range <= 2181) ||
      (range >= 3121 && range <= 3181)) {
      section = 'C';
    }
    else {
      section = '';
    }
  if (
    roll.length == 7 && validRange(range)) {
    dataDiv.innerHTML = `<p id="moto" align="center">Haven's Light is Our Guid</p>

  <h1 align="center" id="ruet">
    Rajshahi University of Engineering and Technology
  </h1>

  <img src="./Image/ruet-monogram-4176-x-5000.png"
       alt="RUET Logo"
       id="ruetLogo">

  <h3 id="deptName">
    Department of ${departments[deptCode]}
  </h3>

  <div id="assignment">${coverTypes[assignmentType]}</div>

  <div id="courseDetails">
    <p id="courseNo" class="text"><b>Course No:</b> ${upperCaseWords(courseNo.value)}</p>
    <p id="courseTitle" class="text"><b>Course Title:</b> ${capitalizeWords(courseTitle.value)}</p>
    <p id="assingmentNo" class="text"><b>${number}:</b> ${assignmentNo.value}</p>
    <p id="assignmentTitle" class="text"><b>${heading}:</b> ${capitalizeWords(assignmentTitle.value)}</p>
  </div>

  <table border="1">
    <tr>
      <th id="submittedBy">Submitted By</th>
      <th id="submittedTo">Submitted To</th>
    </tr>
    <tr>
      <td>Name: ${capitalizeWords(name)}</td>
      <td rowspan="4">${capitalizeWords(teacherName.value)}<br>Dept. of ${capitalizeWords(teacherDept.value)}<br>Rajshahi University of Engineering and Technology</td>
    </tr>
    <tr><td>Roll: ${roll}</td></tr>
    <tr><td>Section: ${section}</td></tr>
    <tr><td>Session: 20${session}-20${session + 1}</td></tr>
  </table>

  <h3 id="submission">Submission Date: ${getFormattedDate(date.value)}</h3>

  <img id="backgroundImage"
       src="./Image/ruet-monogram-4176-x-5000.png"
       alt="background image">
      `
    btnDiv.innerHTML = '<button onclick="generatePDF()">Download PDF</button><button onclick = "reset()"> Reset</button>';
    formDiv.style.display = 'none'; // Hide the form after submission
  }
  else {
    alert('Please enter a valid 7-digit roll number.');
    dataDiv.style.display = 'none';
  }
});
// ----------------------------------------------------------------
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const content = document.getElementById('content');

  const pdf = new jsPDF('p', 'mm', 'a4');

  await pdf.html(content, {
    callback: function (doc) {
      doc.save("document.pdf");
    },
    x: 10,
    y: 10,
    width: 190, // fit within A4 margins
    windowWidth: content.scrollWidth
  });
}
// ----------------------------------------------------------------
const reset = () => {
  dataDiv.style.display = 'none';
  formDiv.style.display = 'flex';
  form.reset();
  btnDiv.innerHTML = '';
}
// ---------------------------------------------------------------
const getFormattedDate = (dateInput) => {

  const parts = dateInput.split("-");
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

  return formattedDate;
}