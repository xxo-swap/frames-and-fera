export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#211102]">
      {/* Mobile / Vertical Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="block md:hidden w-full h-full object-cover object-center"
      >
        <source src="/ZanaVertical.mp4" type="video/mp4" />
      </video>

      {/* Desktop / Horizontal Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block w-full h-full object-cover object-center"
      >
        <source src="/ZanaHorizontal.mp4" type="video/mp4" />
      </video>
    </section>
  );
}