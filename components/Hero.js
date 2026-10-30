const Hero = () => {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__statement">
        <h1 id="hero-title">Backends built to absorb failure.</h1>
        <p className="hero__lead">
          I’m Vamsi Cheruku, a backend engineer who now builds LLM agent pipelines.
        </p>
        <div className="hero__actions">
          <a href="mailto:vamsicheruku18@gmail.com" className="pill pill--ink">
            Email me
          </a>
          <a href="#projects" className="pill">
            See the projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
