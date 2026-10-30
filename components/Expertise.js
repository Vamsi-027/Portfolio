const skillCategories = [
  { title: 'Languages', skills: ['Java (17+)', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { title: 'Backend Frameworks', skills: ['Spring Boot', 'Apache Struts', 'Express.js', 'REST APIs', 'Microservices'] },
  { title: 'API Design & Testing', skills: ['RESTful APIs', 'OpenAPI/Swagger', 'JUnit 5', 'Mockito', 'Integration Testing'] },
  { title: 'Databases', skills: ['MySQL', 'PostgreSQL', 'Redis', 'ArangoDB', 'DynamoDB'] },
  { title: 'Messaging & EDA', skills: ['Apache Kafka', 'Event-Driven Architecture', 'Asynchronous Processing'] },
  { title: 'Cloud & DevOps', skills: ['AWS (EC2, S3)', 'Docker', 'Kubernetes', 'GitHub Actions CI/CD'] },
]

const Expertise = () => {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <div className="head head--stack">
          <h2 id="expertise-title">Java and Kafka at the core</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Tools</th>
            </tr>
          </thead>
          <tbody>
            {skillCategories.map((category) => (
              <tr key={category.title}>
                <th scope="row">{category.title}</th>
                <td>{category.skills.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Expertise
