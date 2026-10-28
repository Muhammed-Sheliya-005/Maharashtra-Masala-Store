function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50">


      {/* ========================= */}
      {/* DASHBOARD CONTENT */}
      {/* ========================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">


        {/* ========================= */}
        {/* WELCOME HERO */}
        {/* ========================= */}

        <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-600 to-red-700 rounded-3xl shadow-xl">

          {/* Decorative Circles */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full" />

          <div className="absolute right-20 -bottom-32 w-80 h-80 bg-white/10 rounded-full" />

          <div className="absolute right-1/3 -top-16 w-32 h-32 bg-white/5 rounded-full" />


          <div className="relative px-6 py-10 md:px-10 md:py-14">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-5">
                🌶️ Maharashtra Spices
              </div>

              <p className="text-red-100 text-sm md:text-base font-medium">
                Welcome back 👋
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
                {user?.name || "Customer"}
              </h1>

              <p className="text-red-100 mt-4 text-base md:text-lg leading-relaxed">
                We're happy to have you with us. Discover authentic,
                flavorful and quality spices for your kitchen.
              </p>

            </div>

          </div>

        </section>


        {/* ========================= */}
        {/* DASHBOARD INTRO */}
        {/* ========================= */}

        <section className="mt-8">

          <div className="mb-5">

            <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">
              Explore Maharashtra Spices
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
              Everything You Need for Great Taste
            </h2>

            <p className="text-gray-500 mt-2">
              We bring authentic spices and quality products directly to
              your kitchen.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


            {/* Authentic Spices */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">

              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-red-100 transition">
                🌶️
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-5">
                Authentic Spices
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Enjoy authentic spices carefully selected for rich
                flavour and aroma.
              </p>

            </div>


            {/* Quality */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">

              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-yellow-100 transition">
                ⭐
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-5">
                Quality Products
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                We focus on quality products so you can cook delicious
                meals with confidence.
              </p>

            </div>


            {/* Delivery */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">

              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-orange-100 transition">
                🚚
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-5">
                Fast Delivery
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Get your favourite products delivered conveniently
                to your doorstep.
              </p>

            </div>


            {/* Secure */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200">

              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-green-100 transition">
                🔒
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-5">
                Secure Shopping
              </h3>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Shop comfortably with a simple and secure ordering
                experience.
              </p>

            </div>

          </div>

        </section>


        {/* ========================= */}
        {/* FEATURE BANNER */}
        {/* ========================= */}

        <section className="mt-8 relative overflow-hidden bg-white rounded-3xl border border-gray-200 shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left */}
            <div className="p-7 md:p-10">

              <span className="inline-flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                🛍️ Taste the Difference
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mt-5 leading-tight">
                Bring Authentic
                <span className="text-red-600"> Maharashtra Flavours </span>
                to Your Kitchen
              </h2>

              <p className="text-gray-500 mt-4 leading-relaxed max-w-xl">
                From everyday cooking to special meals, discover spices
                that add rich colour, aroma and authentic taste to your
                favourite dishes.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  🌶️ Rich Flavour
                </span>

                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  ✨ Quality
                </span>

                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  ❤️ Made for You
                </span>

              </div>

            </div>


            {/* Right Visual */}
            <div className="relative bg-gradient-to-br from-red-50 to-orange-50 min-h-[260px] lg:min-h-full flex items-center justify-center overflow-hidden">

              <div className="absolute w-64 h-64 bg-red-200/40 rounded-full" />

              <div className="absolute w-40 h-40 bg-orange-200/40 rounded-full -right-10 -bottom-10" />

              <div className="relative text-center">

                <div className="text-8xl md:text-9xl">
                  🌶️
                </div>

                <p className="mt-3 text-red-700 font-bold text-lg">
                  Authentic • Flavourful • Quality
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ========================= */}
        {/* CUSTOMER SUPPORT */}
        {/* ========================= */}

        <section className="mt-8 bg-gray-900 rounded-3xl overflow-hidden shadow-lg">

          <div className="px-6 py-8 md:px-10 md:py-9">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <p className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                  Need Help?
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  We're Here for You 🤝
                </h2>

                <p className="text-gray-400 mt-2 max-w-xl">
                  Have a question about our products or your order?
                  Our team is happy to help you.
                </p>

              </div>


              <div className="flex items-center gap-3">

                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                  💬
                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Customer Support
                  </p>

                  <p className="text-white font-semibold">
                    We're happy to help
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ========================= */}
        {/* FOOTER MESSAGE */}
        {/* ========================= */}

        <div className="text-center mt-8 pb-4">

          <p className="text-gray-400 text-sm">
            Thank you for choosing
            <span className="text-red-600 font-semibold">
              {" "}Maharashtra Spices
            </span>
            ❤️
          </p>

        </div>

      </main>

    </div>
  );
}

export default UserDashboard;