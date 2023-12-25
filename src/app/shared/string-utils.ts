export function format(template: string, ...args: any) {
  let formatted = template;
  for (const index in args) {
    formatted = formatted.replace(
      new RegExp('\\{' + index + '\\}', 'gi'),
      args[index],
    );
  }
  return formatted;
}
