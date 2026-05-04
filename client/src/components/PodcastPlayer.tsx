/**
 * PodcastPlayer — Minimal, branded audio player for Insights articles
 * Design: McKinsey-style inline player — clean, non-intrusive
 */
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PodcastPlayerProps {
  src: string;
  duration?: string;  // "24:35"
  title?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PodcastPlayer({ src, duration, title }: PodcastPlayerProps) {
  const { locale } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setTotalDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !totalDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * totalDuration;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(totalDuration, audio.currentTime + seconds));
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="my-8 not-prose">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="bg-navy p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-orange/20 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 20 20" className="w-4 h-4 fill-orange">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-9v6l5-3-5-3z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-0.5">
              {locale === "pt" ? "Ouça este artigo" : "Listen to this article"}
            </p>
            {title && (
              <p className="text-xs font-medium text-white/80 truncate">{title}</p>
            )}
          </div>
          {duration && !totalDuration && (
            <span className="text-[11px] text-white/40 font-light flex-shrink-0">{duration}</span>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="h-1 bg-white/10 cursor-pointer mb-4 group"
          onClick={seek}
        >
          <div
            className="h-full bg-orange transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => skip(-15)}
              className="text-white/50 hover:text-white transition-colors"
              title="-15s"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={togglePlay}
              disabled={loading}
              className="w-9 h-9 bg-orange flex items-center justify-center hover:bg-orange/90 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause size={15} className="text-white" />
              ) : (
                <Play size={15} className="text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={() => skip(15)}
              className="text-white/50 hover:text-white transition-colors"
              title="+15s"
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/40 font-light tabular-nums">
              {formatTime(currentTime)} / {totalDuration ? formatTime(totalDuration) : (duration || "--:--")}
            </span>
            <button
              onClick={toggleMute}
              className="text-white/50 hover:text-white transition-colors"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
