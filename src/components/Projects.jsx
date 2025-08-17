import PROFILE from "../data/profile";

export default function Projects() {
  return (
    <section className="py-16 bg-gray-100 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PROFILE.projects.map((project) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              className="border rounded-lg p-6 hover:shadow-lg transition bg-white"
            >
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
