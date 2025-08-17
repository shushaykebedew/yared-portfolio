import PROFILE from "../data/profile";
import profileImg from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-800 text-white px-6">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-5xl font-bold mb-4">{PROFILE.name}</h1>
        <p className="text-xl mb-2">{PROFILE.title}</p>
        <p className="text-lg mb-6">{PROFILE.intro}</p>
        <a
          href={PROFILE.website}
          target="_blank"
          className="bg-cyan-500 px-6 py-3 rounded hover:bg-cyan-400 transition"
        >
          Visit My Portfolio
        </a>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={profileImg}
          alt={PROFILE.name}
          className="w-64 h-64 rounded-full object-cover border-4 border-cyan-500"
        />
      </div>
    </section>
  );
}
