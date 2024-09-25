import React, { useState } from 'react';

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    twitter: '',
    github: '',
  });
  const [theme, setTheme] = useState('light');

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSocialLinkChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value,
    });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submit logic (e.g., API call to save user profile)
    console.log('Profile updated:', { profilePicture, bio, socialLinks, theme });
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-${theme === 'dark' ? 'gray-800' : 'white'} text-${theme === 'dark' ? 'white' : 'black'}`}>
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mb-2"
          />
          {profilePicture && (
            <img src={profilePicture} alt="Profile" className="h-24 w-24 rounded-full mb-2" />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={handleBioChange}
            maxLength={150}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Tell us about yourself..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Social Media Links</label>
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={socialLinks.linkedin}
            onChange={handleSocialLinkChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            type="url"
            name="twitter"
            placeholder="Twitter URL"
            value={socialLinks.twitter}
            onChange={handleSocialLinkChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            type="url"
            name="github"
            placeholder="GitHub URL"
            value={socialLinks.github}
            onChange={handleSocialLinkChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Choose Theme</label>
          <select value={theme} onChange={handleThemeChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200 w-full"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
