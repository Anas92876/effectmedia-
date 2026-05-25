'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { introState } from '@/lib/introState';

export default function IntroVideo() {
  const t = useTranslations('intro');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start visible=true so the overlay is in the server HTML — no page flash possible
  const [show, setShow] = useState(!introState.played);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';
    videoRef.current?.play().catch(() => dismiss());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    introState.markDone(); // marks played + dispatches 'intro-done' event
    setFading(true);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 700);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease-in-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* TODO: Replace /videos/intro.mp4 with the new company video once received.
           Encode as H.264 MP4 + WebM fallback, max 1080p, and compress with HandBrake or ffmpeg:
           ffmpeg -i input.mp4 -vcodec libx264 -crf 23 -preset slow -movflags +faststart output.mp4 */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        muted
        playsInline
        onEnded={dismiss}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      <button
        onClick={dismiss}
        style={{
          position: 'absolute',
          bottom: '2rem',
          insetInlineEnd: '2rem',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'var(--font-main)',
          fontSize: '0.875rem',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '9999px',
          padding: '0.5rem 1.25rem',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backdropFilter: 'blur(4px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
      >
        {t('skip')} ←
      </button>
    </div>
  );
}
