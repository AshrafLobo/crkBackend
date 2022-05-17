const small_sizes = ["xxs", "xs", "sm", "md"];
const large_sizes = ["lg", "xl", "xxl", "xxxl"];

export default function checkScreenSize(
  current_size,
  small = small_sizes,
  large = large_sizes
) {
  if (small.includes(current_size)) return "small";
  if (large.includes(current_size)) return "large";
}
