import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'

const Services = () => {
  const [lawyersData, setLawyersData] = useState([])
  const [loadingLawyers, setLoadingLawyers] = useState(true)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'lawyers'),
      (snapshot) => {
        const lawyersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setLawyersData(lawyersList)
        setLoadingLawyers(false)
      },
      (error) => {
        console.error('Error fetching lawyers:', error)
        setLoadingLawyers(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <main className="relative overflow-hidden animated-gradient rounded-lg py-8 px-4">
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 text-fade-in">Our Services</h1>
        <p className="text-gray-300 mb-8 text-slide-right animate-delay-200">LawVerse AI provides a suite of AI-powered legal products designed for law firms, corporate legal teams, and compliance departments.</p>

        {/* Our Legal Experts (moved from Home) */}
        <section className="mt-10">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6 text-scale-in animate-delay-400">Our Legal Experts</h2>
          {loadingLawyers ? (
            <div className="text-center text-gray-300 animate-pulse">Loading lawyers...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lawyersData.length > 0 ? (
                lawyersData.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="relative bg-[#071022] border border-cyan-400 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-visible flex flex-col"
                  >
                    <div className="h-48 bg-[#0a1624] w-full flex items-center justify-center overflow-hidden">
                      {lawyer.imageUrl ? (
                        <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-gray-500">No Image</div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow text-gray-100">
                      <h3 className="text-xl font-semibold mb-1 text-cyan-200">{lawyer.name || 'Lawyer Name'}</h3>
                      <p className="text-cyan-300 text-sm font-medium mb-3 uppercase tracking-wide">
                        {lawyer.specialization || 'General Practice'}
                      </p>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                        {lawyer.description || lawyer.bio || 'No description provided.'}
                      </p>
                      <div className="mt-auto flex items-center justify-end space-x-2">
                        <Link to={`/lawyer/${lawyer.id}`}>
                          <button className="px-4 py-2 bg-cyan-400 text-[#071122] rounded-md font-semibold hover:bg-cyan-300 transition">
                            View Details
                          </button>
                        </Link>
                        <details className="relative">
                          <summary className="list-none px-3 py-2 border border-cyan-400 rounded-md text-cyan-200 hover:bg-cyan-400/10 transition cursor-pointer">
                            View Data
                          </summary>
                          <div className="absolute right-0 mt-2 w-72 max-h-64 overflow-auto bg-[#0a1624] border border-cyan-400/60 rounded-md shadow-lg p-3 text-xs text-gray-200 z-10">
                            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(lawyer, null, 2)}</pre>
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400">No lawyers found in the database.</p>
              )}
            </div>
          )}
        </section>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <article className="bg-[#071022] border border-cyan-400 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-cyan-200">Contract Review</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-400 text-[#071122]">Popular</span>
            </div>
            <p className="text-gray-300 mb-4">Automated analysis highlights risks, obligations, and missing clauses — save hours on each contract.</p>
            <ul className="text-gray-300 list-disc list-inside text-sm mb-4">
              <li>Risk scoring</li>
              <li>Clause extraction</li>
              <li>Redline suggestions</li>
            </ul>
            <div className="flex items-center gap-3">
              <button data-modal-target="trialModal" data-modal-toggle="trialModal" className="px-4 py-2 bg-cyan-400 text-[#071122] rounded-md font-semibold">Start Trial</button>
              <a href="#details" className="text-cyan-200">Learn more</a>
            </div>
          </article>

          <article className="bg-[#071022] border border-cyan-400 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-cyan-200">Legal Research</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#0a1624] text-cyan-200">Enterprise</span>
            </div>
            <p className="text-gray-300 mb-4">Find precedent, statutes, and case law faster with semantic search tailored to legal language.</p>
            <ul className="text-gray-300 list-disc list-inside text-sm mb-4">
              <li>Semantic search</li>
              <li>Citation tracing</li>
              <li>Summaries & insights</li>
            </ul>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-cyan-400 rounded-md text-cyan-200">Request Demo</button>
              <a href="#details" className="text-cyan-200">Docs</a>
            </div>
          </article>

          <article className="bg-[#071022] border border-cyan-400 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-cyan-200">Compliance & Due Diligence</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-400 text-[#071122]">Audit-ready</span>
            </div>
            <p className="text-gray-300 mb-4">Automate compliance checks across jurisdictions and accelerate due diligence for M&amp;A.</p>
            <ul className="text-gray-300 list-disc list-inside text-sm mb-4">
              <li>Regulatory mapping</li>
              <li>Automated checklists</li>
              <li>Custom rule engines</li>
            </ul>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-cyan-400 text-[#071122] rounded-md font-semibold">Get Started</button>
              <a href="#details" className="text-cyan-200">Learn more</a>
            </div>
          </article>
        </div>

        {/* Details accordion */}
        <div className="mb-8" id="details">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Service Details</h2>

          <div id="accordion-flush" data-accordion="collapse" className="bg-[#071022] rounded-lg p-2 shadow-sm">
            <h3 className="border-b">
              <button type="button" className="w-full flex items-center justify-between p-4 font-medium text-left text-gray-100" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                Contract Review — Key Capabilities
                <svg data-accordion-icon className="w-6 h-6 rotate-180 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </h3>
            <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
              <div className="p-4 text-gray-300 border-b border-[#0f1c2e]">
                Our contract review highlights risk items, extracts key clauses, and suggests redlines. Results export in PDF, DOCX, or structured JSON for workflows.
              </div>
            </div>

            <h3 className="border-b">
              <button type="button" className="w-full flex items-center justify-between p-4 font-medium text-left text-gray-100" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="#accordion-flush-body-2">
                Legal Research — How it helps
                <svg data-accordion-icon className="w-6 h-6 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </h3>
            <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
              <div className="p-4 text-gray-300 border-b border-[#0f1c2e]">
                Semantic search across curated legal corpora with filtering by jurisdiction, date, and relevance. Summaries and citation chains are produced automatically.
              </div>
            </div>

            <h3>
              <button type="button" className="w-full flex items-center justify-between p-4 font-medium text-left text-gray-100" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="#accordion-flush-body-3">
                Compliance & Due Diligence
                <svg data-accordion-icon className="w-6 h-6 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </h3>
            <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
              <div className="p-4 text-gray-300">
                Automate cross-border checks with customizable rule sets and produce audit-ready reports for compliance teams.
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-300">Research Accuracy</span>
              <span className="text-sm font-medium text-gray-200">91%</span>
            </div>
            <div className="w-full bg-[#071022] rounded-full h-3">
              <div className="bg-cyan-400 h-3 rounded-full" style={{ width: '91%' }} />
            </div>
          </div>
        </div>

        {/* Integrations table */}
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Integrations</h2>
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-white/5 text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">Service</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4">DocuVault</td>
                <td className="px-6 py-4">DMS</td>
                <td className="px-6 py-4">Two-way sync, metadata mapping</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-6 py-4">CaseCentral</td>
                <td className="px-6 py-4">Case Mgmt</td>
                <td className="px-6 py-4">Read/write connector</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Okta</td>
                <td className="px-6 py-4">SSO</td>
                <td className="px-6 py-4">SAML/SCIM support</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal (trial) */}
        <div>
          <div id="trialModal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-24">
              <div className="relative bg-[#07122a] rounded-lg shadow">
                <div className="flex items-start justify-between p-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-100">Start Your Free Trial</h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="trialModal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-gray-300">Enter your email and we'll set up a free 14-day trial with sample datasets and integrations.</p>
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="you@company.com" className="flex-1 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900" required />
                    <button className="px-4 py-2 bg-cyan-400 text-[#071122] rounded-md">Request Trial</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/signup" className="inline-block px-8 py-3 bg-cyan-400 text-[#071122] rounded-md font-semibold hover:bg-cyan-300 transition">Start a Free Trial</a>
        </div>
      </div>
    </main>
  )
}

export default Services