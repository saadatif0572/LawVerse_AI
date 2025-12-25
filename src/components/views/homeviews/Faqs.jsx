const Faqs = () => {
  const faqs = [
    { q: 'How does LawVerse AI ensure document confidentiality?', a: 'We use enterprise-grade encryption and comply with GDPR, CCPA, and legal privilege protections.' },
    { q: 'Can AI truly understand complex legal language?', a: 'Yes, our AI is trained on millions of legal documents and continuously learns from domain experts.' },
    { q: 'What file formats does LawVerse AI support?', a: 'We support PDF, DOCX, DOC, TXT, and can handle scanned documents with OCR.' },
    { q: 'Is there a free trial available?', a: 'Yes! Start with 5 free document reviews. Upgrade anytime to unlock unlimited access.' },
  ]

  return (
    <section className="fade-in bg-[#0f1c2e] rounded-lg p-8 md:p-12 mb-8">
      <h2 className="text-center text-cyan-400 text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#1a2a42] border-l-4 border-cyan-400 rounded p-4 mb-4">
            <h4 className="text-cyan-200 font-bold mb-2">Q: {faq.q}</h4>
            <p className="text-gray-300 leading-relaxed">A: {faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Faqs
