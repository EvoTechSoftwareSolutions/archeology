const Footer = () => {

  return (

    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-3 gap-8">


          <div>
            <h2 className="text-xl font-bold">
              Archeology
            </h2>

            <p className="mt-3 text-gray-400">
              Preserving historical heritage
              through digital technology.
            </p>
          </div>


          <div>
            <h3 className="font-semibold">
              Quick Links
            </h3>

            <p>Home</p>
            <p>Heritage</p>
            <p>About</p>

          </div>


          <div>
            <h3 className="font-semibold">
              Contact
            </h3>

            <p>Email: info@test.com</p>
            <p>Phone: +94 77 0000000</p>

          </div>


        </div>


        <div className="border-t mt-6 pt-4 text-center">

          © 2026 Archeology. All rights reserved.

        </div>


      </div>


    </footer>

  );

};


export default Footer;