import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const { user, updateProfile } = useContext(ShopContext);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [address, setAddress] = useState(user?.address || "");
  const [street, setStreet] = useState(user?.street || "");
  const [city, setCity] = useState(user?.city || "");
  const [stateVal, setStateVal] = useState(user?.state || "");
  const [country, setCountry] = useState(user?.country || "");
  const [zipcode, setZipcode] = useState(user?.zipcode || "");
  const [pincode, setPincode] = useState(user?.pincode || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [editing, setEditing] = useState(false);
  const [editingPincode, setEditingPincode] = useState(false);
  const [editingGender, setEditingGender] = useState(false);
  const [editingAll, setEditingAll] = useState(false);

  if (!user) {
    return <div className="pt-16 text-center">Please log in to view your profile.</div>;
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ address });
    setEditing(false);
  };

  const handleSavePincode = (e) => {
    e.preventDefault();
    updateProfile({ pincode });
    setEditingPincode(false);
  };

  const handleSaveGender = (e) => {
    e.preventDefault();
    updateProfile({ gender });
    setEditingGender(false);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    // Always set name as firstName + lastName for compatibility
    updateProfile({
      firstName,
      lastName,
      name: (firstName + ' ' + lastName).trim(),
      email,
      mobile,
      address,
      street,
      city,
      state: stateVal,
      country,
      zipcode,
      gender,
    });
    setEditingAll(false);
  };

  return (
    <div className="pt-16 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white p-6 rounded shadow border">
        {editingAll ? (
          <form onSubmit={handleSaveAll} className="space-y-2 mb-4">
            <div className="flex gap-2">
              <input className="border px-2 py-1 flex-1" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required />
              {/* <input className="border px-2 py-1 flex-1" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required /> */}
            </div>
            <input className="border px-2 py-1 w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input className="border px-2 py-1 w-full" type="text" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile" />
            <input className="border px-2 py-1 w-full" type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
            <input className="border px-2 py-1 w-full" type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder="Street" />
            <div className="flex gap-2">
              <input className="border px-2 py-1 flex-1" type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
              <input className="border px-2 py-1 flex-1" type="text" value={stateVal} onChange={e => setStateVal(e.target.value)} placeholder="State" />
            </div>
            <div className="flex gap-2">
              <input className="border px-2 py-1 flex-1" type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" />
              <input className="border px-2 py-1 flex-1" type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} placeholder="Zipcode" />
            </div>
            <div className="flex gap-2">
              {/* <input className="border px-2 py-1 flex-1" type="text" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Pincode" /> */}
              <select className="border px-2 py-1 flex-1" value={gender} onChange={e => setGender(e.target.value)} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="px-3 py-1 bg-black text-white rounded">Save All</button>
            <button type="button" className="px-3 py-1 bg-gray-300 rounded ml-2" onClick={() => setEditingAll(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <p><strong>Name:</strong> {(user.firstName || "") + (user.lastName ? ' ' + user.lastName : '') || "N/A"}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
            <p><strong>Mobile:</strong> {user.mobile || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Street:</strong> {user.street || "N/A"}</p>
            <p><strong>City:</strong> {user.city || "N/A"}</p>
            <p><strong>State:</strong> {user.state || "N/A"}</p>
            <p><strong>Country:</strong> {user.country || "N/A"}</p>
            <p><strong>Zipcode:</strong> {user.zipcode || "N/A"}</p>
            {/* <p><strong>Pincode:</strong> {user.pincode || "N/A"}</p> */}
            <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
            <button type="button" className="px-2 py-1 text-xs bg-blue-500 text-white rounded mb-2" onClick={() => setEditingAll(true)}>
              Edit All
            </button>
          </>
        )}
        {/* Removed individual Address, Pincode, Gender edit sections. All fields are now editable in Edit All. */}
      </div>
    </div>
  );
};

export default Profile;
