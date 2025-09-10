"use client";

import { useEffect } from 'react';
import cookie from 'cookie';

export interface ExperimentBootProps {
  expKey: string;
}

/**
 * Minimal client‑side experiment bootstrapping. This component assigns a
 * variant for the given experiment key if one has not already been
 * assigned for the current session. The assignment is stored in a
 * cookie (`pv_session`). It then notifies the backend of an exposure
 * event. See the existing ERP routes for experiment assignment and
 * exposure tracking.
 */
export function ExperimentBoot({ expKey }: ExperimentBootProps) {
  useEffect(() => {
    async function assignAndExpose() {
      // Retrieve or generate a session id stored in a cookie
      let sessionId: string;
      const existing = document.cookie && cookie.parse(document.cookie).pv_session;
      if (existing) {
        sessionId = existing;
      } else {
        sessionId = Math.random().toString(36).substring(2);
        document.cookie = cookie.serialize('pv_session', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }
      try {
        // Fetch assignment
        const assignRes = await fetch(
          `${process.env.NEXT_PUBLIC_ERP_API}/api/experiments/assign/${expKey}?session_id=${sessionId}`,
          { cache: 'no-store' },
        );
        if (!assignRes.ok) return;
        const { variant_key, payload } = await assignRes.json();
        // Expose event
        await fetch(`${process.env.NEXT_PUBLIC_ERP_API}/api/experiments/exposed/${expKey}/${variant_key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        // Make payload available globally
        if (typeof window !== 'undefined') {
          // @ts-ignore
          window.__expPayload = window.__expPayload || {};
          // @ts-ignore
          window.__expPayload[expKey] = payload;
        }
      } catch (err) {
        console.warn('Experiment assignment failed', err);
      }
    }
    assignAndExpose();
  }, [expKey]);
  return null;
}