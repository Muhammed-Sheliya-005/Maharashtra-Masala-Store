function About() {
  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

          <div className="text-center max-w-3xl mx-auto">

            <p className="text-orange-600 font-bold text-sm tracking-[0.25em] uppercase">
              About Maharashtra Spices
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
              Bringing Authentic
              <span className="block text-orange-600">
                Maharashtra Flavours
              </span>
              to Your Kitchen
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              We provide quality masalas, fresh loose spices, traditional
              pickles and premium whole spices made for everyday cooking.
            </p>

          </div>

        </div>
      </section>


      {/* ================= OUR STORY ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>

              <p className="text-orange-600 font-bold text-sm tracking-widest uppercase">
                Our Story
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Simple Ingredients.
                <span className="block text-orange-600">
                  Authentic Taste.
                </span>
              </h2>

              <p className="text-gray-600 mt-6 leading-relaxed">
                Maharashtra Spices is focused on bringing fresh and
                authentic Indian spices to your everyday kitchen.
                From traditional masalas to loose spices and pickles,
                we aim to provide products that deliver great taste
                and quality.
              </p>

              <p className="text-gray-600 mt-4 leading-relaxed">
                We believe that good food starts with good ingredients.
                That's why we focus on freshness, quality and the
                traditional flavours that make Maharashtrian cooking
                special.
              </p>

            </div>


            {/* Right */}
            <div className="grid grid-cols-2 gap-5">

              <div className="bg-orange-50 rounded-3xl p-8 text-center border border-orange-100">
                <div className="text-5xl mb-4">
                  🌶️
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Fresh Spices
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Carefully selected spices for better flavour.
                </p>
              </div>


              <div className="bg-red-50 rounded-3xl p-8 text-center border border-red-100 mt-8">
                <div className="text-5xl mb-4">
                  🫙
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Traditional
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Traditional flavours for everyday meals.
                </p>
              </div>


              <div className="bg-green-50 rounded-3xl p-8 text-center border border-green-100">
                <div className="text-5xl mb-4">
                  🌿
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Quality
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Products selected with care and attention.
                </p>
              </div>


              <div className="bg-yellow-50 rounded-3xl p-8 text-center border border-yellow-100 mt-8">
                <div className="text-5xl mb-4">
                  ❤️
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Made With Care
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Taste and satisfaction are our priority.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-orange-600 font-bold text-sm tracking-widest uppercase">
              What We Offer
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Everything You Need for Authentic Taste
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Explore our range of spices and traditional products
              prepared for your everyday cooking needs.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">
                🌶️
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Ready-made Masala
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Convenient masala blends for delicious everyday dishes.
              </p>

            </div>


            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl">
                🌿
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Loose Spices
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Fresh spices available by weight for your kitchen.
              </p>

            </div>


            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl">
                🥭
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Traditional Pickles
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Spicy and traditional pickles full of authentic flavour.
              </p>

            </div>


            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
                🌰
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Akkha Masala
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Premium whole spices for rich and aromatic cooking.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-orange-600 font-bold text-sm tracking-widest uppercase">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Quality You Can Taste
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            <div className="text-center p-8 rounded-3xl bg-orange-50 border border-orange-100">

              <div className="text-5xl">
                ✨
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Quality Products
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                We focus on providing quality spices and masalas
                for your everyday cooking.
              </p>

            </div>


            <div className="text-center p-8 rounded-3xl bg-green-50 border border-green-100">

              <div className="text-5xl">
                🌿
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Fresh Ingredients
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Fresh spices help bring better aroma, flavour and
                taste to your meals.
              </p>

            </div>


            <div className="text-center p-8 rounded-3xl bg-red-50 border border-red-100">

              <div className="text-5xl">
                ❤️
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Customer First
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                We want every customer to enjoy authentic flavours
                and a satisfying shopping experience.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600">

        <div className="max-w-5xl mx-auto px-6 py-16 text-center">

          <p className="text-orange-100 font-semibold tracking-widest text-sm uppercase">
            Taste The Difference
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
            Bring Authentic Flavours to Your Kitchen
          </h2>

          <p className="text-orange-100 mt-4 max-w-2xl mx-auto">
            Explore our collection of masalas, spices and traditional
            products and find your favourite flavours.
          </p>

          <a
            href="/products"
            className="inline-block mt-7 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition duration-300 shadow-lg"
          >
            Explore Products →
          </a>

        </div>

      </section>

    </div>
  );
}

export default About;