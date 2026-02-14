import { createClient } from '@supabase/supabase-js';

// Force Next.js to always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // DEBUGGING BLOCK
  // We will print the TYPE of the variable to see if it's undefined or just empty string
  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-10 font-mono">
        <h1 className="text-3xl font-bold text-red-500 mb-6">🚨 Deep Debugger</h1>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4 max-w-2xl w-full">
          
          <div>
            <p className="text-gray-400 text-sm">NEXT_PUBLIC_SUPABASE_URL</p>
            <p className="text-xl font-bold text-yellow-400">
              Type: {typeof supabaseUrl}
            </p>
             <p className="text-sm text-gray-500">
              Value: {supabaseUrl ? supabaseUrl : "Literally nothing (undefined)"}
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
             <p className="text-xl font-bold text-yellow-400">
              Type: {typeof supabaseKey}
            </p>
            <p className="text-sm text-gray-500">
              Value: {supabaseKey ? "Hidden (Exists)" : "Literally nothing (undefined)"}
            </p>
          </div>

          <div className="mt-6 p-4 bg-black rounded text-xs text-green-400">
            <p><strong>Environment Check:</strong></p>
            <p>Node Env: {process.env.NODE_ENV}</p>
          </div>

        </div>
      </div>
    );
  }

  // If we pass the check, run the normal app
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: newsletters } = await supabase
    .from('newsletters')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
         <h1 className="text-4xl font-extrabold text-gray-900 mb-10">AI Intelligence Feed</h1>
         <p className="text-gray-600">Connected Successfully!</p>
         <div className="mt-8 grid gap-4">
            {newsletters?.map((n) => (
                <div key={n.id} className="bg-white p-4 rounded shadow text-left">
                    <h2 className="font-bold text-lg">{n.video_title}</h2>
                </div>
            ))}
         </div>
      </div>
    </main>
  );
}