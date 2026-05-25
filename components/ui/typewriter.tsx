"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | ReactNode;
  cursorAnimationVariants?: {
    initial: Variants["initial"];
    animate: Variants["animate"];
  };
  cursorClassName?: string;
  colorizeLetters?: boolean;
  letterColors?: string[];
}

function joinClassNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const defaultLetterColors = [
  "var(--ft-pomodori)",
  "var(--ft-citrine)",
  "var(--ft-denim)",
  "var(--ft-viola)",
  "var(--ft-blush)",
  "var(--ft-menta)",
];

const Typewriter = ({
  text,
  speed = 65,
  initialDelay = 180,
  waitTime = 900,
  deleteSpeed = 18,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "ml-1",
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.38,
        repeatType: "reverse",
      },
    },
  },
  colorizeLetters = false,
  letterColors = defaultLetterColors,
}: TypewriterProps) => {
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const currentText = texts[currentTextIndex] ?? "";

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false);

          if (currentTextIndex === texts.length - 1 && !loop) {
            return;
          }

          setCurrentTextIndex((previousIndex) => (previousIndex + 1) % texts.length);
          setCurrentIndex(0);

          return;
        }

        timeout = setTimeout(() => {
          setDisplayText((previousText) => previousText.slice(0, -1));
        }, deleteSpeed);

        return;
      }

      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((previousText) => previousText + currentText[currentIndex]);
          setCurrentIndex((previousIndex) => previousIndex + 1);
        }, speed);

        return;
      }

      if (texts.length > 1) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, waitTime);
      }
    };

    if (currentIndex === 0 && !isDeleting && displayText === "") {
      timeout = setTimeout(startTyping, initialDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    currentTextIndex,
    deleteSpeed,
    displayText,
    initialDelay,
    isDeleting,
    loop,
    speed,
    texts,
    waitTime,
  ]);

  return (
    <span className={joinClassNames("inline whitespace-pre-wrap tracking-tight", className)}>
      <span>
        {colorizeLetters
          ? displayText.split("").map((character, index) => (
              <span
                key={`${character}-${index}`}
                style={{
                  color:
                    character.trim().length === 0
                      ? "inherit"
                      : letterColors[index % letterColors.length],
                }}
              >
                {character}
              </span>
            ))
          : displayText}
      </span>

      {showCursor && (
        <motion.span
          variants={cursorAnimationVariants}
          className={joinClassNames(
            cursorClassName,
            hideCursorOnType &&
              (currentIndex < (texts[currentTextIndex]?.length ?? 0) || isDeleting) &&
              "hidden"
          )}
          initial="initial"
          animate="animate"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
};

export { Typewriter };
