function Contact() {
  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

          <div className="text-center max-w-3xl mx-auto">

            <p className="text-orange-600 font-bold text-sm tracking-[0.25em] uppercase">
              Get In Touch
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
              Contact
              <span className="text-orange-600"> Us</span>
            </h1>

            <p className="text-gray-600 text-lg mt-5 leading-relaxed">
              Have a question? Get in touch with Maharashtra Spices.
              We are happy to help you with our products and services.
            </p>

          </div>

        </div>
      </section>


      {/* ================= CONTACT CARDS ================= */}
      <section className="py-16">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-6">

            {/* CALL US */}
            <div className="group bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition">
                📞
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Call Us
              </h3>

              <p className="text-gray-700 font-semibold mt-3">
                +91 98220 12345
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Available Mon - Sat for inquiries
              </p>

            </div>


            {/* VISIT US */}
            <div className="group bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="mx-auto w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition">
                📍
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Visit Us
              </h3>

              <p className="text-gray-700 font-semibold mt-3">
                Raviwar Peth, Pune
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Shop No. 12, Spice Market, Pune 411002
              </p>

            </div>


            {/* OPENING HOURS */}
            <div className="group bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition">
                🕘
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6">
                Opening Hours
              </h3>

              <p className="text-gray-500 mt-3">
                9:00 AM – 9:00 PM
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Open every day
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HELP SECTION ================= */}
      <section className="py-16 bg-gray-50">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">

            <div className="text-center">

              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl text-3xl">
                🌶️
              </div>

              <p className="text-orange-600 font-bold text-sm tracking-widest uppercase mt-6">
                Maharashtra Spices
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Need Help With Your Order?
              </h2>

              <p className="text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">
                Whether you want to know more about our masalas,
                check product availability or need help with your
                order, feel free to contact us.
              </p>

            </div>


            {/* QUICK INFO */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">

              <div className="bg-orange-50 rounded-2xl p-5 text-center">
                <p className="text-2xl">📞</p>
                <p className="font-bold text-gray-900 mt-2">
                  Quick Support
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Get in touch with us
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <p className="text-2xl">🌿</p>
                <p className="font-bold text-gray-900 mt-2">
                  Fresh Products
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Quality spices & masalas
                </p>
              </div>

              <div className="bg-red-50 rounded-2xl p-5 text-center">
                <p className="text-2xl">❤️</p>
                <p className="font-bold text-gray-900 mt-2">
                  Customer Care
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  We value every customer
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600">

        <div className="max-w-5xl mx-auto px-6 py-14 text-center">

          <p className="text-orange-100 font-semibold text-sm tracking-widest uppercase">
            We Are Here For You
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
            Have Something to Ask?
          </h2>

          <p className="text-orange-100 mt-4">
            Don't hesitate to get in touch with Maharashtra Spices.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Contact;