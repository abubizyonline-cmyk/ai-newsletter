import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // DEBUGGING BLOCK
  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-10 font-mono">
        <h1 className="text-3xl font-bold text-red-500 mb-6">🚨 Connection Debugger</h1>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4 max-w-2xl w-full">
          <div>
            <p className="text-gray-400 text-sm">NEXT_PUBLIC_SUPABASE_URL</p>
            <p className={`text-xl font-bold ${supabaseUrl ? 'text-green-400' : 'text-red-500'}`}>
              {supabaseUrl ? `FOUND (Length: ${supabaseUrl.length})` : 'MISSING / UNDEFINED'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Value starts with: {supabaseUrl ? supabaseUrl.substring(0, 10) + '...' : 'N/A'}</p>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
             <p className={`text-xl font-bold ${supabaseKey ? 'text-green-400' : 'text-red-500'}`}>
              {supabaseKey ? `FOUND (Length: ${supabaseKey.length})` : 'MISSING / UNDEFINED'}
            </p>
          </div>
        </div>
        <p className="mt-8 text-gray-500">Please send a screenshot of this screen to your AI assistant.</p>
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
         <p className="text-gray-600">Connected Successfully! Loaded {newsletters?.length || 0} articles.</p>
         {/* Simple list for testing */}
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