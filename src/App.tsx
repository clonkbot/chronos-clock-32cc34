import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="min-h-dvh bg-[#F5F3F0] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#2C2C2C] flex items-center justify-center">
            <div className="w-0.5 h-3 md:h-4 bg-[#C4653A] rounded-full origin-bottom" style={{ transform: 'rotate(-30deg)' }} />
          </div>
          <span className="font-display text-lg md:text-xl tracking-[0.2em] text-[#2C2C2C]">CHRONOS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8 md:px-10">
        {/* Clock Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-10 md:mb-14">
          {/* Clock Face */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #FFFFFF, #E8E6E3)',
              boxShadow: '20px 20px 60px #D1CFCC, -20px -20px 60px #FFFFFF, inset 0 0 20px rgba(255,255,255,0.8)'
            }}
          >
            {/* Inner ring */}
            <div
              className="absolute inset-3 rounded-full border border-[#E0DEDA]"
              style={{
                background: 'linear-gradient(145deg, #FAFAF9, #F0EEEB)'
              }}
            />

            {/* Brand name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[10px] md:text-xs tracking-[0.15em] text-[#C4653A] font-medium"
                style={{ marginTop: '-45px' }}
              >
                CHRONOS
              </span>
            </div>

            {/* Hour markers */}
            {[12, 3, 6, 9].map((num, i) => {
              const positions = [
                { top: '12%', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', right: '10%', transform: 'translateY(-50%)' },
                { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
                { top: '50%', left: '10%', transform: 'translateY(-50%)' }
              ];
              return (
                <span
                  key={num}
                  className="absolute text-sm md:text-base font-display text-[#2C2C2C] font-medium"
                  style={positions[i]}
                >
                  {num}
                </span>
              );
            })}

            {/* Tick marks */}
            {[...Array(60)].map((_, i) => {
              const isHour = i % 5 === 0;
              const rotation = i * 6;
              if ([0, 15, 30, 45].includes(i)) return null; // Skip number positions
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 origin-bottom"
                  style={{
                    transform: `translateX(-50%) rotate(${rotation}deg)`,
                    height: '45%'
                  }}
                >
                  <div
                    className={`w-px ${isHour ? 'h-2.5 bg-[#2C2C2C]' : 'h-1.5 bg-[#C0BDB8]'}`}
                    style={{ marginTop: '4px' }}
                  />
                </div>
              );
            })}

            {/* Hour hand */}
            <div
              className="absolute left-1/2 top-1/2 origin-bottom transition-transform"
              style={{
                transform: `translateX(-50%) rotate(${hourDeg}deg)`,
                height: '22%',
                marginTop: '-22%'
              }}
            >
              <div
                className="w-1.5 h-full bg-[#2C2C2C] rounded-full"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '1px 1px 4px rgba(0,0,0,0.15)'
                }}
              />
            </div>

            {/* Minute hand */}
            <div
              className="absolute left-1/2 top-1/2 origin-bottom transition-transform"
              style={{
                transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
                height: '32%',
                marginTop: '-32%'
              }}
            >
              <div
                className="w-1 h-full bg-[#2C2C2C] rounded-full"
                style={{
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  boxShadow: '1px 1px 4px rgba(0,0,0,0.15)'
                }}
              />
            </div>

            {/* Second hand */}
            <div
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${secondDeg}deg)`,
                height: '38%',
                marginTop: '-38%',
                transition: 'transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
              }}
            >
              <div className="w-0.5 h-full bg-[#C4653A] rounded-full" />
            </div>

            {/* Center cap */}
            <div
              className="absolute left-1/2 top-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#2C2C2C] -translate-x-1/2 -translate-y-1/2"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
            >
              <div className="absolute inset-1 rounded-full bg-[#C4653A]" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-md px-4">
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-[#C4653A] font-medium mb-3 md:mb-4">
            THE CASE FOR ANALOG
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C] leading-tight mb-4 md:mb-6">
            Time<br />
            <em className="font-normal">Deserves</em><br />
            Precision
          </h1>
          <p className="text-sm md:text-base text-[#6B6860] leading-relaxed max-w-sm mx-auto">
            In an age of digital distraction, analog clocks offer something profound:
            a tangible connection to the passage of time.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 md:px-10 md:py-5 text-center">
        <p className="text-[10px] md:text-xs text-[#A8A49C] tracking-wide">
          Requested by <span className="text-[#7A766E]">@PauliusX</span> · Built by <span className="text-[#7A766E]">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
