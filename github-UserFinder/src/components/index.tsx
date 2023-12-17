import { useState, useEffect } from "react";

function GithubFinder() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userData, setUserData] = useState(null);

  // Event listener for clear button
  const handleClear = () => {
    setSearchInputValue("");
    setUserData(null);
    localStorage.clear();
  };

  // Event listener for reset button
  const handleReset = () => {
    window.location.reload();
  };

  // Event listener for search button
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${searchInputValue}`
      );
      if (!response.ok) {
        throw new Error("User not found!");
      }
      const userData = await response.json();
      setUserData(userData);
      localStorage.setItem("githubUsername", searchInputValue);
    } catch (error) {
      alert(error);
    }
  };

  // Load user data from local storage on page load
  useEffect(() => {
    const githubUsername = localStorage.getItem("githubUsername");
    if (githubUsername) {
      async function fetchData() {
        try {
          const response = await fetch(
            `https://api.github.com/users/${githubUsername}`
          );
          if (!response.ok) {
            throw new Error("User not found!");
          }
          const userData = await response.json();
          setUserData(userData);
        } catch (error) {
          alert(error);
        }
      }
      fetchData();
    }
  }, []);

  // Render user card
  const renderUserCard = (userData: {
    avatar_url: string;
    login: string;
    name: string;
    location: string;
    company: string;
    bio: string;
    html_url: string;
  }): JSX.Element => {
    return (
      <div className="user-card">
        <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
        <h2>{userData.name}</h2>
        <p>{userData.location}</p>
        <p>{userData.company}</p>
        <p>Bio: {userData.bio}</p>
        <a href={`${userData.html_url}?tab=followers`}>Followers</a>
        <a href={`${userData.html_url}?tab=following`}>Following</a>
        <a href={`${userData.html_url}?tab=repositories`}>Repositories</a>
        <a href={`${userData.html_url}?tab=organizations`}>Organizations</a>
      </div>
    );
  };
  return (
    <section className="contain">
      <div>
        <h1><a href="/slack">Get in touch</a></h1>
      </div>
      <div className="container">
        <h1>Github Finder</h1>
        <div className="search-container">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="github logo"
            className="image"
          />
          <br />
          <br />
          <br />
          <input
            type="text"
            placeholder="Github/username"
            name="username"
            className="input"
            id="input"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <br />
          <span id="btn-container">
            <button id="btn" onClick={handleSearch}>
              Search
            </button>
            <br />
            <button id="clear" onClick={handleClear}>
              Clear
            </button>
            <br />
            <button id="reset" onClick={handleReset}>
              Reset
            </button>
          </span>
        </div>
        <section id="user-card">{userData && renderUserCard(userData)}</section>
      </div>
    </section>
  );
}

export default GithubFinder;
