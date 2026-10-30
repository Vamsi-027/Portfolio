const Hero = () => {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__col">
        <h1 id="hero-title">Backends built<br /> to absorb<br /> failure.</h1>
        <p className="lead">
          I’m Vamsi Cheruku, a backend engineer moving into agentic AI systems.
        </p>
        <div className="hero__actions">
          <a href="mailto:vamsicheruku18@gmail.com" className="btn btn--primary">
            Email me
          </a>
          <a
            href="https://drive.google.com/file/d/173yYb__jgmFVVInXkr7kYiJFjJcJfZY9/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Read resume
          </a>
        </div>
        <dl className="panels readout" aria-label="The record">
          <div>
            <dt>Zoho Corporation</dt>
            <dd className="measured cool">07/2022 to 07/2024</dd>
          </div>
          <div>
            <dt>MS in AI, Saint Louis University</dt>
            <dd className="measured cool">GPA 3.74/4.00</dd>
          </div>
          <div>
            <dt>Open to backend roles</dt>
            <dd className="measured person">from 05/2026</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default Hero
