import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
  const userStatusContainer = document.getElementById('userStatusContainer');
  const updateStatusBtn = document.getElementById('updateStatusBtn');
  const db = getDatabase();
  const userStatusRef = ref(db, 'users/');  // Assuming your users are stored under the 'users' node
  
  // Function to populate user statuses
  function populateUserStatus() {
    onValue(userStatusRef, (snapshot) => {
      const data = snapshot.val();
      let userStatusHtml = '';
      for (const userId in data) {
        const user = data[userId];
        userStatusHtml += `
          <div class="user-status">
            <span class="user-name">${user.name}</span>
            <span class="user-status-text">${user.status}</span>
            <span class="user-website">${user.websiteName}</span>
          </div>
        `;
      }
      userStatusContainer.innerHTML = userStatusHtml;
    });
  }
  
  // Function to manually update status
  function updateUserStatus() {
    const status = document.getElementById('status').value;
    const websiteName = document.getElementById('websiteName').value;
  
    // For this example, let's assume the user ID is 'user1'
    // In a real app, you should get this from Firebase Auth or another service
    const specificUserRef = ref(db, 'users/user1');
  
    set(specificUserRef, {
      status: status,
      websiteName: websiteName,
      // You can also set other fields like name, email, etc.
    }).catch((error) => {
      // Handle any errors
      console.error("Data could not be saved: " + error);
    });
  }
  
  // Populate user statuses when the popup loads
  populateUserStatus();
  
  // Listen for the update button click event
  updateStatusBtn.addEventListener('click', updateUserStatus);
});
