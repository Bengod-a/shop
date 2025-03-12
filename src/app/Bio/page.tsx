"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { getVideoUrl } from "../../utils/getVideoUrl";

const BioPage = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | any>(null);

  useEffect(() => {
    getVideoUrl().then((url: any) => {
      if (url) {
        setVideoUrl(url);
      }
    });
  }, []);

  const bioData = {
    socials: [
      {
        name: "youtube",
        url: "https://www.youtube.com/channel/UCrjywyf4WZuOHewx0wKSW7Q",
        icon: "mdi:youtube",
      },
      {
        name: "instagram",
        url: "https://www.instagram.com/benza_115c/",
        icon: "formkit:instagram",
      },
      {
        name: "discord",
        url: "https://discord.gg/HMYsgcgHPp",
        icon: "ic:baseline-discord",
      },
      {
        name: "Tiktok",
        url: "https://www.tiktok.com/@usergy1yl2e03e?is_from_webapp=1&sender_device=pc",
        icon: "line-md:tiktok",
      },
    ],
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={
        {
          "--presenceContainerBackground": "rgba(255, 255, 255, 0.2)",
          "--presenceContainerBorder": "2px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "#010a01",
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/02/12/12/42/wall-2059909_640.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        } as React.CSSProperties
      }
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        className="absolute top-0 left-0 w-full h-full object-fill"
      >
        {videoUrl ? (
          <source src={videoUrl} type="video/mp4" />
        ) : (
          <p>Loading video...</p>
        )}
        เบราว์เซอร์ของคุณไม่รองรับวิดีโอนี้
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1
          className="neonText"
          style={{
            fontFamily: "'Yellowtail', sans-serif",
            fontSize: "5.2rem",
            animation: "pulsate 0.11s ease-in-out infinite alternate",
          }}
        >
          Ben
        </h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center mb-4"
        >
          <div
            className="w-[228px] p-2 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "var(--presenceContainerBackground)",
              border: "var(--presenceContainerBorder)",
            }}
          >
            <div className="relative w-20 h-20">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                className="rounded-full  h-[80px] w-[80px] object-cover border-2 border-white shadow-lg"
              >
                <source src="/profile1.mp4" type="video/mp4" />
                เบราว์เซอร์ของคุณไม่รองรับวิดีโอนี้
              </video>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 z-10">
          {bioData.socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="text-white hover:scale-125 transition-all duration-200"
            >
              <Icon
                icon={social.icon}
                className="w-10 h-10 hover:scale-125 transition-all duration-200"
              />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-20 bg-black bg-opacity-70 p-3 rounded-lg shadow-lg flex items-center space-x-3">
        <button
          onClick={toggleMute}
          className="text-white hover:text-blue-300 transition-colors duration-200"
        >
          <Icon
            icon={isMuted ? "mdi:volume-off" : "mdi:volume-high"}
            className="w-6 h-6"
          />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-sm text-white">{Math.round(volume * 100)}%</span>
      </div>

      <style jsx>{`
        .neonText {
          color: #fff;
          text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
            0 0 42px #5271ff, 0 0 82px #5271ff, 0 0 92px #5271ff,
            0 0 102px #5271ff, 0 0 151px #5271ff;
          text-align: center;
          font-weight: 400;
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css?family=Yellowtail:400"
        rel="stylesheet"
        type="text/css"
      />
    </div>
  );
};

export default BioPage;
