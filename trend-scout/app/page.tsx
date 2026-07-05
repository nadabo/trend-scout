'use client';
import { useState } from 'react';

export default function Home() {
  const [niche, setNiche] = useState('Minimalist Architecture & Design');
  const [tone, setTone] = useState('Contrarian, educated, sharp-witted, visually obsessed');
  const [trend, setTrend] = useState('A major, brutalist skyscraper project in London was just canceled. High engagement on social media: concerns over urban sprawl vs. heritage preservation. Velocity up 400% in 12 hours.');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setStatusMessage('Analyzing daily internet signals...');
    
    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, creatorTone: tone, viralEventData: trend }),
      });
      
      setStatusMessage('Architecting strategic layout...');
      const payload = await res.json();
      
      if (payload.success && payload.data) {
        setResult(payload.data);
        setStatusMessage('Strategy Compiled.');
      } else {
        setStatusMessage('Pipeline compilation mismatch.');
        alert("System error: " + (payload.error || "Execution failed"));
      }
    } catch (err) {
      setStatusMessage('Network connection lost.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1c1d1f] text-[#f3f4f6] font-sans antialiased p-6 lg:p-12 selection:bg-[#c5a880] selection:text-black">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-light tracking-[0.2em] text-[#e5e7eb] uppercase">
          AI Trend Scout
        </h1>
        <p className="text-xs uppercase tracking-[0.4em] text-[#c5a880] mt-3 font-medium">
          Ultra-Classy Creator Dashboard
        </p>
      </header>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Panel */}
        <section className="lg:col-span-5 bg-[#252629] p-6 rounded-xl border border-[#37393d] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent"></div>
          
          <h2 className="text-lg font-medium tracking-wider text-[#e5e7eb] mb-6 uppercase border-b border-[#37393d] pb-3">
            Trend Input
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#c5a880] font-bold mb-2">Your Creator Niche</label>
              <input 
                className="w-full bg-[#1c1d1f] border border-[#37393d] text-sm p-3 rounded text-gray-200 focus:outline-none focus:border-[#c5a880] transition-colors" 
                value={niche} 
                onChange={(e) => setNiche(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#c5a880] font-bold mb-2">Personal Brand Identity</label>
              <input 
                className="w-full bg-[#1c1d1f] border border-[#37393d] text-sm p-3 rounded text-gray-200 focus:outline-none focus:border-[#c5a880] transition-colors" 
                value={tone} 
                onChange={(e) => setTone(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#c5a880] font-bold mb-2">Today's Raw Viral Signal (Daily Internet Scan)</label>
              <textarea 
                className="w-full bg-[#1c1d1f] border border-[#37393d] text-sm p-3 rounded text-gray-200 focus:outline-none focus:border-[#c5a880] transition-colors h-28 resize-none leading-relaxed" 
                value={trend} 
                onChange={(e) => setTrend(e.target.value)} 
              />
            </div>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#b39266] to-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] py-4 rounded shadow-lg hover:brightness-110 active:scale-[0.99] disabled:opacity-40 transition-all mt-4"
            >
              {loading ? "Analyzing Matrix..." : "Generate Influential Strategy"}
            </button>

            {statusMessage  && (
              <p className="text-center text-xs tracking-wider text-[#8e9299] italic mt-2">{statusMessage}</p>
            )}
          </div>
        </section>

        {/* Right Column: Proposed Strategy Dashboard */}
        <section className="lg:col-span-7 min-h-[400px] bg-[#252629] p-6 rounded-xl border border-[#37393d] shadow-2xl relative">
          <h2 className="text-lg font-medium tracking-wider text-[#e5e7eb] mb-6 uppercase border-b border-[#37393d] pb-3">
            Proposed Strategy Dashboard
          </h2>

          {!result && !loading && (
            <div className="h-64 flex flex-col items-center justify-center border border-dashed border-[#37393d] rounded-lg p-6 text-center">
              <p className="text-sm tracking-wider text-[#8e9299]">Awaiting execution commands.</p>
              <p className="text-xs tracking-widest text-[#c5a880] uppercase mt-2">Initialize your best daily trend analysis</p>
            </div>
          )}

          {loading && (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#c5a880] animate-spin mb-4"></div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#c5a880]">Structuring creative vectors...</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#1c1d1f] p-4 rounded border border-[#37393d]">
                <h3 className="text-xs uppercase tracking-widest text-[#c5a880] font-bold">Trend Intel Summary</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">{result.trendSummary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.suggestedPosts && result.suggestedPosts.map((post: any, idx: number) => (
                  <div key={idx} className="bg-[#1c1d1f] p-4 rounded border border-[#37393d] flex flex-col justify-between hover:border-[#c5a880]/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#37393d] pb-2 mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880]">
                          {post.angle}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                        "{post.hook}"
                      </h4>
                      <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed mb-4">
                        {post.bodyText}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#252629]">
                      <p className="text-[10px] text-gray-500 leading-normal">
                        <strong className="text-[#c5a880]/80 uppercase tracking-wider block mb-1">Visual Guidelines:</strong> 
                        {post.visualPrompt}
                      </p>
                      
                      {post.suggestedHashtags && (
                        <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-[#c5a880]/60">
                          {post.suggestedHashtags.map((tag: string, i: number) => (
                            <span key={i}>#{tag.replace('#', '')}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
