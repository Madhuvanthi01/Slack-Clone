const editControls = document.querySelector(".input-toolbar-icons");

editControls.addEventListener("click", function (event) {
  const command =
    event.target !== undefined &&
    event.target.getAttribute("data-command") !== null
      ? event.target.getAttribute("data-command")
      : null;
  if (command === null) return;
  console.log("Selected command: " + command);

  if (document.getSelection().toString().length === 0) {
    alert("Please select some text before editing the content.");
    return;
  }

  let range = window.getSelection().getRangeAt(0);
  const oldConent = document.createTextNode(range.toString());
  const newElement = document.createElement(command);
  newElement.append(oldConent);
  range.deleteContents();
  range.insertNode(newElement);
});

const closeSideBar = document.getElementById("close");
const sideBarWrapper = document.getElementById("sidebar-wrapper");
const sideBar = document.getElementById("user-sidebar");
const user = document.getElementById("user");

const info = document.getElementById("info");
const rightSidebarWrapper = document.getElementById("right-sidebar-wrapper");
const channelRightSidebar = document.getElementById("channel-right-sidebar");
const closeRightSidebar = document.getElementById("close-right-sidebar");

// sidebar
if (user) {
  user.addEventListener("click", () => {
    if (sideBarWrapper) {
      sideBarWrapper.classList.add("sidebar-wrapper-display");
    }
    if (sideBar) {
      sideBar.classList.add("user-sidebar-display");
    }
  });
}
if (closeSideBar) {
  closeSideBar.addEventListener("click", () => {
    sideBar.classList.remove("sidebar-display");
    sideBarWrapper.classList.remove("sidebar-wrapper-display");
  });
}



//channel form
function showAddChannelForm() {
  document.getElementById("addChannelForm").style.display = "block";
}

document.querySelector(".form-container").addEventListener("submit", function(e) {
  e.preventDefault();
  let channelName = document.querySelector('input[name="channelName"]').value;
  let channelDescription = document.querySelector('textarea[name="channelDescription"]').value;
  let newChannel = document.createElement("li");
  newChannel.innerHTML = `<a href="#"><i class="fas fa-hashtag"></i>${channelName}</a>`;
  
  document.querySelector(".channels ul").appendChild(newChannel);
  document.getElementById("addChannelForm").style.display = "none";
});

//message form
function sendMessage() {
  // Get the message content from the input
  const messageContent = document.getElementById("textBox").innerText.trim();

  if (messageContent !== "") {
    // Get the current timestamp
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Get the sender's username (you can replace this with actual username retrieval logic)
    const senderUsername = "Madhuvanthi";

    // Create a new feed article for the message
    const newFeedArticle = document.createElement("article");
    newFeedArticle.classList.add("feed");

    // Build the HTML structure for the message
    newFeedArticle.innerHTML = `
      <section class="feeds-user-avatar">
        <!-- Add sender's avatar or initials -->
        <img src="images/user6.jpg" alt="User 1" width="40" />
       
      </section>
      <section class="feed-content">
        <section class="feed-user-info">
          <h4>${senderUsername} <span class="time-stamp">${timestamp}</span></h4>
        </section>
        <div>
          <p class="feed-text">${messageContent}</p>
        </div>
      </section>
    `;

    // Append the new message to the feeds section
    document.querySelector(".feeds").appendChild(newFeedArticle);

    // Clear the message input
    document.getElementById("textBox").innerText = "";
  }
}




document.addEventListener('DOMContentLoaded', function () {
  const userItems = document.querySelectorAll('.direct-messages li');

  userItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const username = this.querySelector('a').textContent.trim();
      openDirectMessage(username);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');

 
  const usernameDisplay = document.getElementById('usernameDisplay');
  if (usernameDisplay) {
    usernameDisplay.textContent = username || '';
  }

  
});


function openDirectMessage(username) {
  
  const directMessageUrl = `direct-message.html?user=${encodeURIComponent(username)}`;
  

  window.location.href = directMessageUrl;
}

document.addEventListener('DOMContentLoaded', function () {
  
 
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');

  
  const usernameDisplay = document.getElementById('usernameDisplay');
  if (usernameDisplay) {
    usernameDisplay.textContent = username || '';
  }

 
  const channelNameDisplay = document.getElementById('channelNameDisplay');
  if (channelNameDisplay) {
   
    const channelName = getChannelNameByUsername(username);
    channelNameDisplay.textContent = channelName || '';
  }


});


function getChannelNameByUsername(username) {
  const channelNameMapping = {
    'slackbot': ' slackbot',
    'Madhuvanthi': ' Madhuvanthi',
    'Karthickeyan J': 'Karthickeyan J',
    'Madhumitha': ' Madhumitha',
    'Komala': 'Komala',
    
  };

  
  return channelNameMapping[username] ;
}


function getChannelDetailsByUsername(username) {
  const channelDetailsMapping = {
    'slackbot': { name: 'Direct Channel for slackbot', avatar: 'images/user1.jpg' },
    'Madhuvanthi': { name: 'Direct Channel for Madhuvanthi', avatar: 'images/user2.jpg' },
    'Karthickeyan J': { name: 'Direct Channel for Karthickeyan J', avatar: 'images/user4.jpg' },
    'Madhumitha': { name: 'Direct Channel for Madhumitha', avatar: 'images/user3.jpg' },
    'Komala': { name: 'Direct Channel for Komala', avatar: 'images/user5.jpg' },
    
  };

  
  return channelDetailsMapping[username] || { name: 'Default Direct Channel', avatar: 'images/user1.jpg' };
}

document.addEventListener('DOMContentLoaded', function () {

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user');

 
  const channelDetails = getChannelDetailsByUsername(username);

  
  const channelNameDisplay = document.getElementById('channelNameDisplay');
  const avatarDisplay = document.getElementById('avatarDisplay');

  if (channelNameDisplay) {
    channelNameDisplay.textContent = channelDetails.name || '';
  }

  if (avatarDisplay) {
    avatarDisplay.src = channelDetails.avatar || '';
    avatarDisplay.alt = username ? `User ${username.replace(/\D/g, '')}` : 'User Avatar';
  }

 
});







