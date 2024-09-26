function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-background border-b border-muted">
      <a href="/" className="text-2xl font-bold">
        Thomson P<span className="text-green-400">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a
          href="/login"
          className="px-9 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
        >
          Sign up
        </a>
      </div>
      <button className="md:hidden">Menu</button>
    </nav>
  );
}

function HeroSection() {
  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired,
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src="https://s3-alpha-sig.figma.com/img/14d0/ff1e/c045ed1d618b25c84aa4327331ecdaaf?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bn23rfauU9Vo2JZBCnSrOOH4fvcDp3RVcQKQnKfgzLweRCaPnG9W-EL3Y1KTZEIurmVd2CSy4XRKt9uS5R73SiSpRwjF-MKLHYXN-S9nrAqCkgN8YXV~FLWPgUFbVyVMEJmI8YPqwUKT3a9pqWhFsAwDzHEleB01X6HJunynyTt94XHnRy9q4P3mOEpj3EQn5YzQ4KKFcVrWFehS9doRzXyIyjQ45Wkdi7Y3TW~sR4VaVI-G2l0IzJwAE6LCFc~c0~0uwg2ua6lATcc5PzsgIG9~gntupkzhncQ6ehAyMtPJ~WjKrR9FomTrFL2FOoR01Hya~JUzMiRJLxOmJAApgg__"
          alt="Person with a cat"
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">Thompson P.</h3>
          <p className="text-muted-foreground mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-muted-foreground">
            When I&apos;m not writing, I spend time volunteering at my local
            animal shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
    </>
  );
}

export default App;
