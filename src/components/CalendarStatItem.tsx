import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  text: number | string;
  type: "chapters" | "pages" | string;
  target: number;
  progress: number;
  rangeColor?: boolean;
  strokeWidth?: number;
};
function CalendarStatItem({
  target,
  progress,
  text,
  rangeColor,
  strokeWidth = 5,
}: Props) {
  const percentage = Math.round((progress / target) * 100) || 0;
  let pathColor = "";

  if (rangeColor) {
    if (percentage > 90) {
      pathColor = "hsl(120, 100%, 40%)"; // Green (for high completion)
    } else if (percentage > 75) {
      pathColor = "hsl(60, 100%, 50%)"; // Yellow (for almost done)
    } else if (percentage > 50) {
      pathColor = "hsl(30, 100%, 50%)"; // Orange (midway through)
    } else if (percentage > 25) {
      pathColor = "hsl(0, 100%, 50%)"; // Red (getting started)
    } else {
      pathColor = "hsl(240, 100%, 50%)"; // Blue (low progress)
    }
  } else {
    pathColor = "hsl(var(--primary))";
  }

  return (
    <div className='hover:bg-secondary rounded-full cursor-pointer'>
      <CircularProgressbar
        value={percentage}
        text={`${text}`}
        strokeWidth={strokeWidth}
        styles={{
          trail: {
            stroke: "hsl(var(--secondary))",
          },
          path: {
            stroke: pathColor,
          },
          text: {
            stroke: "hsl(var(--secondary-foreground))",
            strokeWidth: 0.5,
          },
        }}
      />
    </div>
  );
}

export default CalendarStatItem;
