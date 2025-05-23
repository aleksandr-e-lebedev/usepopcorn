import { useState } from 'react';

const starStyle = {
  display: 'block',
  cursor: 'pointer',
};

interface StarProps {
  size: number;
  color: string;
  full?: boolean;
  onRate: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
}

function Star(props: StarProps) {
  const { size, color, full = false, onRate, onHoverIn, onHoverOut } = props;

  function handleClick() {
    onRate();
  }

  function handleMouseEnter() {
    onHoverIn();
  }

  function handleMouseLeave() {
    onHoverOut();
  }

  return (
    <span
      role="button"
      style={{ ...starStyle, width: size, height: size }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

const textStyle = {
  margin: '0',
  lineHeight: '1',
};

interface StarRatingProps {
  className?: string;
  maxRating?: number;
  defaultRating?: number;
  messages?: string[];
  size?: number;
  color?: string;
  onSetRating?: (rating: number) => void;
}

export default function StarRating(props: StarRatingProps) {
  const {
    className = '',
    maxRating = 5,
    defaultRating = 0,
    messages = [],
    size = 48,
    color = '#fcc419',
    onSetRating,
  } = props;

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRate(starNum: number) {
    setRating(starNum);

    if (onSetRating) {
      onSetRating(starNum);
    }
  }

  function handleHoverIn(starNum: number) {
    setTempRating(starNum);
  }

  function handleHoverOut() {
    setTempRating(0);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_item, index) => (
          <Star
            key={index}
            size={size}
            color={color}
            full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
            onRate={() => {
              handleRate(index + 1);
            }}
            onHoverIn={() => {
              handleHoverIn(index + 1);
            }}
            onHoverOut={() => {
              handleHoverOut();
            }}
          />
        ))}
      </div>
      <p style={{ ...textStyle, fontSize: size / 1.5, color }}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}
