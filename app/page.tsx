import { createClient } from '@supabase/supabase-js';

// Force Next.js to always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Check for keys safely INSIDE the function
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="p-10 text-red-500">
        <h1 className="text-2xl font-bold">Configuration Error</h1>
        <p>Supabase keys are missing in Vercel Environment Variables.</p>
      </div>
    );
  }

  // 2. Connect only when we have keys
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: newsletters } = await supabase
    .from('newsletters')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
          MY AI Intelligence Feed
        </h1>

        <div className="space-y-10">
          {newsletters?.map((newsletter) => {
            let cleanTakeaways = [];
            try {
              cleanTakeaways = typeof newsletter.takeaways === 'string' 
                ? JSON.parse(newsletter.takeaways) 
                : newsletter.takeaways;
            } catch (e) {
              cleanTakeaways = ["Could not load takeaways"];
            }

            return (
              <article 
                key={newsletter.id} 
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="bg-slate-900 p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {newsletter.video_title}
                  </h2>
                  <div className="flex items-center text-slate-400 text-sm">
                    <span className="bg-slate-800 px-3 py-1 rounded-full">
                      ID: {newsletter.video_id}
                    </span>
                    <span className="mx-3">•</span>
                    <span>{new Date(newsletter.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                    <h3 className="text-green-800 font-bold uppercase tracking-wide text-xs mb-2">
                      The Big Idea
                    </h3>
                    <p className="text-lg text-green-900 font-medium italic">
                      "{newsletter.hook}"
                    </p>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">⚡</span>
                      Key Takeaways
                    </h3>
                    <ul className="space-y-3">
                      {Array.isArray(cleanTakeaways) && cleanTakeaways.map((point: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="prose prose-slate max-w-none">
                     <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm">📖</span>
                      Deep Dive
                    </h3>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {newsletter.deep_dive}
                    </div>
                  </div>
                  
                  {newsletter.actionable_advice && (
                     <div className="mt-8 bg-purple-50 p-6 rounded-xl border border-purple-100">
                        <h4 className="text-purple-900 font-bold mb-2">🚀 Action Step</h4>
                        <p className="text-purple-800">{newsletter.actionable_advice}</p>
                     </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}