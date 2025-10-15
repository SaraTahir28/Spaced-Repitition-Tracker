
import { getUserIds,calculateRevisionDates } from "./common.mjs";
import{getData,addData,clearData} from "./storage.mjs"

//Our Variables 
const userSelect = document.getElementById("userSelect");
const agendaList = document.getElementById("agenda")
const messageDiv = document.getElementById("message")
const form = document.getElementById("addForm")
const topicInput = document.getElementById("topic")
const dateInput = document.getElementById("date")

// Populate dropdown with 5 users

function populateUserDropdown() {
  const users = getUserIds();//Get user IDs from common.js
  userSelect.innerHTML = '<option value="">-- Select user --</option>'; //keep default option

  // Add one <option> for each user
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

//loading Agenda for user
function loadUserAgenda(userID){
  // Clear previous agenda/message
  agendaList.innerHTML = "";
  messageDiv.textContent = "";

  if (!userID) return;

  const userData = getData(userID); // fetch stored data for this user

  if (!userData || userData.length === 0) {
    messageDiv.textContent = "No agenda for this user.";
    return;
  }

  // Sort all agenda items by date (earliest first)
  const sortedAgenda = userData.sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedAgenda.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.topic}, --- ${item.date}`;
    agendaList.appendChild(li);
  });
}
// Event listener for dropdown change
userSelect.addEventListener("change", () => {
  const selectedUser = userSelect.value;
  loadUserAgenda(selectedUser);
});
//Event Listener for form submission.
form.addEventListener("submit",(event)=>{
  event.preventDefault(); //stop the page from loading so we don't have to load data again from localStorage.

const selectedUser = userSelect.value;
const topic = topicInput.value.trim();
const startDate = dateInput.value;

//Validate everything is selected.
if (!selectedUser) {
    alert("Please select a user.");
    return;
  }
  if (!topic) {
    alert("Please enter a topic name.");
    return;
  }
  if (!startDate) {
    alert("Please select a date.");
    return;
  }
// Get revision dates
  const revisions = calculateRevisionDates(startDate);

  // Fill in the topic name for each revision
  revisions.forEach(item => item.topic = topic);

  // Store the revisions for this user
  addData(selectedUser, revisions);

  // Clear form
  topicInput.value = "";
  dateInput.valueAsDate = new Date(); //setting the input’s value to today’s date, //(VAD) is a special property of date input. new Date() sets date as an object rather than a string.

  // Reload the agenda for this user
  loadUserAgenda(selectedUser);
});
// Clear all users' data
function resetAllUserData() {
  const users = getUserIds();
  users.forEach(userId => clearData(userId));
}
document.getElementById("resetDataBtn").addEventListener("click", () => {
  resetAllUserData();

  // Clear UI
  agendaList.innerHTML = "";       // clear the agenda list
  messageDiv.textContent = "";     // clear any messages
  userSelect.value = "";           // reset dropdown selection

  alert("All user data has been cleared!");
});

// Run when the page loads
window.addEventListener("DOMContentLoaded", () => {
  populateUserDropdown();
  console.log("Dropdown populated!");
  dateInput.valueAsDate = new Date(); //Set the date picker’s value to today’s date.”
});
//valueAsDate is a JavaScript property that belongs to an HTML <input type="date"> element.

//It lets you get or set the value of the input as a JavaScript Date object (not just as text)