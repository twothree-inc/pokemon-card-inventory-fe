'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { register } from '@/app/actions/auth';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      formRef.current?.reset();
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mb-3 text-4xl">🃏</div>
        <h1 className="text-2xl font-bold text-gray-900">新規登録</h1>
        <p className="mt-1 text-sm text-gray-500">
          Pokemon Card Inventory System
        </p>
      </div>

      <div className="rounded-xl bg-white px-8 py-10 shadow-sm ring-1 ring-gray-200">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-200">
            {success}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              スタッフ名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="田中"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="staff@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード
              <span className="ml-1 text-xs font-normal text-gray-400">
                （8文字以上）
              </span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード（確認）
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!success}
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? '登録中...' : 'アカウント作成'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        すでにアカウントをお持ちの方は{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          ログイン
        </Link>
      </p>
    </div>
  );
}
