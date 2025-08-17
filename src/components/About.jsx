import PROFILE from "../data/profile";

export default function About() {
  return (
    <section className="py-16 bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg text-gray-700">{PROFILE.intro}</p>
      </div>
    </section>
  );
}
