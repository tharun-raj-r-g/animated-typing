import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedTyping({ text = [], onComplete }) {
  const [typedText, setTypedText] = useState('');
  const [cursorColor, setCursorColor] = useState('transparent');
  const [messageIndex, setMessageIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const timeoutsRef = useRef({});

  const textRef = useRef('');
  const cursorColorRef = useRef(cursorColor);
  const messageIndexRef = useRef(messageIndex);
  const textIndexRef = useRef(textIndex);

  useEffect(() => {
    textRef.current = typedText;
    cursorColorRef.current = cursorColor;
    messageIndexRef.current = messageIndex;
    textIndexRef.current = textIndex;
  });

  const typingAnimation = () => {
    const currentMessage = text[messageIndexRef.current];
    if (textIndexRef.current < currentMessage.length) {
      setTypedText(textRef.current + currentMessage.charAt(textIndexRef.current));
      setTextIndex(prev => prev + 1);
      timeoutsRef.current.typingTimeout = setTimeout(typingAnimation, 50);
    } else if (messageIndexRef.current + 1 < text.length) {
      setMessageIndex(prev => prev + 1);
      setTextIndex(0);
      timeoutsRef.current.firstNewLineTimeout = setTimeout(() => {
        setTypedText(prev => prev + '\n');
      }, 120);
      timeoutsRef.current.secondNewLineTimeout = setTimeout(() => {
        setTypedText(prev => prev + '\n');
      }, 200);
      timeoutsRef.current.typingTimeout = setTimeout(typingAnimation, 280);
    } else {
      clearInterval(timeoutsRef.current.cursorTimeout);
      setCursorColor('transparent');
      if (onComplete) onComplete();
    }
  };

  const cursorAnimation = () => {
    setCursorColor(prev => (prev === 'transparent' ? '#8EA960' : 'transparent'));
  };

  useEffect(() => {
    timeoutsRef.current.typingTimeout = setTimeout(typingAnimation, 500);
    timeoutsRef.current.cursorTimeout = setInterval(cursorAnimation, 250);

    return () => {
      clearTimeout(timeoutsRef.current.typingTimeout);
      clearTimeout(timeoutsRef.current.firstNewLineTimeout);
      clearTimeout(timeoutsRef.current.secondNewLineTimeout);
      clearInterval(timeoutsRef.current.cursorTimeout);
    };
  }, []);

  return (
    <pre style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
      {typedText}
      <span style={{ color: cursorColor }}>|</span>
    </pre>
  );
}
