type Props = {
  className?: string;
  label?: string;
  href?: string;
};

export function VerifiedBadge({
  className = "",
  label = "Verified",
  href,
}: Props) {
  const icon = (
    <svg
      className={`h-[1em] w-[1em] shrink-0 text-[#1d9bf0] ${className}`}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646-.017-1.273.212-1.813.567s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.886-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.218-.437 1.683-.881.444-.47.747-1.054.877-1.688.132-.633.084-1.29-.136-1.896.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.394 1.347 1.339-5.683 5.713z"
      />
    </svg>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-[0.9em] leading-none text-[#1d9bf0] transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
        aria-label={label}
      >
        {icon}
      </a>
    );
  }

  return (
    <span
      className="inline-flex items-center text-[0.9em] leading-none"
      title={label}
      aria-label={label}
      role="img"
    >
      {icon}
    </span>
  );
}
