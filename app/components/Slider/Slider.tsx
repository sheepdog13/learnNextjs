"use client";
import { useState } from "react";
import styles from "./slider.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "../../(Home)/page";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SliderProps {
  movies: Movie[];
}

const rowVariants = {
  hidden: (isDirectionBack: boolean) => ({
    x:
      typeof window !== "undefined"
        ? isDirectionBack
          ? window.innerWidth + 5
          : -window.innerWidth - 5
        : "",
  }),
  visible: {
    x: 0,
  },
  exit: (isDirectionBack: boolean) => ({
    x:
      typeof window !== "undefined"
        ? isDirectionBack
          ? -window.innerWidth - 5
          : +window.innerWidth + 5
        : "",
  }),
};

const offset = 5;

export default function Slider({ movies }: SliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isDirectionBack, setIsDirectionBack] = useState(false);

  const totalMovies = movies.length;
  const maxIndex = Math.ceil(totalMovies / offset) - 1;

  const incraseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setIsDirectionBack(true);
    }
  };
  const decraseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setIsDirectionBack(false);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <div className="mt-3 mb-8 text-white">
      <h2 className="text-lg ml-11 my-3">지금 뜨는 콘텐츠</h2>
      <div className="relative flex justify-between items-center w-full h-32 group">
        <span
          onClick={decraseIndex}
          className="opacity-0 group-hover:opacity-100 group-hover:bg-gray-700/[.3] absolute top-0 left-0 flex justify-center items-center w-10 h-32 rounded-br-md rounded-tl-md z-50 "
        >
          <div>
            <SvgIcon fontSize="large" component={ArrowBackIosNewIcon} />
          </div>
        </span>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={isDirectionBack}
        >
          <motion.div
            className="absolute top-0 left-0 grid grid-cols-5 gap-1 w-full px-10"
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isDirectionBack}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {movies
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <motion.div
                  className="w-full h-32 bg-cover bg-center z-10"
                  key={movie.id}
                  style={{ backgroundImage: `url(${movie.backdrop_path})` }}
                />
              ))}
          </motion.div>
        </AnimatePresence>
        <span
          onClick={incraseIndex}
          className="opacity-0 group-hover:opacity-100 group-hover:bg-gray-700/[.3] absolute top-0 right-0 flex justify-center items-center w-4/25 h-32 rounded-br-md rounded-tr-md z-50 "
        >
          <div>
            <SvgIcon fontSize="large" component={ArrowForwardIosIcon} />
          </div>
        </span>
      </div>
    </div>
  );
}
