import React from 'react'

const testimonials = [
  {
    quote: "Karrar.ai saves me hours on contract review. The risk scores are accurate and the counter-terms are lawyer-quality.",
    author: "Priya Sharma",
    role: "Freelance Consultant, Mumbai",
    avatar: "PS"
  },
  {
    quote: "As a startup founder, legal fees were killing our budget. Karrar.ai gives us professional contract analysis at a fraction of the cost.",
    author: "Aditya Patel",
    role: "Startup Founder, Bangalore",
    avatar: "AP"
  },
  {
    quote: "The Indian law grounding is exceptional. Every suggestion is compliant with the Indian Contract Act. Highly recommend!",
    author: "Rajesh Kumar",
    role: "SME Owner, Delhi",
    avatar: "RK"
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1c1a17] mb-4">
            Loved by Indian Professionals
          </h2>
          <p className="text-lg text-[#7a7068]">Hear from businesses using Karrar.ai</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="card p-8 bg-white">
              <p className="text-lg text-[#1c1a17] mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#b5924c] text-white flex items-center justify-center font-serif font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-serif font-bold text-[#1c1a17]">{testimonial.author}</p>
                  <p className="text-sm text-[#7a7068]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
