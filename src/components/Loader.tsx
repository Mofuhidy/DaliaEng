export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-canvas">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-px bg-navy/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-navy w-full transition-transform duration-2000 ease-in-out animate-loader-slide"></div>
        </div>
        <span className="mt-4 font-sans text-[10px] tracking-[0.4em] uppercase text-navy/60 animate-pulse">
          Dalia Al Dukhain
        </span>
      </div>
    </div>
  );
}
