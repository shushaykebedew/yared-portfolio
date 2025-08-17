import PROFILE from "../data/profile";

export default function Skills() {
  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {PROFILE.skills.map((skill) => (
            <span
              key={skill}
              className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
