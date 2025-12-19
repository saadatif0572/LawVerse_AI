import React from 'react'

const PrivacyPolicy = () => {
  return (
    <main className="relative overflow-hidden animated-gradient rounded-lg py-8 px-4">
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="max-w-4xl mx-auto text-gray-300 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4 text-fade-in">Privacy Policy</h1>
        <p className="text-gray-400 mb-6 text-slide-right animate-delay-200">Last updated: December 2, 2025</p>

        {/* Alert (Flowbite component) */}
        <div className="mb-6">
          <div className="p-4 mb-4 text-sm text-cyan-200 bg-[#071022] rounded-lg" role="alert">
            <span className="font-medium">Notice:</span> We process personal data only as described below. For any concerns contact <a href="mailto:privacy@lawverse-ai.com" className="text-cyan-200">privacy@lawverse-ai.com</a>.
          </div>
        </div>

        {/* Accordion for sections (Flowbite component) */}
        <div className="mb-6">
          <div id="privacy-accordion" data-accordion="collapse" className="bg-[#071022] rounded-lg p-2">
            <h3 className="border-b border-[#0f1c2e]">
              <button type="button" className="w-full flex items-center justify-between p-4 font-medium text-left text-gray-100" data-accordion-target="#privacy-body-1" aria-expanded="true" aria-controls="privacy-body-1">
                Information We Collect
                <svg data-accordion-icon className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </h3>
            <div id="privacy-body-1" className="hidden" aria-labelledby="privacy-heading-1">
              <div className="p-4 text-gray-300 border-b border-[#0f1c2e]">
                <ul className="list-disc list-inside">
                  <li>Account information (name, email)</li>
                  <li>Uploaded documents and metadata</li>
                  <li>Usage and analytics data</li>
                </ul>
              </div>
            </div>

            <h3 className="border-b border-[#0f1c2e]">
              <button type="button" className="w-full flex items-center justify-between p-4 font-medium text-left text-gray-100" data-accordion-target="#privacy-body-2" aria-expanded="false" aria-controls="privacy-body-2">
                How We Use Information
                <svg data-accordion-icon className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </h3>
            <div id="privacy-body-2" className="hidden" aria-labelledby="privacy-heading-2">
              <div className="p-4 text-gray-300 border-b border-[#0f1c2e]">
                <p>We use information to provide and improve services, for billing, to communicate updates, and to comply with legal obligations.</p>
              </div>
            </div>

            <h3>
              <button type="button" className="w-full flex items-center justify-between p-4 font-medium text-left text-white" data-accordion-target="#privacy-body-3" aria-expanded="false" aria-controls="privacy-body-3">
                Data Security
                <svg data-accordion-icon className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </h3>
            <div id="privacy-body-3" className="hidden" aria-labelledby="privacy-heading-3">
              <div className="p-4 text-gray-300">
                <p>We implement reasonable safeguards including encryption at rest and in transit, access controls, and regular audits to protect data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data processing table (Flowbite styled) */}
        <div className="mb-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">Data Processing Summary</h2>
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs bg-white/5 text-gray-200">
              <tr>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Purpose</th>
                <th className="px-6 py-3">Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">Account Info</td>
                <td className="px-6 py-4">User identity & access</td>
                <td className="px-6 py-4">Contractual necessity</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4">Documents</td>
                <td className="px-6 py-4">Provide services & search</td>
                <td className="px-6 py-4">Consent / legitimate interest</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* List group for rights (Flowbite component) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-200 mb-2">Your Rights</h2>
          <ul className="divide-y rounded-lg bg-[#071022] shadow-sm">
            <li className="px-4 py-3">Access: Request a copy of your data.</li>
            <li className="px-4 py-3">Correction: Ask us to correct inaccuracies.</li>
            <li className="px-4 py-3">Deletion: Request deletion where applicable.</li>
          </ul>
        </div>

        {/* Tooltip example (Flowbite component) */}
        <div className="mb-6 relative">
          <button type="button" data-tooltip-target="privacy-tooltip" className="px-4 py-2 bg-cyan-400 text-[#071122] rounded-md">How we secure data</button>
          <div id="privacy-tooltip" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity">
            We use encryption at rest and in transit, plus access controls.
            <div className="tooltip-arrow" data-popper-arrow />
          </div>
        </div>

        {/* Badges + CTA */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-400 text-[#071122]">GDPR Ready</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#7dd3fc] text-cyan-900">ISO27001</span>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Contact</h2>
          <p className="text-gray-300">If you have questions about this policy, please contact us at <a href="mailto:support@lawverse-ai.com" className="text-cyan-400">support@lawverse-ai.com</a>.</p>
        </section>

        <div className="text-center">
          <a href="/" className="inline-block px-6 py-2 bg-[#071022] border border-cyan-400 text-cyan-400 rounded-md hover:bg-[#071022]/80 transition">Return to Home</a>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy
