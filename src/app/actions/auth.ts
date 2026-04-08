'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function register(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: name },
      emailRedirectTo: `${siteUrl}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: '確認メールを送信しました。メールボックスをご確認ください。',
  };
}

export async function logout() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/login');
}
