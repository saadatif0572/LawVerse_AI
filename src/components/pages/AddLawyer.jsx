import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../commons/AuthProvider'

const AddLawyer = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    experience: '',
    imageUrl: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!user) {
      setError('Please sign in to add yourself as a lawyer.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        ...formData,
        experience: formData.experience ? Number(formData.experience) : '',
        ownerId: user.uid,
        createdAt: new Date().toISOString(),
      }
      const docRef = await addDoc(collection(db, 'lawyers'), payload)
      navigate(`/lawyer/${docRef.id}`)
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Unable to add lawyer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative overflow-hidden animated-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#0d2a52] rounded-2xl shadow-xl overflow-hidden border border-cyan-500/40">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-cyan-100">Add yourself as a lawyer</h1>
                <p className="mt-1 text-sm text-cyan-200/80">Create your public lawyer profile.</p>
              </div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-cyan-500/40 rounded text-cyan-200 hover:bg-cyan-500/10 transition"
              >
                Back
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  min="0"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-cyan-200 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-cyan-200 mb-1">Bio / Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#051b3d] border border-cyan-500/40 rounded p-2 text-cyan-100 focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-cyan-500 text-[#051b3d] font-medium rounded hover:bg-cyan-400 transition"
                disabled={loading}
              >
                {loading ? 'Adding…' : 'Add Lawyer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddLawyer
