'use server'

import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation'

type UserFormValue = {
  email: string;
  password: string;
}

export async function login(formData: UserFormValue) {
  const supabase = await createSupabaseServerClient()
  const result = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  return JSON.stringify(result)
}

export async function signUp(formData: UserFormValue) {

  const supabase = await createSupabaseServerClient()
  const result = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  return JSON.stringify(result)
}

export async function Logout() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut();
  redirect("/");
}