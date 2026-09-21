export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full aspect-[3/2] overflow-hidden bg-[#211102]">
      {/* If using an MP4/WebM video (recommended for performance) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain md:object-cover object-center"
      >
        <source src="/Zana.mp4" type="video/mp4" />
      </video>

      {/* Alternatively, if using a standard .gif file:
      <img
        src="/path-to-your-gif.gif"
        alt="Hero animation"
        className="w-full h-full object-contain md:object-cover object-center"
      />
      */}
    </section>
  );
}