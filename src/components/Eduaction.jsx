import PROFILE from "../data/profile";

export default function Education() {
  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Education</h2>
        <div className="space-y-4">
          {PROFILE.education.map((edu) => (
            <div key={edu.degree} className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-xl font-bold">{edu.degree}</h3>
              <p className="text-gray-700">{edu.school}</p>
              <span className="text-gray-500">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
