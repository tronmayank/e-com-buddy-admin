export type Size = "small" | "medium" | "large";

export const getHeight = (size: Size) => {
  switch (size) {
    case "small":
      return "md:h-[40px] h-[36px]";

    case "medium":
      return "md:h-[56px] h-[40px]";

    case "large":
      return "md:h-[64px]  h-[56px]";

    default:
      break;
  }
};

export const isValidNumber: (
  value: string,
  options?: {
    allowedChars?: string;
    allowSpaces?: boolean;
  }
) => boolean = (value, options) => {
  const numRegex = new RegExp(`^[0-9${options?.allowedChars || ""}]+$`);
  const numRegexWithAllowSpaces = new RegExp(
    `^[0-9\\s${options?.allowedChars || ""}]+$`
  );

  return (options?.allowSpaces ? numRegexWithAllowSpaces : numRegex).test(
    value
  );
};
