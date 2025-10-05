// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import{getData,addData,clearData} from "./storage.mjs"

//Our Variables 
const userSelect = document.getElementById("userSelect");
const agendaList = document.getElementById("agenda")
const messageDiv = document.getElementById("message")

// Populate dropdown with 5 users//

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

  // Just display all topics and dates (no filtering for now)
  userData.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.topic}, ${item.date}`;
    agendaList.appendChild(li);
  });
}

/* Event listener for dropdown change */
userSelect.addEventListener("change", () => {
  const selectedUser = userSelect.value;
  loadUserAgenda(selectedUser);
});

// Run when the page loads
window.addEventListener("DOMContentLoaded", () => {
  populateUserDropdown();
  console.log("Dropdown populated!");
});