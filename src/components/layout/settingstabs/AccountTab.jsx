import { useCallback, useEffect, useState } from 'react';
import noprofile from "../../../assets/images/blank-profile-picture.png";

function AccountTab() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("isDarkTheme") === "true") {
        setIsDarkTheme(true);
        }
    }, []);

    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("isDarkTheme", isDarkTheme);
    }, [isDarkTheme])

    const toggleTheme = useCallback(() => {
        setIsDarkTheme(!isDarkTheme);
        localStorage.setItem("isDarkTheme", !isDarkTheme);
    }, [isDarkTheme])

  return (
    <>
      <div id="personal" className="personalpref">
        <form action="" method="post" encType="multipart/form-data">
          <h2>Personal</h2>
          <div className="border-bottom"></div>
          <div className="profile-img">
            <label htmlFor="file-upload" name="profile-img">
              <i className="bi bi-image"></i> Profile Image
            </label>
            <img width="100" height="100" src={noprofile} alt="Your Profile Image" />
          </div>
          <div className="profile-fullname">
            <label htmlFor="real_name">
              <i className="bi bi-person-fill"></i> Full Name
            </label>
            <input type="text" id="real_name" placeholder="Full Name" name="real_name"/>
          </div>
          <div className="profile-fullname">
            <label htmlFor="phone" name="phone">
              <i className="bi bi-phone"></i> Phone Number
            </label>
            <input type="tel" id="phone" name="phone" placeholder="Phone Number" autoComplete="tel" />
          </div>
          <div className="profile-bio">
            <label htmlFor="about">
              <i className="bi bi-newspaper"></i> Bio
            </label>
            <textarea id="about" name="bio" placeholder="Say something about yourself..." rows="4">
            </textarea>
          </div>
          <div className="profile-gender">
            <label htmlFor="gender">
              <i className="bi bi-gender-ambiguous"></i> Gender
            </label>
            <select name="gender" id="gender" title="Gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="profile-location">
            <label htmlFor="location">
              <i className="bi bi-geo-alt-fill"></i> Location
            </label>
            <input title="Location" placeholder="Location" type="text" name="location" id="location" />
          </div>
          <h2 id="themes">Themes</h2>
          <div className="border-bottom"></div>
          <div className="themepref">
            <label htmlFor="toggle">
              <i className="bi bi-brightness-high-fill"></i> Dark Mode
            </label>
            <label htmlFor="toggle" className="toggle">
              <input title="Theme" name="theme" id="toggle" type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
              <span className="slider"></span>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default AccountTab;
