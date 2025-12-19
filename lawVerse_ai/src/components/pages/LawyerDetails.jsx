import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const LawyersDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // --- New State for Editing ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // --- State for adding a new lawyer ---
  const [newLawyer, setNewLawyer] = useState({
    name: "",
    specialization: "",
    email: "",
    experience: "",
    imageUrl: "",
    description: "",
  });
  const [addLoading, setAddLoading] = useState(false);

  // Related lawyers state
  const [relatedLawyers, setRelatedLawyers] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // 1. Fetch Lawyer Data
  const fetchLawyerDetails = async () => {
    try {
      const docRef = doc(db, "lawyers", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setLawyer(data);
        setFormData(data); // Initialize form data with fetched data
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching lawyer details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchLawyerDetails();
  }, [id]);

  // Fetch related lawyers with same specialization
  useEffect(() => {
    if (lawyer?.specialization) {
      const fetchRelated = async () => {
        try {
          setLoadingRelated(true);
          const q = query(
            collection(db, "lawyers"),
            where("specialization", "==", lawyer.specialization)
          );
          const querySnapshot = await getDocs(q);
          const related = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((l) => l.id !== id)
            .slice(0, 3);
          setRelatedLawyers(related);
        } catch (error) {
          console.error("Error fetching related lawyers:", error);
        } finally {
          setLoadingRelated(false);
        }
      };
      fetchRelated();
    }
  }, [lawyer, id]);

  // 2. Handle Input Change in Edit Mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Input change for add form
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewLawyer((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Update Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to save these changes?")) return;

    try {
      const docRef = doc(db, "lawyers", id);
      await updateDoc(docRef, formData);
      
      setLawyer(formData); // Update local view
      setIsEditing(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating profile.");
    }
  };

  // 4. Delete Function
  const handleDelete = async () => {
    if (!window.confirm("WARNING: Are you sure you want to DELETE this lawyer profile? This cannot be undone.")) return;

    try {
      await deleteDoc(doc(db, "lawyers", id));
      alert("Profile deleted successfully.");
      navigate("/"); // Redirect to Home after delete
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Error deleting profile.");
    }
  };

  // 5. Refresh Function
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchLawyerDetails();
    } finally {
      setRefreshing(false);
    }
  };

  // 6. Add new lawyer
  const handleAddNew = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const payload = {
        ...newLawyer,
        experience: newLawyer.experience ? Number(newLawyer.experience) : newLawyer.experience,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "lawyers"), payload);
      setNewLawyer({ name: "", specialization: "", email: "", experience: "", imageUrl: "", description: "" });
      alert("New lawyer added successfully.");
      navigate(`/lawyer/${docRef.id}`);
    } catch (error) {
      console.error("Error adding lawyer: ", error);
      alert("Error adding new lawyer.");
    } finally {
      setAddLoading(false);
    }
  };

  // Share functionality
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/lawyer/${id}`;
    const text = `Check out ${lawyer?.name} - ${lawyer?.specialization}`;
    if (navigator.share) {
      navigator.share({ title: "LawVerse AI", text, url: shareUrl });
    } else {
      const mailto = `mailto:?subject=Meet ${lawyer?.name}&body=${text}%0A${shareUrl}`;
      window.location.href = mailto;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen animated-gradient">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="text-center py-20 animated-gradient min-h-screen">
        <h2 className="text-2xl font-bold text-cyan-100 text-fade-in">Lawyer Not Found</h2>
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 underline mt-4 inline-block text-slide-up animate-delay-200">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden animated-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation & Admin Controls */}
        <div className="flex justify-between items-center mb-6 text-fade-in">
          <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Lawyers
          </Link>

          <div className="space-x-3 flex items-center">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded hover:bg-cyan-400 transition"
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            {!isEditing && (
               <>
                 <button 
                   onClick={() => setIsEditing(true)}
                   className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                 >
                   Edit Profile
                 </button>
                 <button 
                   onClick={handleDelete}
                   className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
                 >
                   Delete Profile
                 </button>
               </>
            )}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#0d2a52] rounded-2xl shadow-xl overflow-hidden border border-cyan-500/40">
          {/* === EDIT MODE FORM === 
          */}
          {isEditing ? (
            <form onSubmit={handleUpdate} className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-cyan-100">Edit Lawyer Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-cyan-200 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                    placeholder="https://..."
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-cyan-200 mb-1">Bio / Description</label>
                  <textarea
                    name="description"
                    value={formData.description || formData.bio || ""}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-600 text-gray-100 font-medium rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-500 text-[#051b3d] font-medium rounded hover:bg-cyan-400 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* === VIEW MODE (Your Original Design) === 
            */
            <div className="md:flex">
              {/* Left Column: Image */}
              <div className="md:w-1/3 bg-[#0a1624] relative">
                {lawyer.imageUrl ? (
                  <img 
                    src={lawyer.imageUrl} 
                    alt={lawyer.name} 
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                ) : (
                  <div className="w-full h-full min-h-[300px] flex items-center justify-center text-gray-400 bg-[#0a1624]">
                    <span className="text-lg">No Image</span>
                  </div>
                )}
              </div>

              {/* Right Column: Details */}
              <div className="p-8 md:w-2/3">
                <div className="uppercase tracking-wide text-sm text-cyan-400 font-semibold">
                  {lawyer.specialization || "Legal Expert"}
                </div>
                
                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-cyan-100 sm:text-4xl">
                  {lawyer.name}
                </h1>

                <div className="mt-4 border-t border-cyan-500/30 pt-4">
                  <h3 className="text-lg font-medium text-cyan-200">About</h3>
                  <p className="mt-2 text-gray-300 text-lg leading-relaxed">
                    {lawyer.bio || lawyer.description || "No biography provided for this lawyer."}
                  </p>
                </div>

                {/* Contact / Extra Info Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#051b3d] p-4 rounded-lg border border-cyan-500/30">
                    <span className="text-xs text-cyan-400 uppercase font-bold">Email</span>
                    <p className="text-cyan-100 font-medium break-all">
                      {lawyer.email || "Not Available"}
                    </p>
                  </div>
                  
                  <div className="bg-[#051b3d] p-4 rounded-lg border border-cyan-500/30">
                    <span className="text-xs text-cyan-400 uppercase font-bold">Experience</span>
                    <p className="text-cyan-100 font-medium">
                      {lawyer.experience ? `${lawyer.experience} Years` : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 space-y-4">
                  <button className="w-full bg-cyan-500 text-[#051b3d] font-bold py-3 px-4 rounded-lg hover:bg-cyan-400 transition duration-300 shadow-md">
                    Contact {lawyer.name?.split(' ')[0] || "Lawyer"}
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-full border-2 border-cyan-500 text-cyan-200 font-bold py-2 px-4 rounded-lg hover:bg-cyan-500/10 transition"
                  >
                    📤 Share Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add New Lawyer */}
        <div className="bg-[#0d2a52] rounded-2xl shadow-xl overflow-hidden mt-8 border border-cyan-500/40">
          <form onSubmit={handleAddNew} className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-100">Add New Lawyer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newLawyer.name}
                  onChange={handleNewInputChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={newLawyer.specialization}
                  onChange={handleNewInputChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newLawyer.email}
                  onChange={handleNewInputChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={newLawyer.experience}
                  onChange={handleNewInputChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  min="0"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-cyan-200 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newLawyer.imageUrl}
                  onChange={handleNewInputChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-cyan-200 mb-1">Bio / Description</label>
                <textarea
                  name="description"
                  value={newLawyer.description}
                  onChange={handleNewInputChange}
                  rows="4"
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-cyan-500 text-[#051b3d] font-medium rounded hover:bg-cyan-400 transition"
                disabled={addLoading}
              >
                {addLoading ? "Adding..." : "Add Lawyer"}
              </button>
            </div>
          </form>
        </div>

        {/* Related Lawyers Section */}
        {relatedLawyers.length > 0 && (
          <div className="bg-[#0d2a52] rounded-2xl shadow-xl overflow-hidden mt-8 p-8 border border-cyan-500/40">
            <h3 className="text-2xl font-bold mb-6 text-cyan-100">More {lawyer?.specialization} Experts</h3>
            {loadingRelated ? (
              <div className="text-center text-gray-300">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedLawyers.map((rel) => (
                  <Link key={rel.id} to={`/lawyer/${rel.id}`} className="block">
                    <div className="border border-cyan-500/40 rounded-lg overflow-hidden hover:shadow-lg hover:border-cyan-400 transition-all bg-[#051b3d]">
                      <div className="h-40 bg-[#0a1624] flex items-center justify-center overflow-hidden">
                        {rel.imageUrl ? (
                          <img src={rel.imageUrl} alt={rel.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-cyan-100">{rel.name}</h4>
                        <p className="text-sm text-cyan-400 font-medium">{rel.specialization}</p>
                        <p className="text-xs text-gray-400 mt-2">{rel.experience ? `${rel.experience} years exp.` : "Experience N/A"}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyersDetails;