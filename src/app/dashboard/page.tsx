import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '@/app/actions/auth';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const staffName =
    (user.user_metadata?.display_name as string | undefined) ?? user.email;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🃏</span>
            <h1 className="text-lg font-semibold text-gray-900">
              Pokemon Card Inventory
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{staffName}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-gray-500">ダッシュボードは準備中です。</p>
      </main>
    </div>
  );
}
