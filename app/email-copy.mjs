export const EMAIL_ADDRESS = "zheminlin266@gmail.com";

export async function copyEmailAddress({ clipboard, fallback }) {
  if (clipboard?.writeText) {
    try {
      await clipboard.writeText(EMAIL_ADDRESS);
      return;
    } catch {
      // Continue to the browser selection fallback when clipboard permission is denied.
    }
  }

  if (fallback?.(EMAIL_ADDRESS)) return;
  throw new Error("Unable to copy the email address.");
}
