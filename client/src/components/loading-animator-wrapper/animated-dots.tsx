const DOT_DELAYS = ["0s", "0.2s", "0.4s"];

export function AnimatedDots() {
  return (
    <span aria-hidden="true">
      {DOT_DELAYS.map((delay) => (
        <span
          key={delay}
          className="loading-dot"
          style={{ animationDelay: delay }}
        >
          .
        </span>
      ))}
    </span>
  );
}
