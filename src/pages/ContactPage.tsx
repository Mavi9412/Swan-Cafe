import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { CAFE_INFO } from '../data/config';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do you offer party and corporate custom donut boxes?',
      a: 'Yes! We create custom dozen and double-dozen boxes with assorted glazes, sprinkles, and personalized messages for birthdays, office meetings, and special events. Please contact us 24 hours in advance.',
    },
    {
      q: 'How does the 50% OFF promo work?',
      a: 'All our handcrafted drinks and artisan donuts are already discounted by 50% across the entire menu as part of our Always Fresh season promotion. Voucher code SWAN50 verifies this active discount at checkout.',
    },
    {
      q: 'What dairy alternatives are available for coffee?',
      a: 'We offer Barista-grade Oat Milk and Almond Milk for all our hot and iced coffee creations, alongside standard whole and skim dairy options.',
    },
    {
      q: 'Can I place an order for immediate counter pickup?',
      a: 'Yes, online pickup orders are typically prepared and packaged within 15 minutes. You will receive real-time status updates on our order tracking page.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header */}
      <div className="bg-swan-espresso text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-swan-gold/30 text-center">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-swan-amber bg-swan-dark/70 px-3.5 py-1 rounded-full border border-swan-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-swan-gold" /> We Are Here For You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
            Visit & Contact Us
          </h1>
          <p className="text-sm sm:text-base text-swan-sand/80">
            Stop by for fresh coffee and donuts, or get in touch for special catering orders and inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-swan-sand/60 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-swan-espresso text-swan-amber flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-swan-dark mb-1">Our Location</h3>
              <p className="text-xs text-swan-cocoa leading-relaxed">
                <strong>{CAFE_INFO.name} Flagship</strong><br />
                {CAFE_INFO.address.shopNo}, {CAFE_INFO.address.building}<br />
                {CAFE_INFO.address.street}<br />
                {CAFE_INFO.address.landmark}, {CAFE_INFO.address.city}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-swan-sand/60 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-swan-espresso text-swan-gold flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-swan-dark mb-1">Opening Hours</h3>
              <p className="text-xs text-swan-cocoa leading-relaxed">
                <strong>Sat – Thu:</strong> 7:00 AM – Midnight<br />
                <strong>Friday:</strong> 8:00 AM – 1:00 AM<br />
                {CAFE_INFO.hours.bakeTimes}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-swan-sand/60 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-swan-espresso text-swan-pinkDeep flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-swan-dark mb-1">Direct Contact</h3>
              <p className="text-xs text-swan-cocoa leading-relaxed">
                <strong>Mobile / WhatsApp:</strong> {CAFE_INFO.phone}<br />
                <strong>Landline:</strong> {CAFE_INFO.landline}<br />
                <strong>Email:</strong> {CAFE_INFO.email}<br />
                <strong>Catering Orders:</strong> {CAFE_INFO.cateringEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Map & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Map & Ambiance */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-swan-espresso text-white border border-swan-gold/40 shadow-luxury flex flex-col justify-between">
            <div className="relative aspect-video w-full overflow-hidden bg-swan-dark">
              <img
                src="/assets/images/cafe-interior.jpg"
                alt="Swan Cafe Store Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-swan-dark via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-bold text-swan-sand">
                Swan Cafe Interior & Espresso Bar
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="font-serif font-bold text-xl text-white">
                Welcoming You In Person
              </h3>
              <p className="text-xs text-swan-sand/80 leading-relaxed">
                Step inside our warm, wood-accented cafe filled with the rich aroma of freshly pulled espresso and warm brioche glaze. Whether meeting friends or working remotely, our cozy seating and high-speed Wi-Fi await.
              </p>
              <div className="pt-2 border-t border-swan-cocoa/40 flex items-center gap-2 text-xs text-swan-amber font-semibold">
                <Sparkles className="w-4 h-4" /> Indoor & outdoor terrace seating available
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-swan-sand/60 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-bold text-2xl text-swan-dark">
                Send Us a Message
              </h3>
              <p className="text-xs text-swan-cocoa mt-1">
                Have a catering request, question, or feedback? Drop us a note below.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-green-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-green-700 max-w-sm mx-auto">
                  Thank you for reaching out to Swan Cafe. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-green-700 text-white rounded-xl text-xs font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full text-xs p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full text-xs p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none bg-white cursor-pointer"
                  >
                    <option value="General Question">General Inquiry</option>
                    <option value="Catering & Party Order">Catering & Event Donut Boxes</option>
                    <option value="Online Order Inquiry">Online Order Question</option>
                    <option value="Feedback">Feedback & Praise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-swan-mocha mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help make your day sweeter?"
                    className="w-full text-xs p-3 rounded-xl border border-swan-sand focus:border-swan-gold outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-swan-espresso hover:bg-swan-dark text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-swan-gold" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-10 border-t border-swan-sand/40">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-swan-caramel">
              Common Questions
            </span>
            <h3 className="font-serif text-2xl font-bold text-swan-dark">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-swan-sand/50 shadow-sm space-y-1.5">
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-swan-gold flex-shrink-0 mt-0.5" />
                  <h4 className="font-serif font-bold text-sm text-swan-dark">{faq.q}</h4>
                </div>
                <p className="text-xs text-swan-cocoa leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
