import React, { useState } from 'react';
import { db, storage } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function AppForm() {
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [appLogo, setAppLogo] = useState(null);
  const [websiteLink, setWebsiteLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uniqueId = uuidv4();

    // Upload logo to Firebase Storage
    const storageRef = ref(storage, `logos/${uniqueId}`);
    await uploadBytes(storageRef, appLogo);
    const logoURL = await getDownloadURL(storageRef);

    // Save app info to Firestore
    await addDoc(collection(db, 'apps'), {
      id: uniqueId,
      name: appName,
      description: appDescription,
      logo: logoURL,
      website: websiteLink
    });

    // Save unique ID to local storage
    localStorage.setItem('appUniqueId', uniqueId);

    // Reset form
    setAppName('');
    setAppDescription('');
    setAppLogo(null);
    setWebsiteLink('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>App Name:</label>
        <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} required />
      </div>
      <div>
        <label>App Description:</label>
        <textarea value={appDescription} onChange={(e) => setAppDescription(e.target.value)} required />
      </div>
      <div>
        <label>App Logo:</label>
        <input type="file" onChange={(e) => setAppLogo(e.target.files[0])} required />
      </div>
      <div>
        <label>Website Link:</label>
        <input type="url" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AppForm;
