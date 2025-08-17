import PROFILE from "../data/profile";

export default function Contact() {
  return (
    <section className="py-16 bg-gray-100 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="mb-4">Email: {PROFILE.email}</p>
        <p className="mb-4">Phone: {PROFILE.phone}</p>
        <div className="flex justify-center gap-4 mt-4">
          <a
            href={PROFILE.github}
            target="_blank"
            className="text-cyan-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            className="text-cyan-500 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.website}
            target="_blank"
            className="text-cyan-500 hover:underline"
          >
            Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
