const searchButton = document.getElementById("btn");
const searchInput = document.getElementById("input");
const userCardContainer = document.getElementById("user-card");
const clear = document.getElementById("clear");
const reset = document.getElementById("reset");

// Event listener for clear button
clear.addEventListener("click", () => {
    searchInput.value = "";
    userCardContainer.innerHTML = "";
    localStorage.clear();
});

// Event listener for reset button
reset.addEventListener("click", () => {
    window.location.reload();
});

// Event listener for search button
searchButton.addEventListener("click", async () => {
  try {
      const response = await fetch(`https://api.github.com/users/${searchInput.value}`);
      if (!response.ok) {
          throw new Error("User not found!");
      }
      const userData = await response.json();
      renderUserCard(userData);
      localStorage.setItem("githubUsername", searchInput.value); // save username to local storage
  } 
  catch (error) {
      alert(error);
  }
});

window.addEventListener("load", async () => {
  const githubUsername = localStorage.getItem("githubUsername");
  if (githubUsername) {
      try {
          const response = await fetch(`https://api.github.com/users/${githubUsername}`);
          if (!response.ok) {
              throw new Error("User not found!");
          }
          const userData = await response.json();
          renderUserCard(userData);
      } 
      catch (error) {
          alert(error);
      }
  }
});

// Function to render user card
function renderUserCard(userData) {
  // create the user card element
  const card = document.createElement("div");
  card.classList.add(
    "user-card",
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4"
  );

  // create the user avatar element
  const avatar = document.createElement("img");
  avatar.classList.add(
    "avatar",
    "rounded-full",
    "mx-auto",
    "w-32",
    "h-32",
    "object-cover"
  );
  avatar.src = `${userData.avatar_url}`;
  avatar.alt = `${userData.login}'s avatar`;
  avatar.style.cursor = "pointer";
  avatar.addEventListener("click", () => {
    window.location.href = userData.html_url;
  });

  // create the user name element
  const name = document.createElement("h2");
  name.classList.add("name", "text-xl", "font-bold", "text-gray-800");
  name.textContent = userData.name;

  // create the user location element
  const location = document.createElement("p");
  location.classList.add("location", "text-md", "text-gray-800", "mt-2");
  location.textContent = userData.location;

  // create the user company element
  const company = document.createElement("p");
  company.classList.add("company", "text-md", "text-gray-800", "mt-2");
  company.textContent = userData.company;

  // create the user bio element
  const bio = document.createElement("p");
  bio.classList.add("bio", "text-md", "text-gray-800", "mt-2");
  bio.textContent = `Bio: ${userData.bio}`;

  // create the user followers element
  const followers = document.createElement("a");
  followers.classList.add(
    "followers",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  followers.href = `${userData.html_url}?tab=followers`;
  followers.textContent =`Followers`;

  // create the user following element
  const following = document.createElement("a");
  following.classList.add(
    "following",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  following.href = `${userData.html_url}?tab=following`;
  following.textContent =`Following`;
  following.style.marginLeft = "10px";

  // create the user repos element
  const repos = document.createElement("a");
  repos.classList.add(
    "repos",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  repos.href = `${userData.html_url}?tab=repositories`;
  repos.textContent = `Repositories`;
  repos.style.marginLeft = "10px";

  // create the user orgs element
  const orgs = document.createElement("a");
  orgs.classList.add(
    "orgs",
    "block",
    "text-lg",
    "font-bold",
    "text-gray-800",
    "mt-2"
  );
  orgs.href = `${userData.html_url}?tab=organizations`;
  orgs.textContent = `Organizations`;
  orgs.style.marginLeft = "10px";

  // append all the elements to the card
  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(location);
  card.appendChild(company);
  card.appendChild(bio);
  card.appendChild(followers);
  card.appendChild(following);
  card.appendChild(repos);
  card.appendChild(orgs);

  // append the card to the user card container
  userCardContainer.appendChild(card);
}
// Store user data in local storage
localStorage.setItem("userData", JSON.stringify(userData));

// Add click event listener to each repo to redirect to its GitHub page
const repoLinks = card.querySelectorAll(".repo-name");
repoLinks.forEach((link) => {
link.addEventListener("click", (event) => {
event.preventDefault();
window.open(link.href, "_blank");
});
});

// Get user data from localStorage
const userDataJSON = localStorage.getItem("userData");
if (userDataJSON) {
  const userData = JSON.parse(userDataJSON);
  renderUserCard(userData);
}