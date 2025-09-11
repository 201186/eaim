"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function AuthBootstrap() {
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) await supabase.auth.signInAnonymously(); // no popup, silent
    })();
  }, []);
  return null;
}
