document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    const userList = document.querySelector("#user-list");
    const repoList = document.querySelector("#repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission refresh
      const searchQuery = document.querySelector("#search").value.trim();
  
      if (searchQuery) {
        searchUsers(searchQuery);
      }
    });
  
    // Function to search for GitHub users
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    // Function to display users
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous search results
      repoList.innerHTML = ""; // Clear repositories list
  
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button class="repo-btn" data-username="${user.login}">View Repos</button>
        `;
  
        userList.appendChild(li);
      });
  
      // Add event listener to the dynamically created buttons
      document.querySelectorAll(".repo-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const username = event.target.dataset.username;
          fetchUserRepos(username);
        });
      });
    }
  
    // Function to fetch user repositories
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => console.error("Error fetching repositories:", error));
    }
  
    // Function to display repositories
    function displayRepos(repos) {
      repoList.innerHTML = ""; // Clear previous repo list
  
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        repoList.appendChild(li);
      });
    }
  });
  